const express = require('express')

const router = express.Router()
const ProductController = require('../controllers/products.controllers')

router.get('/search/:productName', ProductController.searchProduct)
router.get('/', ProductController.getProducts)
router.post('/', ProductController.storeProduct)
router.get('/:id', ProductController.getProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
