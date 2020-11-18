const express = require('express')
const productController  = require('../app/controller/product.controller')

const router = express.Router();

router.get("/", productController.home)
router.get('/create', productController.create)
router.post('/save', productController.save)
router.get("/:slug/soft-delete", productController.softDelete)

router.get("/:slug/delete", productController.delete)
router.get("/:slug/detail", productController.detail)

module.exports = router;