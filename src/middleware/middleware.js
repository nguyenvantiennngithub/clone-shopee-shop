var userModel = require('../module/user.module')


class middleware{
    checkLogin(req, res, next){
        if (!req.signedCookies.idUser){
            res.redirect('/auth/login')
            return;
        }
        
        next()
    }

    async getUser(req, res, next){
         if (req.signedCookies.idUser){
            await userModel.findOne({_id: req.signedCookies.idUser})
                .then(user=>{
                    if (user){
                        res.locals.user = {
                         name: user.name,
                        }
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