const express = require('express')
const router = express.Router()
const machineController = require('../controllers/machine.controllers.js')

router.post('/createpdf', machineController.createPdf)
router.get('/fetchpdf', machineController.fetchPdf)
router.get('/', machineController.getAllMachines)
router.post('/', machineController.addMachine)
router.get('/:id', machineController.getByMachineById)
router.put('/:id', machineController.updateMachine)
router.delete('/:id', machineController.deleteMachine)

module.exports = router
