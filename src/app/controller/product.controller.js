const productModel = require('../../module/product.module')
const mongooseToObject = require('../../until/index.mongoose')

//hàm lấy mảng có các phần tử độc nhất là 
//cái tên nhà sản xuất của những
//cái loại (smart-phone, laptop, tablet) 

class productController{
    
    //[GET] /
    home(req, res, next){
        function getTrademakeOfCategoryUnique(){
            var trademarkOfCategory = []
            return productModel.find({})

                .then(products=>{
                    for (var i of products){
                        if (i.slugCategory == req.query.category){
                            trademarkOfCategory.push(i.trademark);
                            
                        }
                    }
                    return Array.from(new Set(trademarkOfCategory))
                })
                .catch(err=>{
                    next(err);
                })
        }

        function getCategoryUnique(){
            var categoryUniqueArray = []
            return productModel.find({})
                .then((products)=>{
                    for (var i of products){
                        categoryUniqueArray.push(i.category);
                    }
                    // return Array.from(new Set(categoryUniqueArray))
                    return Array.from(new Set(categoryUniqueArray))
                })
                .catch((err)=>{
                    next(err)
                })
        }

        //biến để find trong db
        var filter = {}
        var currentTrademark;
        //filter theo category và sort theo price
        if (req.query.hasOwnProperty("category")){
            filter.slugCategory = req.query.category
        }

        if (req.query.hasOwnProperty("trademark")){
            currentTrademark = req.query.trademark
            filter.trademark = req.query.trademark
        }

        //biến tạm khi đọc db
        var tempProductModel =  productModel.find(filter)
        if (req.query.hasOwnProperty("price")){
            tempProductModel = tempProductModel.sort({price: req.query.price})
        }
        var categoryQuery = getCategoryUnique();
        var trademarkQuery = getTrademakeOfCategoryUnique()
        Promise.all([categoryQuery, trademarkQuery, tempProductModel])
            .then(([categoryUnique, trademarkUnique, products])=>{
                res.render("home", {
                    products: mongooseToObject.mongoosesToObject(products),
                    filterCategory: req.query.category,
                    trademarkOfCategory: trademarkUnique,
                    categoryUnique: categoryUnique,
                    currentTrademark: currentTrademark
                })
            })
            .catch(err=>{
                next(err);
            })
       
    }
    //[GET /:slug/detail
    detail(req, res, next){
        productModel.findOne({ slug: req.params.slug })
            .then(product=>{
                res.render("product/detail", {
                    product: mongooseToObject.mongooseToObject(product)
                })
            })
            .catch(err=>{
                next(err);
            })
        
    }
    //[GET] /create
    create(req, res, next){
        res.render("product/create")
    }

    //[POST] /save
    save(req, res, next){
        req.body.color = req.body.color.split(",")
        const product = new productModel(req.body);
        product.save()
            .then(()=>{
                res.redirect('/')   
            })    
            .catch((err)=>{
                next(err);
            })
    }
    //[DELETE] /:slug/delete
    delete(req, res, next){
        productModel.deleteOne({ _id: req.params.slug})
            .then(()=>{
                res.redirect("/me/list/trash");
            })
            .catch((err)=>{
                next(err);
            })
    }
    //[DELETE] /:slug/soft-delete
    softDelete(req, res, next){
        productModel.delete({ _id: req.params.slug})
        .then(()=>{
            res.redirect("/me/list/show");
        })
        .catch((err)=>{
            next(err);
        })
    }
    //[GET] /:slug/restore
    restore(req, res, next){
        productModel.restore({ _id: req.params.slug})
            .then(()=>{
                res.redirect("/me/list/trash");
            })
            .catch((err)=>{
                next(err);
            })
    }
    //[GET] /:slug/edit
    edit(req, res, next){
        productModel.findOne({ _id: req.params.slug})
        .then((product)=>{
            res.render("product/edit", {
                product: mongooseToObject.mongooseToObject(product)
            })
        })
        .catch((err)=>{
            next(err);
        })
    }

    //[POST] /:slug/update
    update(req, res, next){
        req.body.color = req.body.color.split(",")
        productModel.updateOne({ _id: req.params.slug}, req.body)
            .then(()=>{
                res.redirect("/");
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = new productController()




