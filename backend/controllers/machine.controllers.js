const Machine = require('../models/machine.models.js')
const pdfTemplate = require('../models/machinereport.models.js')
const pdf = require('html-pdf')
const path = require('path')

const getAllMachines = async (req, res, next) => {
  let machines

  try {
    machines = await Machine.find()
  } catch (err) {
    console.log(err)
  }
  if (!machines) {
    return res.status(404).json({ message: 'No Machines found in the system' })
  }
  return res.status(200).json({ machines })
}

const addMachine = async (req, res, next) => {
  const {
    machineID,
    machineModel,
    sectionNumber,
    brand,
    maintenanceCost,
    lastModifiedDate,
    status
  } = req.body
  let machine

  try {
    machine = new Machine({
      machineID,
      machineModel,
      sectionNumber,
      brand,
      maintenanceCost,
      lastModifiedDate,
      status
    })
    await machine.save()
  } catch (err) {
    console.log(err)
  }

  if (!machine) {
    return res
      .status(500)
      .json({ message: 'Unable to Add machine to the system.' })
  }

  return res.status(201).json({ machine })
}

const getByMachineById = async (req, res, next) => {
  const id = req.params.id
  let machine

  try {
    machine = await Machine.findById(id)
  } catch (err) {
    console.log(err)
  }

  if (!machine) {
    return res.status(500).json({ message: 'No Machine found' })
  }

  return res.status(201).json({ machine })
}

const updateMachine = async (req, res, next) => {
  const id = req.params.id
  const {
    machineID,
    machineModel,
    sectionNumber,
    brand,
    maintenanceCost,
    lastModifiedDate,
    status
  } = req.body

  let machine

  try {
    machine = await Machine.findByIdAndUpdate(id, {
      machineID,
      machineModel,
      sectionNumber,
      brand,
      maintenanceCost,
      lastModifiedDate,
      status
    })
    machine = await machine.save()
  } catch (err) {
    console.log(err)
  }

  if (!machine) {
    return res
      .status(400)
      .json({ message: 'Unable to Update machine Details.' })
  }

  return res.status(200).json({ machine })
}

const deleteMachine = async (req, res, next) => {
  const id = req.params.id
  let machine

  try {
    machine = await Machine.findByIdAndRemove(id)
  } catch (err) {
    console.log(err)
  }
  if (!machine) {
    return res
      .status(404)
      .json({ message: 'Unable to remove  machine Details.' })
  }

  return res.status(200).json({ message: 'Machine Successfully Deleted ' })
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('machinereport.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../machinereport.pdf'))
}

exports.getAllMachines = getAllMachines
exports.addMachine = addMachine
exports.getByMachineById = getByMachineById
exports.updateMachine = updateMachine
exports.deleteMachine = deleteMachine
exports.createPdf = createPdf
exports.fetchPdf = fetchPdf
