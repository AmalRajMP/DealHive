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
      eachCategory.aliases?.some((alias) => {
        const regex = new RegExp(`\\b${alias}\\b`)
        return regex.test(lower)
      }),
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

  let normalizedMinPrice = null
  let normalizedMaxPrice = null

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

  const extractPrice = (text) => {
    const priceMatch = text.match(/₹?\d[\d,]*(\.\d+)?k?/i)

    return priceMatch ? normalizePrice(priceMatch[0]) : null
  }

  if (matchedRangeIndicator) {
    const minPriceText = lower
      .slice(
        rangeStartIndex + matchedRangeIndicator.start.length,
        rangeEndIndex,
      )
      .trim()

    const maxPriceText = lower
      .slice(rangeEndIndex + matchedRangeIndicator.end.length)
      .trim()

    normalizedMinPrice = extractPrice(minPriceText)
    normalizedMaxPrice = extractPrice(maxPriceText)
  } else if (matchedMinIndicator) {
    const index = lower.indexOf(matchedMinIndicator)
    const remainingText = lower.slice(index + matchedMinIndicator.length).trim()

    normalizedMinPrice = extractPrice(remainingText)
  } else if (matchedMaxIndicator) {
    const index = lower.indexOf(matchedMaxIndicator)
    const remainingText = lower.slice(index + matchedMaxIndicator.length).trim()

    normalizedMaxPrice = extractPrice(remainingText)
  }

  return {
    categories: matchingCategories ? matchingCategories : null,
    minPrice: normalizedMinPrice ? normalizedMinPrice : null,
    maxPrice: normalizedMaxPrice ? normalizedMaxPrice : null,
  }
}

module.exports = { extractFilters }
