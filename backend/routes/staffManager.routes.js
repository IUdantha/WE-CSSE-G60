const express = require('express')
const authController = require('../controllers/auth.controllers')
const adminController = require('../controllers/admin.controllers')

const router = express.Router()

router.post('/register', authController.register)
// router.patch('/updateRole/:id', adminController.updateRole);
router.get('/users', adminController.getUsers)
router.get('/user/:id', adminController.getUser)
router.delete('/:id', adminController.deleteUser)
router.patch('/:id', adminController.updateUser)
router.post('/createPdf', adminController.createPdf)
router.get('/fetchPdf', adminController.fetchPdf)
module.exports = router
