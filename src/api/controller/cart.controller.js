const userModel = require('../../module/user.module')
const addressModel = require('../../module/address.module')
const mongooseToObject = require('../../until/index.mongoose')
class authController{
    async cartApi(req, res, next){

        //test
        await userModel.findOne({_id: req.signedCookies.idUser})
            .then(user=>{
                console.log(user)
                res.json(user.carts)
            })
            .catch(err=>{
                next(err)
            })
        next()
    }
    async addressApi(req, res, next){
        await addressModel.find({})
            .then((address)=>{
                res.json(address)
            })
            .catch(err=>{
                next(err);
            })
        next();
    }
}

module.exports = new authController()




