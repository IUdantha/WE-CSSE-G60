const express = require('express')
const quotationController = require('../controllers/sales.controllers')
// const pdfC = require('../controllers/sales.controllers')

const router = express.Router()

router.post('/add', quotationController.addQuotation)

router.get('/all', quotationController.getQuotations)

router.get('/getquotationid/:id', quotationController.getQuotationId)

router.delete('/deletequo/:id', quotationController.deleteQuotation)

router.put('/updatequo/:id', quotationController.updateQuotation)

router.get('/add/search/:email', quotationController.searchQuotation)

router.post('/createpdf', quotationController.createPdf)

router.get('/fetchpdf', quotationController.fetchPdf)

module.exports = router
