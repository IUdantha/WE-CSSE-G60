const FertilizerStock = require('../models/fertilizerstock.models')

const addFertilizerStock = async (req, res, next) => {
  const { supID, itemType, quantity, price } = req.body
  let fertilizer

  try {
    fertilizer = new FertilizerStock({
      supID,
      itemType,
      quantity,
      price

    })
    await fertilizer.save()
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ fertilizer })
}

const getfertilizerStock = async (request, response) => {
  try {
    const fertilizer = await FertilizerStock.find({})
    response.status(200).json(fertilizer)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

const getfertilizerStockId = async (req, res, next) => {
  const id = req.params.id
  let fertilizer

  try {
    fertilizer = await FertilizerStock.findById(id)
  } catch (err) {
    console.log(err)
  }

  return res.status(201).json({ fertilizer })
}

const editfertilizerstock = async (req, res, next) => {
  const id = req.params.id
  const {
    quantity
  } = req.body

  let fertilizer

  try {
    fertilizer = await FertilizerStock.findByIdAndUpdate(id, {
      quantity
    })
    fertilizer = await fertilizer.save()
  } catch (err) {
    console.log(err)
  }

  if (!fertilizer) {
    return res
      .status(400)
      .json({ message: 'Unable to Update stock Details.' })
  }

  return res.status(200).json({ fertilizer })
}

const deletefertilizerstock = async (request, response) => {
  try {
    await FertilizerStock.deleteOne({ _id: request.params.id })
    response.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}

exports.deletefertilizerstock = deletefertilizerstock
exports.getfertilizerStockId = getfertilizerStockId
exports.editfertilizerstock = editfertilizerstock
exports.getfertilizerStock = getfertilizerStock
exports.addfertilizerStock = addFertilizerStock
