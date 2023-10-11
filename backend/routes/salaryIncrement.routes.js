const express = require('express')

const router = express.Router()
const SalaryIncrementController = require('../controllers/salary.increment.controller')

router.get('/search/:salaryEmployeeID', SalaryIncrementController.searchIncrements)
router.get('/', SalaryIncrementController.getIncrements)
router.post('/', SalaryIncrementController.storeIncrement)
router.get('/:id', SalaryIncrementController.getIncrement)
router.patch('/:id', SalaryIncrementController.updateIncrement)
router.delete('/:id', SalaryIncrementController.deleteIncrement)

module.exports = router
