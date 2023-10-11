const express = require('express')
const router = express.Router()
const suppliercController = require('../controllers/supplierC.controllers')

router.get('/', suppliercController.getAllSuppliers)
router.post('/', suppliercController.addSupplier)
router.get('/:id', suppliercController.getBySupplierById)
router.put('/:id', suppliercController.updateSupplier)
router.delete('/:id', suppliercController.deleteSupplier)

module.exports = router
