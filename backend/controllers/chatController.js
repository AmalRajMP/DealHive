const { getGeminiResponse } = require("../services/geminiService")
const { extractFilters } = require("../utils/extractFilters")

const Product = require("../models/Product")

const sendResponse = async (req, res) => {
  try {
    const userQuery = req.body.query

    const filters = extractFilters(userQuery)
    const { categories, minPrice, maxPrice } = filters

    const query = {}

    if (categories.length != 0) {
      const categoryIds = categories.map((eachCategory) => eachCategory.id)
      query.category = { $in: categoryIds }
    }

    if (minPrice && maxPrice) {
      query.discountPrice = { $gte: minPrice, $lte: maxPrice }
    } else if (minPrice != null) {
      query.discountPrice = { $gte: minPrice }
    } else if (maxPrice != null) {
      query.discountPrice = { $lte: maxPrice }
    }

    const products = await Product.find(query)
    console.log(products)

    const modelResponse = await getGeminiResponse(userQuery)

    return res.status(200).json({
      text: modelResponse,
      sender: "bot",
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      text: "Sorry, I'm having trouble responding right now.",
      sender: "bot",
    })
  }
}

module.exports = { sendResponse }
