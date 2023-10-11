const express = require('express')
const authController = require('../controllers/auth.controllers')

const router = express.Router()

router.post('/', authController.login)

module.exports = router
