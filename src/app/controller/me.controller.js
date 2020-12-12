const productModel = require('../../module/product.module')
const userModel = require('../../module/user.module')
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
    //[POST] me/editProfile
    editProfile(req, res, next){
        userModel.updateOne({_id: req.signedCookies.idUser}, req.body)
            .then(()=>{
                res.redirect("/")
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = new meController()




