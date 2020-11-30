const express = require('express')
const meController  = require('../app/controller/me.controller')
const middleware = require('../middleware/middleware')
const router = express.Router();



router.get('/list/:slug', middleware.checkLogin, meController.show)

module.exports = router;
