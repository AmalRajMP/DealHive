const { filterCategories } = require("../constants/filterCategories")

const extractFilters = (userQuery) => {
  const lower = userQuery.toLowerCase()

  let minPrice = null
  let maxPrice = null

  const maxPriceIndicators = [
    "under",
    "below",
    "less than",
    "upto",
    "up to",
    "within",
  ]

  const minPriceIndicators = [
    "above",
    "over",
    "greater than",
    "more than",
    "starting from",
  ]

  const rangeKeywords = ["between"]

  const matchingCategories = filterCategories.filter(
    (eachCategory) =>
      lower.includes(eachCategory.name.toLowerCase()) ||
      eachCategory.aliases?.some((alias) => lower.includes(alias)),
  )

  return {
    categories: matchingCategories,
    maxPrice: null,
  }
}

module.exports = { extractFilters }
