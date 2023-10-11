const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productionSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  quantityProduced: { type: Number, required: true },
  productionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  salesPrice: { type: Number, required: true },
  productionCost: {
    rawMaterials: { type: Number, required: true },
    labor: { type: Number, required: true },
    packing: { type: Number, required: true },
    other: { type: Number, required: true }
  }
})

productionSchema.plugin(uniqueValidator, {
  message: 'Product already exists'
})

const Production = mongoose.model('Production', productionSchema)

module.exports = Production
