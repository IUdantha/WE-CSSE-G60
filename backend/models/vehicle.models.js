const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const vehicleSchema = new mongoose.Schema({
  vehicleRegNo: {
    type: String,
    required: true,
    unique: true
  },
  vehicleBrand: {
    type: String,
    required: true
  },

  vehicleModel: {
    type: String,
    required: true
  },
  vehicleCategory: {
    type: mongoose.Types.ObjectId,
    ref: 'vehiclecategories',
    required: true
  },
  vehicleBoughtDate: {
    type: Date,
    required: true
  },
  vehicleRegisteredYear: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['owned', 'sold'],
    default: 'owned'
  }
})

vehicleSchema.plugin(uniqueValidator, { message: 'Vehicle registration number already exists' })

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle
