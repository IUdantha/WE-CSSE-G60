const express = require('express')
const suppliercontroll = require('../controllers/supplier.controllers.js')
const firewoodstockcontroll = require('../controllers/firewoodstock.controllers.js')
const fertilizerstockcontroll = require('../controllers/fertilizerstock.controllers.js')
const packingmaterialstockcontroll = require('../controllers/packingmaterial.controllers.js')

const router = express.Router()

router.post('/addsupplier', suppliercontroll.addSupplier)
router.get('/getsuppliers', suppliercontroll.getSuppliers)
router.get('/getsupplierid/:id', suppliercontroll.getSupplierId)
router.put('/editsupplier/:id', suppliercontroll.editsupplier)
router.delete('/deletesupplier/:id', suppliercontroll.deleteSupplier)
router.post('/createpdfsup', suppliercontroll.createPdf)
router.get('/fetchpdfsup', suppliercontroll.fetchPdf)

router.post('/addfirewoodstock', firewoodstockcontroll.addfirewoodStock)
router.get('/getfirewoodstocks', firewoodstockcontroll.getfirewoodStock)
router.get('/getfirewoodstockid/:id', firewoodstockcontroll.getfirewoodStockId)
router.put('/editfirewoodstock/:id', firewoodstockcontroll.editfirewoodstock)
router.delete('/deletefirewoodstock/:id', firewoodstockcontroll.deletefirewoodstock)
router.post('/createpdffire', firewoodstockcontroll.createPdf)
router.get('/fetchpdffire', firewoodstockcontroll.fetchPdf)

router.post('/addfertilizerstock', fertilizerstockcontroll.addfertilizerStock)
router.get('/getfertilizerstocks', fertilizerstockcontroll.getfertilizerStock)
router.get('/getfertilizerstockid/:id', fertilizerstockcontroll.getfertilizerStockId)
router.put('/editfertilizerstock/:id', fertilizerstockcontroll.editfertilizerstock)
router.delete('/deletefertilizerstock/:id', fertilizerstockcontroll.deletefertilizerstock)

router.post('/addpackingmaterialstock', packingmaterialstockcontroll.addpackingmaterialStock)
router.get('/getpackingmaterialstocks', packingmaterialstockcontroll.getpackingmaterialStock)
router.get('/getpackingmaterialstockid/:id', packingmaterialstockcontroll.getpackingmaterialStockId)
router.put('/editpackingmaterialstock/:id', packingmaterialstockcontroll.editpackingmaterialstock)
router.delete('/deletepackingmaterialstock/:id', packingmaterialstockcontroll.deletepackingmaterialstock)
router.post('/createpdfpack', packingmaterialstockcontroll.createPdf)
router.get('/fetchpdfpack', packingmaterialstockcontroll.fetchPdf)

module.exports = router
