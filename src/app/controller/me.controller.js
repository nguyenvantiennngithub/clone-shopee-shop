const productModel = require('../../module/product.module')
const mongooseToObject = require('../../until/index.mongoose')

class meController{
    //[GET] show
    show(req, res, next){
        var tempProductModel;
        switch(req.params.slug){
            case 'show':{
                tempProductModel = productModel.find({idUser: req.signedCookies.idUser})
                break;
            }
            case 'trash':{
                tempProductModel = productModel.findDeleted({idUser: req.signedCookies.idUser})
                break;
            }
        }
        tempProductModel.then((products)=>{
            res.render("me/show",{
                products: mongooseToObject.mongoosesToObject(products),
                slug: req.params.slug
            })  
        })
    }
   
}

module.exports = new meController()




