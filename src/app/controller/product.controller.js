const productModel = require('../../module/product.module')
const mongooseToObject = require('../../until/index.mongoose')
class productController{
    //[GET] /
    home(req, res, next){
        var filter = {}
        if (req.query.hasOwnProperty("category")){
            filter.category = req.query.category
        }
        var tempProductModel =  productModel.find(filter)
        if (req.query.hasOwnProperty("price")){
            console.log('price')
            tempProductModel.sort({price: req.query.price})
        }
        tempProductModel
            .then(products=>{
                res.render("home", {
                    products: mongooseToObject.mongoosesToObject(products),
                    filterCategory: req.query.category
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




