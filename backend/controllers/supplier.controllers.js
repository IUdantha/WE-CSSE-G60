
const Stocksupplier = require('../models/supplier.models')
const pdfTemplate = require('../models/supplierreport.models')
const pdf = require('html-pdf')
const path = require('path')

const addSupplier = async (req, res, next) => {
  const { supID, sname, semail, scontact, scompany } = req.body
  let supplier

  try {
    supplier = new Stocksupplier({
      supID,
      sname,
      semail,
      scontact,
      scompany

    })
    await supplier.save()
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ supplier })
}

const getSuppliers = async (request, response) => {
  try {
    const supplier = await Stocksupplier.find({})
    response.status(200).json(supplier)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

const getSupplierId = async (req, res, next) => {
  const id = req.params.id
  let supplier

  try {
    supplier = await Stocksupplier.findById(id)
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ supplier })
}

const editsupplier = async (req, res, next) => {
  const id = req.params.id
  const {
    supID,
    sname,
    semail,
    scontact,
    scompany
  } = req.body

  let supplier

  try {
    supplier = await Stocksupplier.findByIdAndUpdate(id, {
      supID,
      sname,
      semail,
      scontact,
      scompany
    })
    supplier = await supplier.save()
  } catch (err) {
    console.log(err)
  }

  if (!supplier) {
    return res
      .status(400)
      .json({ message: 'Unable to Update supplier Details.' })
  }

  return res.status(200).json({ supplier })
}

const deleteSupplier = async (request, response) => {
  try {
    await Stocksupplier.deleteOne({ _id: request.params.id })
    response.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('supplierreport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../supplierreport.pdf'))
}

exports.deleteSupplier = deleteSupplier
exports.getSupplierId = getSupplierId
exports.editsupplier = editsupplier
exports.getSuppliers = getSuppliers
exports.addSupplier = addSupplier
exports.createPdf = createPdf
exports.fetchPdf = fetchPdf
