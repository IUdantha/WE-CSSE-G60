const Category = require('../models/vehicle.category.models')
const Vehicle = require('../models/vehicle.models')

// function to get all categories
async function getCategories (req, res) {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to store categories
async function storeCategory (req, res) {
  const { vehicleCategoryName } = req.body

  // validate the request
  if (!vehicleCategoryName || vehicleCategoryName === '') {
    return res.status(400).send({
      message: 'Category name can not be empty'
    })
  }
  const category = new Category({
    vehicleCategoryName
  })
  try {
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// function to get a single category
async function getCategory (req, res) {
  try {
    const category = await Category.findById(req.params.id)
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to update a category
async function updateCategory (req, res) {
  try {
    const category = await Category.findById(req.params.id)
    if (category) {
      // validate the request
      const { vehicleCategoryName } = req.body
      if (!vehicleCategoryName || vehicleCategoryName === '') {
        return res.status(400).send({
          message: 'Category name can not be empty'
        })
      }
      category.vehicleCategoryName = vehicleCategoryName
      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404).json({ message: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to delete a category
async function deleteCategory (req, res) {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      // check if vehicles use this category before deleting
      const vehicles = await Vehicle.find({ vehicleCategory: category._id })
      if (vehicles.length > 0) {
        return res.status(400).json({ message: 'Cannot delete category while vehicles are using it' })
      }

      await category.remove()
      res.json({ message: 'Category removed' })
    } else {
      res.status(404).json({ message: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to search categories
async function searchCategories (req, res) {
  try {
    const { name } = req.params

    if (!name || name === '') {
      return res.status(400).send({
        message: 'Search term can not be empty'
      })
    }

    const categories = await Category.find({
      vehicleCategoryName: { $regex: name, $options: 'i' }
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCategories,
  storeCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  searchCategories
}
