const mongoose = require('mongoose')

const vehicleCategorySchema = new mongoose.Schema({
  vehicleCategoryName: {
    type: String,
    required: true
  }
})

const VehicleCategory = mongoose.model('VehicleCategory', vehicleCategorySchema)

module.exports = VehicleCategory
