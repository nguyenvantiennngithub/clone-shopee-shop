const express = require('express')
const productController  = require('../app/controller/product.controller')
const middleware = require('../middleware/middleware')
const router = express.Router();
router.get("/", productController.home)
router.post('/save', middleware.checkLogin, productController.save)
router.get('/create', middleware.checkLogin, productController.create)
router.post("/:slug/update", middleware.checkLogin, productController.update)
router.get("/:slug/soft-delete", middleware.checkLogin, productController.softDelete)
router.get("/:slug/restore", middleware.checkLogin, productController.restore)
router.get("/:slug/edit", middleware.checkLogin, productController.edit)
router.get("/:slug/delete", middleware.checkLogin, productController.delete)
router.get("/:slug/detail", productController.detail)

module.exports = router;