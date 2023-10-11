const bcrypt = require('bcryptjs')

async function hashPassword (password) {
  return await bcrypt.hash(password, 8)
}

module.exports = hashPassword
