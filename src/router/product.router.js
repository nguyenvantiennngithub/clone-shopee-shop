const express = require('express')
const productController  = require('../app/controller/product.controller')

const router = express.Router();

router.get("/", productController.home)

module.exports = router;