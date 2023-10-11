const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const salaryIncrementSchema = new mongoose.Schema({
  salaryEmployeeID: {
    type: String,
    required: true,
    unique: true
  },

  salaryEmployeeName: {
    type: String,
    required: true
  },

  salaryJobTitle: {
    type: String,
    required: true
  },

  salaryBasicSalary: {
    type: Number,
    required: true
  },

  incrementType: {
    type: String,
    enum: ['annual', 'promotional', 'cola', 'other'],
    default: 'annual'
  },

  incrementValue: {
    type: Number,
    required: true
  },

  salaryNetSalary: {
    type: Number,
    required: true
  }

})

salaryIncrementSchema.plugin(uniqueValidator, { message: 'Employee ID already exists' })

const SalaryIncrement = mongoose.model('SalaryIncrement', salaryIncrementSchema)

module.exports = SalaryIncrement
