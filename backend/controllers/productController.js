const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()

    res.status(200).json({ products: allProducts })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ productDetails: product })
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
    })
  }
}

module.exports = { getAllProducts, getProductById }
