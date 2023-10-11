const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },

  productCode: {
    type: String,
    unique: true,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: ['tea', 'coffee', 'other'],
    default: 'other'
  },

  flavour: {
    type: String,
    required: true
  },

  //   : {
  //     type: mongoose.Types.ObjectId,
  //     ref: 'vehiclecategories',
  //     required: true
  //   },

  qualityControlInformation: {
    type: String,
    required: true
  },

  certifications: {
    type: String,
    required: true
  },

  inventoryStatus: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  packageType: {
    type: String,
    required: true
  },

  weight: {
    type: String,
    required: true
  },

  barcode: {
    type: String,
    required: true
  },

  serialNumber: {
    type: Number,
    required: true
  }

})

productSchema.plugin(uniqueValidator, {
  message: 'Product already exists'
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
