const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authenticateUser')
const adminOnly = require('../middleware/adminOnly')

const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require('../controllers/adminController')

router.get('/test', authenticateUser, adminOnly, (req, res) => {
  res.json({ message: 'Admin access granted' })
})

router.post('/products', authenticateUser, adminOnly, addProduct)

router.get('/products', authenticateUser, adminOnly, getAllProducts)

router.get('/products/:id', authenticateUser, adminOnly, getProductById)

router.put('/products/:id', authenticateUser, adminOnly, updateProduct)

router.delete('/products/:id', authenticateUser, adminOnly, deleteProduct)

module.exports = router
