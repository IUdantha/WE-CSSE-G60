const Quotation = require('../models/sales.models')
const pdfTemplate = require('../models/salesreport.models')
const pdf = require('html-pdf')
const path = require('path')

// add quotation function
async function addQuotation (req, res) {
  const name = req.body.name
  const email = req.body.email
  const date = Date.parse(req.body.date)
  const price = Number(req.body.price)
  const status = req.body.status
  const producttyp = req.body.producttyp
  const packagetyp = req.body.packagetyp
  const weight = req.body.weight

  const newQuotation = new Quotation({
    name,
    email,
    date,
    price,
    status,
    producttyp,
    packagetyp,
    weight
  })

  newQuotation
    .save()
    .then(() => res.json('Quotation added Successfully'))
    .catch(err => res.status(400).json('Error: ' + err))
};

// get all quotations function
async function getQuotations (req, res) {
  Quotation.find()
    .then((quotations) => res.json(quotations))
    .catch((err) => res.status(400).json('Error ' + err))
};

// delete quotation function
async function deleteQuotation (req, res) {
  Quotation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Quotation deleted successfully'))
    .catch((err) => res.status(400).json('Error ' + err))
};

// update quotation function
async function updateQuotation (req, res) {
  Quotation.findById(req.params.id)
    .then((quotation) => {
      quotation.name = req.body.name
      quotation.email = req.body.email
      quotation.date = Date.parse(req.body.date)
      quotation.price = Number(req.body.price)
      quotation.status = req.body.status
      quotation.producttyp = req.body.producttyp
      quotation.packagetyp = req.body.packagetyp
      quotation.weight = req.body.weight

      quotation
        .save()
        .then(() => res.json('Quotation updated Succesfully'))
        .catch((err) => res.status(400).json('Error ' + err))
    })
    .catch((err) => res.status(400).json('Error ' + err))
};

// search Quotation by email
async function searchQuotation (req, res) {
  try {
    const { email } = req.params
    const quotation = await Quotation.find({
      email: { $regex: email, $option: 'i' }
    })
    res.json(quotation)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// get Quotation by id for update
async function getQuotationId (req, res, next) {
  const id = req.params.id
  let quotation
  try {
    quotation = await Quotation.findById(id)
  } catch (err) {
    console.log(err)
  }
  return res.status(201).json({ quotation })
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('salesreport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../salesreport.pdf'))
}

module.exports = { addQuotation, getQuotations, deleteQuotation, updateQuotation, searchQuotation, getQuotationId, createPdf, fetchPdf }
