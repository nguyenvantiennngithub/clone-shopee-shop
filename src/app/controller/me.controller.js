const productModel = require('../../module/product.module')
const mongooseToObject = require('../../until/index.mongoose')
class meController{
    //[GET] show
    show(req, res, next){
        switch(req.body.slug)
        productModel.find({})
            .then((products)=>{
                res.render("me/show",{
                    products: mongooseToObject.mongoosesToObject(products)
                })  
            })
    }
   
}

module.exports = new meController()




