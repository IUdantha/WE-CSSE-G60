const mongoose = require('mongoose')

const QuotationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Processing', 'Done'],
    // default: 'New'
    required: true
  },
  producttyp: {
    type: String,
    enum: ['Tea', 'Coffee', 'Other'],
    // default: 'Tea'
    required: true
  },
  packagetyp: {
    type: String,
    enum: ['Can', 'Packet', 'Bottle', 'Tea Bags'],
    // default: 'Can'
    required: true
  },
  weight: {
    type: String,
    enum: ['100g', '125g', '150g', '200g', '500g', '1000g'],
    required: true
  }
}, {
  timestamps: true
})

const Quotation = mongoose.model('quotation', QuotationSchema)

module.exports = Quotation
