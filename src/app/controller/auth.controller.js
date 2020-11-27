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
                    res.render('auth/login',{
                        messageError: 'Nhập sai email hoặc mật khẩu'
                    })
                    return;
                }
                res.send("Dang nhap thanh cong")
            })
            .catch(err=>{
                next(err);
            })
    }
    register(req, res, next){
        res.render("auth/register")
    }

    //[POST] auth/login
    checkRegister(req, res, next){
       
    }
   
}

module.exports = new authController()




