const Crops = require('../models/crops.models')
const pdfTemplate = require('../models//cropsReport')
const pdf = require('html-pdf')
const path = require('path')

const getAllCrops = async (req, res, next) => {
  let crops

  try {
    crops = await Crops.find()
  } catch (err) {
    console.log(err)
  }
  if (!crops) {
    return res
      .status(404)
      .json({ message: 'No Crops found in the system' })
  }
  return res.status(200).json({ crops })
}

const addCrops = async (req, res, next) => {
  const {
    cropsID,
    supplierName,
    contactNumber,
    weight,
    date

  } = req.body
  let crops

  try {
    crops = new Crops({
      cropsID,
      supplierName,
      contactNumber,
      weight,
      date
    })
    await crops.save()
  } catch (err) {
    console.log(err)
  }

  if (!crops) {
    return res
      .status(500)
      .json({ message: 'Unable to Add Crops to the system.' })
  }

  return res.status(201).json({ crops })
}

const getByCropsById = async (req, res, next) => {
  const id = req.params.id
  let crops

  try {
    crops = await Crops.findById(id)
  } catch (err) {
    console.log(err)
  }

  if (!crops) {
    return res.status(500).json({ message: 'No Book found' })
  }

  return res.status(201).json({ crops })
}

const updateCrops = async (req, res, next) => {
  const id = req.params.id
  const {
    cropsID,
    supplierName,
    contactNumber,
    weight,
    date
  } = req.body

  let crops

  try {
    crops = await Crops.findByIdAndUpdate(id, {
      cropsID,
      supplierName,
      contactNumber,
      weight,
      date
    })
    crops = await crops.save()
  } catch (err) {
    console.log(err)
  }

  if (!crops) {
    return res
      .status(400)
      .json({ message: 'Unable to Update Crops Details.' })
  }

  return res.status(200).json({ crops })
}

const deleteCrops = async (req, res, next) => {
  const id = req.params.id
  let crops

  try {
    crops = await Crops.findByIdAndRemove(id)
  } catch (err) {
    console.log(err)
  }
  if (!crops) {
    return res
      .status(404)
      .json({ message: 'Unable to remove  Crops Details.' })
  }

  return res.status(200).json({ message: 'Crops Successfully Deleted ' })
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('Cropsreport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../Cropsreport.pdf'))
}

exports.getAllCrops = getAllCrops
exports.addCrops = addCrops
exports.getByCropsById = getByCropsById
exports.updateCrops = updateCrops
exports.deleteCrops = deleteCrops
exports.createPdf = createPdf
exports.fetchPdf = fetchPdf
