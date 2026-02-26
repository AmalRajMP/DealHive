const Product = require('../models/Product')
const User = require('../models/User')

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    Object.assign(product, req.body)

    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getAllUsers,
}
