const Generator = require('../models/generator.models.js')
const pdfTemplate = require('../models/generatorreport.models.js')
const pdf = require('html-pdf')
const path = require('path')

const getAllGenerators = async (req, res, next) => {
  let generators

  try {
    generators = await Generator.find()
  } catch (err) {
    console.log(err)
  }
  if (!generators) {
    return res
      .status(404)
      .json({ message: 'No Generators found in the system' })
  }
  return res.status(200).json({ generators })
}

const getByGeneratorById = async (req, res, next) => {
  const id = req.params.id
  let generator

  try {
    generator = await Generator.findById(id)
  } catch (err) {
    console.log(err)
  }

  if (!generator) {
    return res.status(500).json({ message: 'No Book found' })
  }

  return res.status(201).json({ generator })
}

const addGenerator = async (req, res, next) => {
  const {
    generatorID,
    sectionNumber,
    Voltage,
    fuelNeed,
    maintainedTimes,
    status
  } = req.body
  let generator

  try {
    generator = new Generator({
      generatorID,
      sectionNumber,
      Voltage,
      fuelNeed,
      maintainedTimes,
      status
    })
    await generator.save()
  } catch (err) {
    console.log(err)
  }

  if (!generator) {
    return res
      .status(500)
      .json({ message: 'Unable to Add generator to the system.' })
  }

  return res.status(201).json({ generator })
}

const updateGenerator = async (req, res, next) => {
  const id = req.params.id
  const {
    generatorID,
    sectionNumber,
    Voltage,
    fuelNeed,
    maintainedTimes,
    status
  } = req.body

  let generator

  try {
    generator = await Generator.findByIdAndUpdate(id, {
      generatorID,
      sectionNumber,
      Voltage,
      fuelNeed,
      maintainedTimes,
      status
    })
    generator = await generator.save()
  } catch (err) {
    console.log(err)
  }

  if (!generator) {
    return res
      .status(400)
      .json({ message: 'Unable to Update Generator Details.' })
  }

  return res.status(200).json({ generator })
}

const deleteGenerator = async (req, res, next) => {
  const id = req.params.id
  let generator

  try {
    generator = await Generator.findByIdAndRemove(id)
  } catch (err) {
    console.log(err)
  }
  if (!generator) {
    return res
      .status(404)
      .json({ message: 'Unable to remove  generator Details.' })
  }

  return res.status(200).json({ message: 'Generator Successfully Deleted ' })
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('generatorreport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../generatorreport.pdf'))
}

exports.getAllGenerators = getAllGenerators
exports.getByGeneratorById = getByGeneratorById
exports.addGenerator = addGenerator
exports.updateGenerator = updateGenerator
exports.deleteGenerator = deleteGenerator
exports.createPdf = createPdf
exports.fetchPdf = fetchPdf
