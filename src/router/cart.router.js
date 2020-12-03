const express = require('express')
const cartController  = require('../app/controller/cart.controller')
const middleware = require('../middleware/middleware')
const router = express.Router();
router.post('/:slug/add-cart', middleware.checkLogin, cartController.addCart)
router.get('/:slug/:slugColor/delete', middleware.checkLogin, cartController.delete)

module.exports = router;