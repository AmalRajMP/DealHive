const axios = require('axios')
const Product = require('../models/Product')

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id

    const aiRes = await axios.get(`http://127.0.0.1:5001/recommend/${userId}`)

    const recommendedIds = aiRes.data

    const products = await Product.find({
      _id: { $in: recommendedIds },
    })

    res.json(products)
  } catch (err) {
    console.error('FULL ERROR:', err)
    res.status(500).json({ error: 'AI recommendation failed' })
  }
}

module.exports = { getRecommendations }
