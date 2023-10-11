const Vehicle = require('../models/vehicle.models')
const pdf = require('html-pdf')
const path = require('path')
const pdfTemplate = require('../models/vehicle-report.models')

// function to get all vehicles
async function getVehicles (req, res) {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to store vehicles
async function storeVehicle (req, res) {
  const {
    vehicleRegNo,
    vehicleBrand,
    vehicleModel,
    vehicleCategory,
    vehicleBoughtDate,
    vehicleRegisteredYear,
    owner
  } = req.body

  // validate the request
  if (
    !vehicleRegNo ||
		vehicleRegNo === '' ||
		!vehicleBrand ||
		vehicleBrand === '' ||
		!vehicleModel ||
		vehicleModel === '' ||
		!vehicleCategory ||
		vehicleCategory === '' ||
		!vehicleBoughtDate ||
		vehicleBoughtDate === '' ||
		!vehicleRegisteredYear ||
		vehicleRegisteredYear === '' ||
		!owner ||
		owner === ''
  ) {
    return res.status(400).send({
      message: 'All fields are required'
    })
  }

  const vehicle = new Vehicle({
    vehicleRegNo,
    vehicleBrand,
    vehicleModel,
    vehicleCategory,
    vehicleBoughtDate,
    vehicleRegisteredYear,
    owner
  })

  try {
    const newVehicle = await vehicle.save()
    res.status(201).json(newVehicle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// function to get a single vehicle
async function getVehicle (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    res.json(vehicle)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to update a vehicle
async function updateVehicle (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    if (vehicle) {
      // validate the request
      const {
        vehicleRegNo,
        vehicleBrand,
        vehicleModel,
        vehicleCategory,
        vehicleBoughtDate,
        vehicleRegisteredYear,
        owner,
        status
      } = req.body

      if (
        !vehicleRegNo ||
				vehicleRegNo === '' ||
				!vehicleBrand ||
				vehicleBrand === '' ||
				!vehicleModel ||
				vehicleModel === '' ||
				!vehicleCategory ||
				vehicleCategory === '' ||
				!vehicleBoughtDate ||
				vehicleBoughtDate === '' ||
				!vehicleRegisteredYear ||
				vehicleRegisteredYear === '' ||
				!owner ||
				owner === '' ||
				!status ||
				status === ''
      ) {
        return res.status(400).send({
          message: 'All fields are required'
        })
      }

      vehicle.vehicleRegNo = vehicleRegNo
      vehicle.vehicleBrand = vehicleBrand
      vehicle.vehicleModel = vehicleModel
      vehicle.vehicleCategory = vehicleCategory
      vehicle.vehicleBoughtDate = vehicleBoughtDate
      vehicle.vehicleRegisteredYear = vehicleRegisteredYear
      vehicle.owner = owner
      vehicle.status = status

      const updatedVehicle = await vehicle.save()
      res.json(updatedVehicle)
    } else {
      res.status(404).json({ message: 'Vehicle not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to delete a vehicle
async function deleteVehicle (req, res) {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    if (vehicle) {
      await vehicle.remove()
      res.json({ message: 'Vehicle removed' })
    } else {
      res.status(404).json({ message: 'Vehicle not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// search vehicle by vehicleRegNo
async function searchVehicle (req, res) {
  try {
    const { vehicleRegNo } = req.params
    const vehicle = await Vehicle.find({
      vehicleRegNo: { $regex: vehicleRegNo, $options: 'i' }
    })
    res.json(vehicle)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// generate report
const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('vehicle-report.pdf', (err) => {
    if (err) {
      console.log(err)
    }
    res.send('PDF generated')
  })
}

const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../vehicle-report.pdf'))
}

module.exports = {
  getVehicles,
  storeVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicle,
  createPdf,
  fetchPdf
}
