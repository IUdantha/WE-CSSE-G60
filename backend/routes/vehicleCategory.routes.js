const express = require('express')

const router = express.Router()
const VehicleCategoryController = require('../controllers/vehicle.category.controllers')

router.get('/search/:name', VehicleCategoryController.searchCategories)
router.get('/', VehicleCategoryController.getCategories)
router.post('/', VehicleCategoryController.storeCategory)
router.get('/:id', VehicleCategoryController.getCategory)
router.patch('/:id', VehicleCategoryController.updateCategory)
router.delete('/:id', VehicleCategoryController.deleteCategory)

module.exports = router
