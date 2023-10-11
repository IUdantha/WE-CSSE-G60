const mongoose = require('mongoose')

const packingmaterialstockSchema = new mongoose.Schema({

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

const PackingmaterialStock = mongoose.model('packingmaterialstock', packingmaterialstockSchema)
module.exports = PackingmaterialStock
