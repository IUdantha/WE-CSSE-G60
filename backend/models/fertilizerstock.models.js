const mongoose = require('mongoose')

const fertilizerstockSchema = new mongoose.Schema({

  supID: {
    type: String,
    required: true
  },

  itemType: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }

})

const FertilizerStock = mongoose.model('fertilizerstock', fertilizerstockSchema)
module.exports = FertilizerStock
