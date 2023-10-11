const Supplier = require('../models/posts')

const getAllSuppliers = async (req, res, next) => {
  let suppliers

  try {
    suppliers = await Supplier.find()
  } catch (err) {
    console.log(err)
  }
  if (!suppliers) {
    return res
      .status(404)
      .json({ message: 'No Suppliers found in the system' })
  }
  return res.status(200).json({ suppliers })
}

const addSupplier = async (req, res, next) => {
  const {
    supplierID,
    supplierName,
    contactNumber,
    address,
    vehicleNumber

  } = req.body
  let supplier

  try {
    supplier = new Supplier({
      supplierID,
      supplierName,
      contactNumber,
      address,
      vehicleNumber
    })
    await supplier.save()
  } catch (err) {
    console.log(err)
  }

  if (!supplier) {
    return res
      .status(500)
      .json({ message: 'Unable to Add Supplier to the system.' })
  }

  return res.status(201).json({ supplier })
}

const getBySupplierById = async (req, res, next) => {
  const id = req.params.id
  let supplier

  try {
    supplier = await Supplier.findById(id)
  } catch (err) {
    console.log(err)
  }

  if (!supplier) {
    return res.status(500).json({ message: 'No Book found' })
  }

  return res.status(201).json({ supplier })
}

const updateSupplier = async (req, res, next) => {
  const id = req.params.id
  const {
    supplierID,
    supplierName,
    contactNumber,
    address,
    vehicleNumber
  } = req.body

  let supplierc

  try {
    supplierc = await Supplier.findByIdAndUpdate(id, {
      supplierID,
      supplierName,
      contactNumber,
      address,
      vehicleNumber
    })
    supplierc = await supplierc.save()
  } catch (err) {
    console.log(err)
  }

  if (!supplierc) {
    return res
      .status(400)
      .json({ message: 'Unable to Update Supplier Details.' })
  }

  return res.status(200).json({ supplierc })
}

const deleteSupplier = async (req, res, next) => {
  const id = req.params.id
  let supplier

  try {
    supplier = await Supplier.findByIdAndRemove(id)
  } catch (err) {
    console.log(err)
  }
  if (!supplier) {
    return res
      .status(404)
      .json({ message: 'Unable to remove  Supplier Details.' })
  }

  return res.status(200).json({ message: 'Supplier Successfully Deleted ' })
}

exports.getAllSuppliers = getAllSuppliers
exports.addSupplier = addSupplier
exports.getBySupplierById = getBySupplierById
exports.updateSupplier = updateSupplier
exports.deleteSupplier = deleteSupplier
