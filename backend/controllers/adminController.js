const Product = require('../models/Product')

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' })
  }
}

module.exports = { addProduct }
