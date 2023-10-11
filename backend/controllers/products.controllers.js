const Product = require('../models/product.models')

// function to get all products
async function getProducts (req, res) {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to store products
async function storeProduct (req, res) {
  const {
    productName,
    productCode,
    type,
    flavour,
    qualityControlInformation,
    certifications,
    inventoryStatus,
    image,
    packageType,
    weight,
    barcode,
    serialNumber
  } = req.body

  // validate the request
  if (
    !productName || productName === '' ||
    !productCode || productCode === '' ||
    !type || type === '' ||
    !flavour || flavour === '' ||
    !qualityControlInformation || qualityControlInformation === '' ||
    !certifications || certifications === '' ||
    !inventoryStatus || inventoryStatus === '' ||
    !image || image === '' ||
    !packageType || packageType === '' ||
    !weight || weight === '' ||
    !barcode || barcode === '' ||
    !serialNumber || serialNumber === ''
  ) {
    return res.status(400).send({
      message: 'All fields are required'
    })
  }

  const product = new Product({
    productName,
    productCode,
    type,
    flavour,
    qualityControlInformation,
    certifications,
    inventoryStatus,
    image,
    packageType,
    weight,
    barcode,
    serialNumber
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// function to get a single product
async function getProduct (req, res) {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to update a product
async function updateProduct (req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      // validate the request
      const {
        productName,
        productCode,
        type,
        flavour,
        qualityControlInformation,
        certifications,
        inventoryStatus,
        image,
        packageType,
        weight,
        barcode,
        serialNumber
      } = req.body

      // validate the request
      if (
        !productName || productName === '' ||
        !productCode || productCode === '' ||
        !type || type === '' ||
        !flavour || flavour === '' ||
        !qualityControlInformation || qualityControlInformation === '' ||
        !certifications || certifications === '' ||
        !inventoryStatus || inventoryStatus === '' ||
        !image || image === '' ||
        !packageType || packageType === '' ||
        !weight || weight === '' ||
        !barcode || barcode === '' ||
        !serialNumber || serialNumber === ''
      ) {
        return res.status(400).send({
          message: 'All fields are required'
        })
      }

      product.productName = productName
      product.productCode = productCode
      product.type = type
      product.flavour = flavour
      product.qualityControlInformation = qualityControlInformation
      product.certifications = certifications
      product.inventoryStatus = inventoryStatus
      product.image = image
      product.packageType = packageType
      product.weight = weight
      product.barcode = barcode
      product.serialNumber = serialNumber

      const updatedproduct = await product.save()
      res.json(updatedproduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// function to delete a product
async function deleteProduct (req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.remove()
      res.json({ message: 'product removed' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// search product by Product Name
async function searchProduct (req, res) {
  try {
    const { productName } = req.params
    const product = await Product.find({
      productName: { $regex: productName, $options: 'i' }
    })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getProducts,
  storeProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct
}
