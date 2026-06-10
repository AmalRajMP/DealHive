const { filterCategories } = require("../constants/filterCategories")

const extractFilters = (userQuery) => {
  const lower = userQuery.toLowerCase()
  const matchingCategories = filterCategories.filter(
    (eachCategory) =>
      lower.includes(eachCategory.name.toLowerCase()) ||
      eachCategory.aliases?.some((alias) => lower.includes(alias)),
  )

  return matchingCategories
}

module.exports = { extractFilters }
