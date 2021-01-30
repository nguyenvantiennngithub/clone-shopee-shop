const express = require('express')
const cartController  = require('../app/controller/cart.controller')
const middleware = require('../middleware/middleware')
const router = express.Router();
router.get('/', middleware.checkLogin, cartController.cart)
router.get('/test', middleware.checkLogin, cartController.cart)
router.post('/buy', middleware.checkLogin, cartController.buy)
router.post('/:slug/add-cart', middleware.checkLogin, cartController.addCart)
router.get('/address', middleware.checkLogin, cartController.address)
router.get('/:slug/:color/delete', middleware.checkLogin, cartController.delete)
router.get('/:slug/:quantity/:color/edit-cart', middleware.checkLogin, cartController.editCart)



module.exports = router;