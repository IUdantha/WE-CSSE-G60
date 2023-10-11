const express = require('express')

const router = express.Router()
const VehicleController = require('../controllers/vehicle.controllers')

router.get('/fetchpdf', VehicleController.fetchPdf)
router.post('/createpdf', VehicleController.createPdf)
router.get('/search/:vehicleRegNo', VehicleController.searchVehicle)
router.get('/', VehicleController.getVehicles)
router.post('/', VehicleController.storeVehicle)
router.get('/:id', VehicleController.getVehicle)
router.patch('/:id', VehicleController.updateVehicle)
router.delete('/:id', VehicleController.deleteVehicle)

module.exports = router
