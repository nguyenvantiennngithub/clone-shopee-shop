const express = require('express')
const meController  = require('../app/controller/me.controller')

const router = express.Router();

router.get('/list/:slug', meController.show)

module.exports = router;
