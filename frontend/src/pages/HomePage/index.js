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

  const [recommendData, setRecommendData] = useState(null)
  const [recommendStatus, setRecommendStatus] = useState(
    apiStatusConstants.initial,
  )

  const getProductsList = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const url = 'http://localhost:5000/api/products'

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        const products = data.products
        console.log('new products')
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

  const getRecommendations = async () => {
    try {
      setRecommendStatus(apiStatusConstants.inProgress)

      const userId = localStorage.getItem('userId')

      if (!userId) return

      const response = await fetch(`http://localhost:5001/recommend/${userId}`)
      console.log('STATUS:', response.status)
      const data = await response.json()

      if (response.ok) {
        console.log(data)
        setRecommendData(data)
        setRecommendStatus(apiStatusConstants.success)
      } else {
        setRecommendStatus(apiStatusConstants.failure)
      }
    } catch (err) {
      console.log('FETCH ERROR:', err)
      setRecommendStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductsList()
    getRecommendations()
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
      (product) => product.category === activeFilterId,
    )
  }

  if (isSearching) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchInput.trim().toLowerCase()),
    )
  }

  const formatTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1)

  let resultsTitle = ''

  if (isSearching && isFiltering) {
    resultsTitle = `Results for "${searchInput}" in ${formatTitle(
      activeFilterId,
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
    console.log('RECOMMEND DATA:', recommendData)
    const beautyProducts = productsList.filter(
      (product) => product.category.toLowerCase() === 'beauty',
    )

    const electronicsProducts = getProductsByCategories(
      productsList,
      ELECTRONICS_CATEGORIES,
    )

    const fashionProducts = getProductsByCategories(
      productsList,
      FASHION_CATEGORIES,
    )

    const groceriesProducts = getProductsByCategories(
      productsList,
      GROCERIES_CATEGORIES,
    )

    {
      recommendData?.recommendations?.recent?.length > 0 && (
        <CategorySection
          title="Recently Viewed"
          products={recommendData.recommendations.recent}
        />
      )
    }
    {
      recommendData?.recommendations?.trending?.length > 0 && (
        <CategorySection
          title="Trending Now"
          products={recommendData.recommendations.trending}
        />
      )
    }

    const hybridProductsRaw =
      recommendData?.recommendations?.hybrid ||
      recommendData?.recommendations?.contentBased ||
      recommendData?.recommendations?.collaborative ||
      []

    const hybridProducts = hybridProductsRaw.map((product) => ({
      ...product,
      thumbnail: product.thumbnail || product.image,
      discountPrice: product.discountPrice || product.price,
      originalPrice: product.originalPrice || product.price,
    }))

    let aiSubtitle = 'Recommended for you'

    if (recommendData?.explanation) {
      const exp = recommendData.explanation

      const strongestSignal = Object.keys(exp).reduce((a, b) =>
        exp[a] > exp[b] ? a : b,
      )

      const explanationMap = {
        interaction: 'Based on your activity',
        similarity: 'Users with similar taste liked these',
        location: 'Trending near your location',
      }

      aiSubtitle = explanationMap[strongestSignal] || 'Personalized for you'
    }
    return (
      <>
        {showFilteredResults ? (
          <CategorySection title={resultsTitle} products={filteredProducts} />
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
            {recommendData?.recommendations?.recent?.length > 0 && (
              <CategorySection
                title="Recently Viewed"
                products={recommendData.recommendations.recent}
              />
            )}

            {recommendData?.recommendations?.trending?.length > 0 && (
              <CategorySection
                title="Trending Now"
                products={recommendData.recommendations.trending}
              />
            )}
            {hybridProducts.length > 0 && (
              <CategorySection
                title="Recommended for you"
                subtitle={aiSubtitle}
                products={hybridProducts}
              />
            )}
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
