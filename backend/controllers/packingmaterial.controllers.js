const PackingmaterialStock = require('../models/packingmaterialstock.models')
const pdfTemplate = require('../models/packingreport.models')
const pdf = require('html-pdf')
const path = require('path')

const addPackingmaterialStock = async (req, res, next) => {
  const { supID, itemType, quantity, price } = req.body
  let packingmaterial

  try {
    packingmaterial = new PackingmaterialStock({
      supID,
      itemType,
      quantity,
      price

    })
    await packingmaterial.save()
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ packingmaterial })
}

const getpackingmaterialStock = async (request, response) => {
  try {
    const packingmaterial = await PackingmaterialStock.find({})
    response.status(200).json(packingmaterial)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

const getpackingmaterialStockId = async (req, res, next) => {
  const id = req.params.id
  let packingmaterial

  try {
    packingmaterial = await PackingmaterialStock.findById(id)
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ packingmaterial })
}

const editpackingmaterialstock = async (req, res, next) => {
  const id = req.params.id
  const {
    quantity
  } = req.body

  let packingmaterial

  try {
    packingmaterial = await PackingmaterialStock.findByIdAndUpdate(id, {
      quantity
    })
    packingmaterial = await packingmaterial.save()
  } catch (err) {
    console.log(err)
  }

  if (!packingmaterial) {
    return res
      .status(400)
      .json({ message: 'Unable to Update stock Details.' })
  }

  return res.status(200).json({ packingmaterial })
}

const deletepackingmaterialstock = async (request, response) => {
  try {
    await PackingmaterialStock.deleteOne({ _id: request.params.id })
    response.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('packingreport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../packingreport.pdf'))
}

exports.deletepackingmaterialstock = deletepackingmaterialstock
exports.getpackingmaterialStockId = getpackingmaterialStockId
exports.editpackingmaterialstock = editpackingmaterialstock
exports.getpackingmaterialStock = getpackingmaterialStock
exports.addpackingmaterialStock = addPackingmaterialStock
exports.createPdf = createPdf
exports.fetchPdf = fetchPdf
