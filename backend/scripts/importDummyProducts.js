require("dotenv").config()

const fs = require("fs")
const path = require("path")

const connectDB = require("../config/db")
const Product = require("../models/Product")

const categoryMap = {
  motorcycle: "motorcycle-gear",
  tops: "womens-tops",
  vehicle: "vehicle-accessories",
}

const getCategory = (category) => {
  return categoryMap[category] || category
}

const transformProduct = (product) => {
  const discountPrice = Number(
    (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
  )

  return {
    title: product.title,
    description: product.description,
    brand: product.brand || "Generic",
    category: getCategory(product.category),
    rating: product.rating,
    thumbnail: product.thumbnail,
    images: product.images,

    originalPrice: product.price,
    discountPrice,
    discountPercent: Math.round(product.discountPercentage),

    reviews: (product.reviews || []).map((review) => ({
      reviewerName: review.reviewerName,
      rating: review.rating,
      comment: review.comment,
    })),

    isServiceable: false,
    serviceCenters: [],
  }
}

const run = async () => {
  await connectDB()

  const filePath = path.join(__dirname, "dummy-products.json")

  const rawData = fs.readFileSync(filePath, "utf-8")
  const data = JSON.parse(rawData)

  let existingCount = 0

  for (const product of data.products) {
    const existingProduct = await Product.findOne({
      title: product.title,
    })

    if (existingProduct) {
      existingCount += 1
    }
  }
  const productsToInsert = []

  for (const product of data.products) {
    const existingProduct = await Product.findOne({
      title: product.title,
    })

    if (!existingProduct) {
      productsToInsert.push(product)
    }
  }

  const transformedProducts = productsToInsert.map((product) =>
    transformProduct(product),
  )

  console.log("Transformed products:", transformedProducts.length)

  const insertedProducts = await Product.insertMany(transformedProducts, {
    ordered: false,
  })

  console.log(`Inserted ${insertedProducts.length} products`)
}

run()
