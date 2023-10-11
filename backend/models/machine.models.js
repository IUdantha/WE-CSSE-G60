const mongoose = require('mongoose')

const Schema = mongoose.Schema

const machineSchema = new Schema({
  machineID: {
    type: String,
    required: true
  },
  machineModel: {
    type: String,
    required: true
  },
  sectionNumber: {
    type: String,
    enum: ['withering section', 'rolling section', 'fermentation section', 'drying section', 'sorting section'],
    default: 'withering section'
  },
  brand: {
    type: String,
    required: true
  },
  maintenanceCost: {
    type: Number,
    required: true
  },
  lastModifiedDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  }
})

module.exports = mongoose.model('Machine', machineSchema)
