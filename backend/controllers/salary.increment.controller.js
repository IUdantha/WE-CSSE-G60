const Increment = require('../models/salary.increment.models')
const Salary = require('../models/salary.models')

// function to get all increments
async function getIncrements (req, res) {
  try {
    const increments = await Increment.find()
    res.json(increments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to store increments
async function storeIncrement (req, res) {
  const {
    salaryEmployeeID,
    salaryEmployeeName,
    salaryJobTitle,
    salaryBasicSalary,
    incrementType,
    incrementValue,
    salaryNetSalary
  } = req.body

  // validate the request
  if (
    !salaryEmployeeID ||
    salaryEmployeeID === '' ||
    !salaryEmployeeName ||
    salaryEmployeeName === '' ||
    !salaryJobTitle ||
    salaryJobTitle === '' ||
    !salaryBasicSalary ||
    salaryBasicSalary === '' ||
    !incrementType ||
    incrementType === '' ||
    !incrementValue ||
    incrementValue === '' ||
    !salaryNetSalary ||
    salaryNetSalary === ''
  ) {
    return res.status(400).send({
      message: 'All fields are required'
    })
  }

  const increment = new Increment({
    salaryEmployeeID,
    salaryEmployeeName,
    salaryJobTitle,
    salaryBasicSalary,
    incrementType,
    incrementValue,
    salaryNetSalary
  })
  try {
    const newIncrement = await increment.save()
    res.status(201).json(newIncrement)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// function to get a single increment
async function getIncrement (req, res) {
  try {
    const increment = await Increment.findById(req.params.id)
    res.json(increment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to update a increment
async function updateIncrement (req, res) {
  try {
    const increment = await Increment.findById(req.params.id)
    if (increment) {
      // validate the request
      const {
        salaryEmployeeID,
        salaryEmployeeName,
        salaryJobTitle,
        salaryBasicSalary,
        incrementType,
        incrementValue,
        salaryNetSalary
      } = req.body

      if (
        !salaryEmployeeID ||
        salaryEmployeeID === '' ||
        !salaryEmployeeName ||
        salaryEmployeeName === '' ||
        !salaryJobTitle ||
        salaryJobTitle === '' ||
        !salaryBasicSalary ||
        salaryBasicSalary === '' ||
        !incrementType ||
        incrementType === '' ||
        !incrementValue ||
        incrementValue === '' ||
        !salaryNetSalary ||
        salaryNetSalary === ''
      ) {
        return res.status(400).send({
          message: 'All fields are required'
        })
      }

      increment.salaryEmployeeID = salaryEmployeeID
      increment.salaryEmployeeName = salaryEmployeeName
      increment.salaryJobTitle = salaryJobTitle
      increment.salaryBasicSalary = salaryBasicSalary
      increment.incrementType = incrementType
      increment.incrementValue = incrementValue
      increment.salaryNetSalary = salaryNetSalary

      const updatedIncrement = await increment.save()
      res.json(updatedIncrement)
    } else {
      res.status(404).json({ message: 'Increment not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to delete a increment
async function deleteIncrement (req, res) {
  try {
    const increment = await Increment.findById(req.params.id)
    if (increment) {
      await increment.remove()
      res.json({ message: 'Increment removed' })
    } else {
      res.status(404).json({ message: 'Increment not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to search increments by emp ID
async function searchIncrements (req, res) {
  try {
    const { salaryEmployeeID } = req.params

    if (!salaryEmployeeID || salaryEmployeeID === '') {
      return res.status(400).send({
        message: 'Search term cannot be empty!!!'
      })
    }

    const increments = await Increment.find({
      salaryEmployeeID: { $regex: salaryEmployeeID, $options: 'i' }
    })
    res.json(increments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getIncrements,
  storeIncrement,
  getIncrement,
  updateIncrement,
  deleteIncrement,
  searchIncrements
}
