const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).send('You need to Log In!')

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).send('Failed to Authorize!')
  }
}

function sysAdmin (req, res, next) {
  if (req.user.role !== 'sysAdmin') {
    return res.status(403).send({ message: 'Access denied only Administrator is allowed!' })
  }
  next()
}

function staffManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'staffManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}

function productManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'productManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}

function vehicleManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'vehicleOfficer') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}

function stockManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'stockManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}
function salesManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'salesManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}
function technicalManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'technicalManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}
function salaryManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'payrollManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}
module.exports = { auth, sysAdmin, staffManagement, productManagement, vehicleManagement, stockManagement, salesManagement, technicalManagement, salaryManagement }
