const express = require('express')

const router = express.Router()

const SalaryController = require('../controllers/salary.controllers')

router.get('/fetchpdf', SalaryController.fetchPdf)
router.post('/createpdf', SalaryController.createPdf)
router.get('/search/:salaryEmployeeID', SalaryController.searchSalary)
router.get('/', SalaryController.getSalaries)
router.post('/', SalaryController.storeSalary)
router.get('/:id', SalaryController.getSalary)
router.patch('/:id', SalaryController.updateSalary)
router.delete('/:id', SalaryController.deleteSalary)

module.exports = router
