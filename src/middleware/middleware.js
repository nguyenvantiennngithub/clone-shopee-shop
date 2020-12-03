var userModel = require('../module/user.module')


class middleware{
    checkLogin(req, res, next){
        if (!req.signedCookies.idUser){
            res.redirect('/auth/login')
            return;
        }
        
        next()
    }

    async getInfo(req, res, next){
         if (req.signedCookies.idUser){
            await userModel.findOne({_id: req.signedCookies.idUser})
                .then(user=>{
                    if (user){
                        res.locals.user = {
                            name: user.name,
                        }
                        res.locals.carts = user.carts
                        var countQuantityInCart = 0
                        user.carts.forEach(function(cart){
                            if(cart.isPaid === false){
                                countQuantityInCart++;
                            }
                        })
                        res.locals.quantityInCart = countQuantityInCart
                    }
                })
                .catch(err=>{
                    next(err);
                })
        }   
        next()
    }
    
}

module.exports = new middleware()