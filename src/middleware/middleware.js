var userModel = require('../module/user.module')
const jwt = require('jsonwebtoken')

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
            try {
                var result = jwt.verify(req.signedCookies.token, 'daylabimat')
            } catch (error) {
                res.json("Loi get info chua su ly")
            }
            await userModel.findOne({_id: result}) // xac dinh tk dang dang nhap
                .then(user=>{
                    if (user){
                        res.locals.user = { //lay ten de dua len header
                            username: user.name,
                        }
                        res.locals.carts = user.carts //gio hang
                        var countQuantityInCart = 0 // so luong torng gio
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

    testAjax(req, res, next){
        if (req.signedCookies.idUser){
            userModel.findOne({_id: req.signedCookies.idUser})
                .then(user=>{
                    if (user){
                        
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