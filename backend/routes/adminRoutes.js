const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authenticateUser')
const adminOnly = require('../middleware/adminOnly')

const { addProduct } = require('../controllers/adminController')

router.get('/test', authenticateUser, adminOnly, (req, res) => {
  res.json({ message: 'Admin access granted' })
})

router.post('/product', authenticateUser, adminOnly, addProduct)

module.exports = router
