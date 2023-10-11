const express = require('express')

const router = express.Router()
const ProductionController = require('../controllers/production.controllers')

// router.get('/search/:productName', ProductionController.searchProduct)
router.get('/', ProductionController.getProductions)
router.post('/', ProductionController.storeProduction)
router.get('/:id', ProductionController.getProduction)
router.put('/:id', ProductionController.updateProduction)
router.delete('/:id', ProductionController.deleteProduction)

module.exports = router
