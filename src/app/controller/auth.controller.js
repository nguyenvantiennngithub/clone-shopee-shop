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
       userModel.findOne({name: req.body.name})
        .then((user)=>{
            if (user){
                res.render("auth/register",{
                    messageError: 'Tên tài khoảng đã tồn tại'
                })
                return;
            }else{
                const newUser = new userModel(req.body);
                newUser.save()
                    .then(()=>{
                        res.redirect('/auth/login')
                    })
                    .catch(err=>{
                        next(err)
                    })  
            }
        })
        .catch(err=>{
            next(err)
        })
    }
   
}

module.exports = new authController()




