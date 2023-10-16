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

function transportManagement (req, res, next) {
  if (req.user.role !== 'sysAdmin' && req.user.role !== 'transportManager') {
    console.log(req.user.role)
    return res.status(403).send({ message: 'You do not have permissions!' })
  }
  next()
}
module.exports = { auth, sysAdmin, staffManagement, transportManagement }
