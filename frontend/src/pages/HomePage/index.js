import { useState } from 'react'

import FilterItem from '../../components/FilterItem'
import CategorySection from '../../components/CategorySection'

import Website_Logo from '../../assets/Website_Logo.png'
import ai_banner_icon from '../../assets/shopping.svg'

import { filterCategories } from '../../constants/filterCategories'
import {
  ELECTRONICS_CATEGORIES,
  FASHION_CATEGORIES,
  GROCERIES_CATEGORIES,
} from '../../constants/categories'

import { BsSearch } from 'react-icons/bs'

import productsData from '../../data/products.json'

import {
  MainContainer,
  Navbar,
  NavWrapper,
  WebsiteLogo,
  SearchbarWrapper,
  SearchIcon,
  SearchInput,
  FiltersWrapper,
  Banner,
  BannerTitle,
  BannerSubtitle,
  BannerLeft,
  BannerRight,
  BannerIcon,
  BannerButton,
} from './styledComponents'

const allProducts = productsData

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [activeFilterId, setActiveFilterId] = useState('all')

  const onSearchProduct = (event) => {
    setSearchInput(event.target.value)
  }

  const onChangeActiveFilter = (filterId) => {
    setActiveFilterId(filterId)
  }

  const getProductsByCategories = (products, categories) =>
    products.filter((product) => categories.includes(product.category))

  const beautyProducts = allProducts.filter(
    (product) => product.category === 'beauty'
  )

  const electronicsProducts = getProductsByCategories(
    allProducts,
    ELECTRONICS_CATEGORIES
  )

  const fashionProducts = getProductsByCategories(
    allProducts,
    FASHION_CATEGORIES
  )

  const groceriesProducts = getProductsByCategories(
    allProducts,
    GROCERIES_CATEGORIES
  )

  const recommendedProducts = allProducts.slice(0, 6).map((eachItem) => ({
    ...eachItem,
    isAiPick: true,
  }))

  const isSearching = searchInput.trim() !== ''
  const isFiltering = activeFilterId !== 'all'
  const showFilteredResults = isSearching || isFiltering

  let filteredProducts = allProducts

  if (isFiltering) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === activeFilterId
    )
  }

  if (isSearching) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchInput.trim().toLowerCase())
    )
  }

  const formatTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1)

  let resultsTitle = ''

  if (isSearching && isFiltering) {
    resultsTitle = `Results for "${searchInput}" in ${formatTitle(
      activeFilterId
    )}`
  } else if (isSearching) {
    resultsTitle = `Search results for "${searchInput}"`
  } else if (isFiltering) {
    resultsTitle = `Deals on ${formatTitle(activeFilterId)}`
  }

  return (
    <MainContainer>
      <Navbar>
        <NavWrapper>
          <WebsiteLogo src={Website_Logo} alt="website-logo" />
        </NavWrapper>
      </Navbar>

      {!showFilteredResults && (
        <Banner>
          <BannerLeft>
            <BannerTitle>Find Deals Tailored Just For You</BannerTitle>
            <BannerSubtitle>Powered by AI recommendations</BannerSubtitle>
            <BannerButton>Explore Deals</BannerButton>
          </BannerLeft>

          <BannerRight>
            <BannerIcon src={ai_banner_icon} alt="ai illustration" />
          </BannerRight>
        </Banner>
      )}

      <SearchbarWrapper>
        <SearchIcon>
          <BsSearch />
        </SearchIcon>
        <SearchInput
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={onSearchProduct}
        />
      </SearchbarWrapper>

      <FiltersWrapper>
        {filterCategories.map((eachItem) => (
          <FilterItem
            key={eachItem.id}
            filterItemDetails={eachItem}
            onChangeActiveFilter={onChangeActiveFilter}
          />
        ))}
      </FiltersWrapper>

      {showFilteredResults ? (
        <CategorySection
          title={resultsTitle}
          products={filteredProducts}
          layout="grid"
        />
      ) : (
        <>
          <CategorySection title="Beauty Picks" products={beautyProducts} />
          <CategorySection title="Electronics" products={electronicsProducts} />
          <CategorySection title="Fashion" products={fashionProducts} />
          <CategorySection title="Groceries" products={groceriesProducts} />
          <CategorySection
            title="Recommended for you"
            subtitle="Curated using AI to match your interests"
            products={recommendedProducts}
          />
        </>
      )}
    </MainContainer>
  )
}

export default HomePage
