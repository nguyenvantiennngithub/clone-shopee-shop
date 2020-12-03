const cartModel = require('../../module/cart.module')
const productModel = require('../../module/product.module')
const userModel = require('../../module/user.module')

const mongooseToObject = require('../../until/index.mongoose')

class cartController{

    //[POST] /cart/:slug/add-cart
    async addCart(req, res, next){
        var cartAdd = {};
        req.body.color = req.body.color.trim()
        // lay thong tin san pham
        await productModel.findOne({ _id: req.params.slug})
            .then((product)=>{
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
                cart.carts.forEach(function(product, index){
                    if (product.slug === req.params.slug && product.color === req.params.slugColor){
                        cart.carts.splice(index, 1)
                        userModel.updateOne({_id: req.signedCookies.idUser}, cart)
                            .then(()=>{
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
}

module.exports = new cartController()




