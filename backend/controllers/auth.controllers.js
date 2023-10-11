const jwt = require('jsonwebtoken')
const User = require('../models/user.models')

async function login (req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isMatch = await user.checkPassword(password)
    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET)
    res.send({ token, role: user.role })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

async function register (req, res) {
  try {
    const { name, email, phone, NIC, DOB, employeeID, staffEmail, password, department, role } = req.body
    const user = new User({ name, email, phone, NIC, DOB, employeeID, staffEmail, password, department, role })
    await user.validate()
    await user.save()
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET)
    res.send({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { login, register }
