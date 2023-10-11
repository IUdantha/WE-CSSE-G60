const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const salarySchema = new mongoose.Schema({
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

  salaryRole: {
    type: String,
    required: true
  },

  salaryBasicSalary: {
    type: Number,
    required: true
  },

  salaryNetSalary: {
    type: Number,
    required: true
  },

  salaryStatus: {
    type: String,
    enum: ['paid', 'unpaid', 'in progress'],
    default: 'unpaid'
  }
})

salarySchema.plugin(uniqueValidator, { message: 'Employee ID already exists' })

const Salary = mongoose.model('Salary', salarySchema)

module.exports = Salary
