const userModel = require('../../module/user.module')
const mongooseToObject = require('../../until/index.mongoose')
class authController{
    cartApi(req, res, next){
        userModel.findOne({_id: req.signedCookies.idUser})
            .then(user=>{
                res.json(user.carts)
            })
            .catch(err=>{
                next(err)
            })
        next()
    }
}

module.exports = new authController()




