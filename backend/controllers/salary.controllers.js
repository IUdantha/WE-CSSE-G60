const Salary = require('../models/salary.models')
const pdf = require('html-pdf')
const path = require('path')
const pdfTemplate = require('../models/salary-report.models')

// function to get all salaries
async function getSalaries (req, res) {
  try {
    const salaries = await Salary.find()
    res.json(salaries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to store salaries
async function storeSalary (req, res) {
  const {
    salaryEmployeeID,
    salaryEmployeeName,
    salaryJobTitle,
    salaryRole,
    salaryBasicSalary,
    salaryNetSalary,
    salaryStatus
  } = req.body

  // validate the request
  if (
    !salaryEmployeeID ||
    salaryEmployeeID === '' ||
    !salaryEmployeeName ||
    salaryEmployeeName === '' ||
    !salaryJobTitle ||
    salaryJobTitle === '' ||
    !salaryRole ||
    salaryRole === '' ||
    !salaryBasicSalary ||
    salaryBasicSalary === '' ||
    !salaryNetSalary ||
    salaryNetSalary === '' ||
    !salaryStatus ||
    salaryStatus === ''
  ) {
    return res.status(400).send({
      message: 'All fields are required'
    })
  }

  const salary = new Salary({
    salaryEmployeeID,
    salaryEmployeeName,
    salaryJobTitle,
    salaryRole,
    salaryBasicSalary,
    salaryNetSalary,
    salaryStatus
  })

  try {
    const newSalary = await salary.save()
    res.status(201).json(newSalary)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// function to get a single salary
async function getSalary (req, res) {
  try {
    const salary = await Salary.findById(req.params.id)
    res.json(salary)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to update a single salary
async function updateSalary (req, res) {
  try {
    const salary = await Salary.findById(req.params.id)
    if (salary) {
      // validate the request
      const {
        salaryEmployeeID,
        salaryEmployeeName,
        salaryJobTitle,
        salaryRole,
        salaryBasicSalary,
        salaryNetSalary,
        salaryStatus
      } = req.body

      if (
        !salaryEmployeeID ||
        salaryEmployeeID === '' ||
        !salaryEmployeeName ||
        salaryEmployeeName === '' ||
        !salaryJobTitle ||
        salaryJobTitle === '' ||
        !salaryRole ||
        salaryRole === '' ||
        !salaryBasicSalary ||
        salaryBasicSalary === '' ||
        !salaryNetSalary ||
        salaryNetSalary === '' ||
        !salaryStatus ||
        salaryStatus === ''
      ) {
        return res.status(400).send({
          message: 'All fields are required'
        })
      }

      salary.salaryEmployeeID = salaryEmployeeID
      salary.salaryEmployeeName = salaryEmployeeName
      salary.salaryJobTitle = salaryJobTitle
      salary.salaryRole = salaryRole
      salary.salaryBasicSalary = salaryBasicSalary
      salary.salaryNetSalary = salaryNetSalary
      salary.salaryStatus = salaryStatus

      const updatedSalary = await salary.save()
      res.json(updatedSalary)
    } else {
      res.status(404).json({ message: 'Salary not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to delete a single salary
async function deleteSalary (req, res) {
  try {
    const salary = await Salary.findById(req.params.id)
    if (salary) {
      await salary.remove()
      res.json({ message: 'Salary removed' })
    } else {
      res.status(404).json({ message: 'Salary not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// search salary by employee ID
async function searchSalary (req, res) {
  try {
    const { salaryEmployeeID } = req.params

    if (!salaryEmployeeID || salaryEmployeeID === '') {
      return res.status(400).send({
        message: 'Search term cannot be empty!!!'
      })
    }

    const salary = await Salary.find({
      salaryEmployeeID: { $regex: salaryEmployeeID, $options: 'i' }
    })
    res.json(salary)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('salary-report.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  console.log('run')
  res.sendFile(path.join(__dirname, '../salary-report.pdf'))
}

module.exports = {
  getSalaries,
  storeSalary,
  getSalary,
  updateSalary,
  deleteSalary,
  searchSalary,
  createPdf,
  fetchPdf
}
