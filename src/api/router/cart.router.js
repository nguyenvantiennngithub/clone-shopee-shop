const express = require('express')
const cartController  = require('../controller/cart.controller')
const middleware = require('../../middleware/middleware')
const router = express.Router();

function api(app){
    app.get('/api/cart', middleware.checkLogin, cartController.cartApi)

}

module.exports = api;