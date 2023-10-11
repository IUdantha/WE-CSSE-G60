const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({

  supID: {
    type: String,
    required: true
  },

  sname: {
    type: String,
    required: true
  },
  semail: {
    type: String,
    required: true
  },
  scontact: {
    type: String,
    required: true
  },
  scompany: {
    type: String,
    required: true
  }

})

const Supplier = mongoose.model('supplier', supplierSchema)
module.exports = Supplier
