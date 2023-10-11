const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierSchema = new Schema({

  supplierID: {
    type: String,
    required: true
  },
  supplierName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('supplierc', supplierSchema)
