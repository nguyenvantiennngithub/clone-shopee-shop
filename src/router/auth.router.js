const express = require('express')
const authController  = require('../app/controller/auth.controller')
const middleware = require('../middleware/middleware')
const router = express.Router();

router.get('/login', authController.login)
router.post('/login', authController.checkLogin)

router.get('/logout', middleware.checkLogin,authController.logout)

router.get('/register', authController.register)
router.post('/register', authController.checkRegister)



module.exports = router;
