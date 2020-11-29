const userModel = require('../../module/user.module')
const mongooseToObject = require('../../until/index.mongoose')
class authController{
    //[GET] auth/login
    login(req, res, next){
        res.render("auth/login")
    }

    //[POST] auth/login
    checkLogin(req, res, next){
        userModel.findOne({name: req.body.username, password: req.body.password})
            .then(user=>{
                if (!user){
                    console.log("djsaldksadjklsajdlk")
                    res.render('auth/login',{
                        messageError: 'Nhập sai email hoặc mật khẩu',
                        username: req.body.username, 
                        password: req.body.password
                    })
                    return;
                }

                res.cookie('idUser', user._id, {signed: true})

                res.redirect("/")
            })
            .catch(err=>{
                next(err);
            })
        }
    
    //[GET] auth/logout
    logout(req, res, next){
        res.clearCookie('idUser');
        res.redirect('/')
    }
    
    //[GET] auth/register
    register(req, res, next){
        res.render("auth/register")
    }

    //[POST] auth/login
    checkRegister(req, res, next){
       
    }
   
}

module.exports = new authController()




