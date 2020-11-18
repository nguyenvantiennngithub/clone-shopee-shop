const productModel = require('../../module/product.module')
const mongooseToObject = require('../../until/index.mongoose')
class productController{
    //[GET] /
    home(req, res, next){
        productModel.find({})
            .then(products=>{
                res.render("home", {
                    products: mongooseToObject.mongoosesToObject(products)
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
                console.log(product)
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
        productModel.deleteOne({ slug: req.params.slug})
            .then(()=>{
                res.redirect("/me/show");
            })
            .catch((err)=>{
                next(err);
            })
    }
    softDelete(req, res, next){
        productModel.delete({ slug: req.params.slug})
        .then(()=>{
            res.redirect("/me/show");
        })
        .catch((err)=>{
            next(err);
        })
    }
}

module.exports = new productController()




