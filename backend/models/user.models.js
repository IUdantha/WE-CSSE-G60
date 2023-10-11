const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const hashPassword = require('../utils/hash.utils')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: [true, 'Email already exists.']
  },
  phone: {
    type: String,
    required: [true, 'Phone field is required.']
  },
  NIC: {
    type: String,
    required: [true, 'NIC field is required.'],
    unique: [true, 'NIC already exists.']
  },
  DOB: {
    type: Date,
    required: [true, 'DOB field is required.']
  },
  employeeID: {
    type: String,
    required: [true, 'Employee ID field is required.'],
    unique: [true, 'Employee ID already exists.']
  },
  staffEmail: {
    type: String,
    required: [true, 'Staff Email field is required.'],
    unique: [true, 'Staff Email already exists.']
  },
  password: {
    type: String,
    required: [true, 'Password field is required.']
  },
  department: {
    type: String,
    required: [true, 'Department field is required.']
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'staffManager', 'sysAdmin', 'productManager', 'vehicleOfficer', 'stockManager', 'salesManager', 'technicalManager', 'cropManager', 'payrollManager'],
      message: 'Invalid role type.'
    },
    default: 'user'
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
