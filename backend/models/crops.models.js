const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cropsSchema = new Schema({

  cropsID: {
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
  weight: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }

})

module.exports = mongoose.model('crops', cropsSchema)
