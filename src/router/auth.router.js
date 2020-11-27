const express = require('express')
const authController  = require('../app/controller/auth.controller')

const router = express.Router();

router.get('/login', authController.login)
router.post('/login', authController.checkLogin)
router.get('/register', authController.register)
router.post('/register', authController.checkRegister)



module.exports = router;
