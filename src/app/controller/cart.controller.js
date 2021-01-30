const productModel = require('../../module/product.module')
const userModel = require('../../module/user.module')
const swal = require('sweetalert')
const mongooseToObject = require('../../until/index.mongoose');

class cartController{

    //[POST] /cart/:slug/add-cart
    async addCart(req, res, next){
        var cartAdd = {};
        req.body.color = req.body.color.trim()
        // lay thong tin san pham
        await productModel.findOne({ _id: req.params.slug})
            .then((product)=>{
                if (!req.body.color){
                    res.redirect("back");
                    return;
                }
                cartAdd.isPaid = false;
                cartAdd.slug = product.slug;
                cartAdd.name = product.name;
                cartAdd.price = product.price;
                cartAdd.img = product.img;
                cartAdd.category = product.category;
                cartAdd.slug = product.slug;
                cartAdd.color = req.body.color;
                cartAdd.idProduct = product._id;
                cartAdd.quantity = parseInt(req.body.quantity);
                //xat dinh tai khoang dang dang nhap
                userModel.findOne({_id: req.signedCookies.idUser})
                    .then((user)=>{
                        var isHas = false;
                        user.carts.forEach(function(index){
                            if (cartAdd.name == index.name && cartAdd.color == index.color){
                                isHas = true;
                                index.quantity += cartAdd.quantity
                            }
                        })
                        if (!isHas){
                            user.carts.push(cartAdd)
                        }

                        //them vao gio
                        // console.log(user.carts)
                        userModel.updateOne({_id: req.signedCookies.idUser}, user)
                            .then(()=>{
                                res.redirect("back")
                            })
                     })
                    
                })
            .catch(err=>{
                next(err);
            })
    }
    //[DELETE] /:slug/delete
    delete(req, res, next){
        userModel.findOne({ _id: req.signedCookies.idUser})
            .then((cart)=>{
                // console.log("delete")
                cart.carts.forEach(function(product, index){
                    if (product.slug === req.params.slug && product.color === req.params.color){
                        cart.carts.splice(index, 1)
                        console.log(cart)
                        userModel.updateOne({_id: req.signedCookies.idUser}, cart)
                            .then(()=>{
                                // console.log("thanh cong")
                                res.redirect("back")
                            })
                            .catch(err=>{
                                next(err)
                            })
                    }
                })
            })
            .catch((err)=>{
                next(err);
            })
    }

    //[GET] cart
    cart(req, res, next){
        userModel.findOne({_id: req.signedCookies.idUser})
            .then((user)=>{
                res.render("cart/cart", {
                    userInfo: mongooseToObject.mongooseToObject(user)
                })
            })
        
    }

    //edit
    editCart(req, res, next){
        // console.log("nhan duoc")
        userModel.findOne({_id: req.signedCookies.idUser})
            .then(user=>{
                user.carts.forEach(function(product, index){
                    if (product.slug == req.params.slug && product.color == req.params.color){
                        user.carts[index].quantity = req.params.quantity
                    }
                })
                userModel.updateOne({_id: req.signedCookies.idUser}, user)
                    .then(()=>{
                        res.redirect("back")
                    })
                    .catch(next)
                }
            )  
            .catch(next)
    }
    
    address(req, res, next){
        userModel.findOne({_id: req.signedCookies.idUser})
            .then((user)=>{
                // console.log(user);
                res.render("cart/address", {
                    user: mongooseToObject.mongooseToObject(user)
                })
            })
    }
    //test [GET]/cart/test
    test(req, res, next){
        res.render("cart/test")
    }

    buy(req, res, next){
        // tạo object để dể sài chứ mà cắt ra rồi sài 0, 1, 2 thì hơi chuối
        function Item(slug, color, quantity){
            this.slug = slug
            this.color = color
            this.quantity = quantity
        }

        var paid = [] //chứa mảng các sp đang mua
        var paidCart = [] //chứa các sp đã mua nhưng đầy đủ thông tin để add vô CSDL
        var deleteCart = []
        //sử lý khi chỉ có 1 sp đc mua vì khi mua 1 sp thì nó là string 
        //khi nào mua 2 sp thì nó mới cv sang array
        if (typeof(req.body['cart-checkbox']) == 'string'){
            req.body['cart-checkbox'] = [req.body['cart-checkbox']] 
        }
        console.log(typeof(req.body['cart-checkbox']))
        req.body['cart-checkbox'].forEach(cart=>{
            //vì là ở trên html mình gôm nhiều biến vào 1 biến cách nhau bằng đấu |
            //nên xuống đây mình chia ra nhưng khi chia thì nó tính theo index nên mình
            //khơi tạo cái Item để cho nó có name 
            var temp = cart.split('|') 
            var item = new Item(temp[0], temp[1], temp[2])
            paid.push(item)
        })
        userModel.findOne({_id: req.signedCookies.idUser})
            .then(user=>{
                //lặp qua 2 dòng for để lấy đầy đủ thông tin về sản phẩm đã mua
                //vì khi gữi xuống từ trên thì chỉ có slug, color, quantity ko đủ
                //để render ra thẻ html thiếu img, ....
                var tempPaid = []
                console.log(user.carts)
                paid.forEach(buy=>{
                    user.carts.forEach((cart, index)=>{
                        if (buy.slug == cart.slug && buy.color == cart.color){
                            // tempPaid.push((user.carts.splice(index, 1))[0]) //viet như này hơi khó đọc
                            //đầu tiên là phải tách cái sp đã mua ra khỏi cái carts vì mua thì phải xóa
                            //sau đó push cái sp này vào tempPaid để thành cái list đã mua mà khi cắt ra
                            //thì nó lại nằm trong array nên dùng index 0 để lấy cái object bên trong thoi
                            var temp = user.carts.splice(index, 1) 
                            tempPaid.push(temp[0])
                        }
                    })
                })
                user.paid.push(tempPaid) //push hết cái temPaid vào trong paid cuuar user
                //sau khi đã lấy đc đủ thông tin thì thêm vào DB
                userModel.updateOne({_id: req.signedCookies.idUser}, user)
                    .then(()=>{
                        res.redirect("back")
                    })
            })
        
    }
}

module.exports = new cartController()





 