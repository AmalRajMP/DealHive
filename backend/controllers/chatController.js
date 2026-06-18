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

    let prompt = userQuery

    if (products.length > 0) {
      prompt = `
        User Query:
        ${userQuery}

        Retrieved Products:
        ${JSON.stringify(products)}

        Instructions:
        - Answer the user's query using ONLY the retrieved products above.
        - Do NOT make up or recommend products that are not in the retrieved list.
        - If the user asks for recommendations, recommend the most suitable products and explain why.
        - If the user asks for a comparison, compare only the retrieved products.
        - If the user asks to list products, list the relevant matching products.
        - If the user asks for the best product, choose the best one based on the available information such as price, rating, features, and description.
        - Keep the response concise, friendly, and easy to read.
      `
    }

    const modelResponse = await getGeminiResponse(prompt)

    return res.status(200).json({
      text: modelResponse,
      products,
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
