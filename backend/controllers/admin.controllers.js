const User = require('../models/user.models')
const pdfTemplate = require('../models/staff.report')
const pdf = require('html-pdf')
const path = require('path')

async function getUsers (req, res) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function deleteUser (req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function getUser (req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// async function updateRole(req, res){
//     try{
//         const user = await User.findById(req.params.id);
//         if(user){
//             user.role = req.body.role;
//             const user = await user.save();
//             res.json(user);
//         }else{
//             res.status(404).json({ message: 'User not found' });
//         }
//     }catch(error){
//         res.status(500).json({ message: error.message });
//     }
// }

async function updateUser (req, res) {
  try {
    const { name, email, phone, NIC, DOB, employeeID, staffEmail, password, department, role } = req.body
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = name || user.name
      user.email = email || user.email
      user.phone = phone || user.phone
      user.NIC = NIC || user.NIC
      user.DOB = DOB || user.DOB
      user.employeeID = employeeID || user.employeeID
      user.staffEmail = staffEmail || user.staffEmail
      user.password = password || user.password
      user.department = department || user.department
      user.role = role || user.role

      const updatedUser = await user.save()
      res.json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('StaffReport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}
const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../StaffReport.pdf'))
}

module.exports = { getUsers, deleteUser, updateUser, getUser, createPdf, fetchPdf }
