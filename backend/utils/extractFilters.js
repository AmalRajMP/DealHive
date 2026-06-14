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

  const rangePriceIndicators = [
    {
      start: "between",
      end: "and",
    },
    {
      start: "from",
      end: "to",
    },
  ]

  const matchingCategories = filterCategories.filter(
    (eachCategory) =>
      lower.includes(eachCategory.name.toLowerCase()) ||
      eachCategory.aliases?.some((alias) => lower.includes(alias)),
  )

  const matchedMinIndicator = minPriceIndicators.find((price) =>
    lower.includes(price),
  )

  const matchedMaxIndicator = maxPriceIndicators.find((price) =>
    lower.includes(price),
  )

  let matchedRangeIndicator = null

  let startIndex = -1
  let endIndex = -1

  let rangeStartIndex = -1
  let rangeEndIndex = -1

  for (const pattern of rangePriceIndicators) {
    startIndex = lower.indexOf(pattern.start)
    endIndex = lower.indexOf(pattern.end)

    if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
      matchedRangeIndicator = pattern
      rangeStartIndex = startIndex
      rangeEndIndex = endIndex
      break
    }
  }

  let remainingText = null

  if (matchedRangeIndicator) {
    minPrice = lower
      .slice(
        rangeStartIndex + matchedRangeIndicator.start.length,
        rangeEndIndex,
      )
      .trim()

    maxPrice = lower
      .slice(rangeEndIndex + matchedRangeIndicator.end.length)
      .trim()
  } else if (matchedMinIndicator) {
    const index = lower.indexOf(matchedMinIndicator)
    minPrice = lower.slice(index + matchedMinIndicator.length).trim()
  } else if (matchedMaxIndicator) {
    const index = lower.indexOf(matchedMaxIndicator)
    maxPrice = lower.slice(index + matchedMaxIndicator.length).trim()
  }

  const normalizePrice = (price) => {
    let actualPrice
    if (price[0] == "₹") {
      price = price.replaceAll(",", "")
      actualPrice = parseInt(price.slice(1))
    } else if (price.includes("k")) {
      let index = price.indexOf("k")
      if (price.includes(".")) {
        actualPrice = parseFloat(price.slice(0, index)) * 1000
      } else {
        actualPrice = parseInt(price.slice(0, index)) * 1000
      }
    } else {
      actualPrice = parseInt(price)
    }
    return actualPrice
  }

  return {
    categories: matchingCategories,
    minPrice: minPrice ? normalizePrice(minPrice) : null,
    maxPrice: maxPrice ? normalizePrice(maxPrice) : null,
  }
}

console.log(extractFilters("laptops under 50k"))
console.log(extractFilters("laptops above 30k"))
console.log(extractFilters("laptops between 30k and 50k"))

module.exports = { extractFilters }
