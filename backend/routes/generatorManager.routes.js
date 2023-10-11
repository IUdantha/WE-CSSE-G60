const express = require('express')
const router = express.Router()
const generatorController = require('../controllers/generator.controllers.js')

router.post('/createpdf', generatorController.createPdf)
router.get('/fetchpdf', generatorController.fetchPdf)
router.get('/', generatorController.getAllGenerators)
router.post('/', generatorController.addGenerator)
router.get('/:id', generatorController.getByGeneratorById)
router.put('/:id', generatorController.updateGenerator)
router.delete('/:id', generatorController.deleteGenerator)

module.exports = router
