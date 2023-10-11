const mongoose = require('mongoose')

const firewoodstockSchema = new mongoose.Schema({

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

const FirewoodStock = mongoose.model('firewoodstock', firewoodstockSchema)
module.exports = FirewoodStock
