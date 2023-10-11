const mongoose = require('mongoose')

const Schema = mongoose.Schema

const generatorSchema = new Schema({
  generatorID: {
    type: String,
    required: true,
    unique: true
  },
  sectionNumber: {
    type: String,
    enum: ['withering section', 'rolling section', 'fermentation section', 'drying section', 'sorting section'],
    default: 'withering section'
  },
  Voltage: {
    type: Number,
    required: true
  },
  fuelNeed: {
    type: Number,
    required: true
  },
  maintainedTimes: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  }
})

module.exports = mongoose.model('Generator', generatorSchema)
