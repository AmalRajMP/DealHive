import { useState, useRef, useEffect } from 'react'

import FilterItem from '../../components/FilterItem'
import CategorySection from '../../components/CategorySection'
import Header from '../../components/Navbar'

import ai_banner_icon from '../../assets/shopping.svg'

import { ThreeDots } from 'react-loader-spinner'
import { MdErrorOutline } from 'react-icons/md'

import apiStatusConstants from '../../constants/apiStatusConstants'

import { filterCategories } from '../../constants/filterCategories'
import {
  ELECTRONICS_CATEGORIES,
  FASHION_CATEGORIES,
  GROCERIES_CATEGORIES,
} from '../../constants/categories'

import { BsSearch } from 'react-icons/bs'

import {
  MainContainer,
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
  LoaderContainer,
  FailureContainer,
  FailureText,
  RetryButton,
} from './styledComponents'

const HomePage = () => {
  const dealsRef = useRef(null)

  const [searchInput, setSearchInput] = useState('')
  const [activeFilterId, setActiveFilterId] = useState('all')
  const [productsList, setProductsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getProductsList = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const url = 'http://localhost:5000/api/products'

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        const products = data.products
        console.log('new products')
        console.log(products)
        setProductsList(products)
        setApiStatus(apiStatusConstants.success)
        console.log(apiStatus)
      } else {
        setApiStatus(apiStatusConstants.failure)
        console.log(apiStatus)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductsList()
  }, [])

  const onExploreDeals = () => {
    dealsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onSearchProduct = (event) => {
    setSearchInput(event.target.value)
  }

  const onChangeActiveFilter = (filterId) => {
    setActiveFilterId(filterId)
  }

  const getProductsByCategories = (products, categories) =>
    products.filter((product) => categories.includes(product.category))

  const isSearching = searchInput.trim() !== ''
  const isFiltering = activeFilterId !== 'all'
  const showFilteredResults = isSearching || isFiltering

  let filteredProducts = productsList

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

  const renderLoadingView = () => (
    <LoaderContainer>
      <ThreeDots color="#1e40af" height="50" width="50" radius="9" />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <FailureContainer>
      <MdErrorOutline size={50} />
      <FailureText>Failed to load products. Please try again.</FailureText>
      <RetryButton onClick={() => getProductsList}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderSuccessView = () => {
    const beautyProducts = productsList.filter(
      (product) => product.category.toLowerCase() === 'beauty'
    )

    const electronicsProducts = getProductsByCategories(
      productsList,
      ELECTRONICS_CATEGORIES
    )

    const fashionProducts = getProductsByCategories(
      productsList,
      FASHION_CATEGORIES
    )

    const groceriesProducts = getProductsByCategories(
      productsList,
      GROCERIES_CATEGORIES
    )

    const recommendedProducts = productsList.slice(0, 10).map((eachItem) => ({
      ...eachItem,
      isAiPick: true,
    }))

    return (
      <>
        {showFilteredResults ? (
          <CategorySection
            title={resultsTitle}
            products={filteredProducts}
            layout="grid"
          />
        ) : (
          <>
            <div ref={dealsRef}>
              <CategorySection title="Beauty Picks" products={beautyProducts} />
            </div>
            <CategorySection
              title="Electronics"
              products={electronicsProducts}
            />
            <CategorySection title="Fashion" products={fashionProducts} />
            <CategorySection title="Groceries" products={groceriesProducts} />
            <CategorySection
              title="Recommended for you"
              subtitle="Curated using AI to match your interests"
              products={recommendedProducts}
            />
          </>
        )}
      </>
    )
  }

  const renderProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <MainContainer>
        {!showFilteredResults && (
          <Banner>
            <BannerLeft>
              <BannerTitle>Find Deals Tailored Just For You</BannerTitle>
              <BannerSubtitle>Powered by AI recommendations</BannerSubtitle>
              <BannerButton onClick={onExploreDeals}>
                Explore Deals
              </BannerButton>
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
        {renderProducts()}
      </MainContainer>
    </>
  )
}

export default HomePage
