import { useState, useRef, useEffect } from "react"

import FilterItem from "../../components/FilterItem"
import CategorySection from "../../components/CategorySection"
import Header from "../../components/Navbar"

import ai_banner_icon from "../../assets/shopping.svg"

import { ThreeDots } from "react-loader-spinner"
import { MdErrorOutline } from "react-icons/md"

import apiStatusConstants from "../../constants/apiStatusConstants"

import { filterCategories } from "../../constants/filterCategories"
import {
  ELECTRONICS_CATEGORIES,
  FASHION_CATEGORIES,
  GROCERIES_CATEGORIES,
} from "../../constants/categories"

import { BsSearch } from "react-icons/bs"

import BASE_URL from "../../config/api"

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
  RecommendationLoaderBox,
  LoaderTitle,
  LoaderSub,
} from "./styledComponents"

const HomePage = () => {
  const dealsRef = useRef(null)

  const [searchInput, setSearchInput] = useState("")
  const [activeFilterId, setActiveFilterId] = useState("all")
  const [productsList, setProductsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const [recommendData, setRecommendData] = useState(null)
  const [recommendStatus, setRecommendStatus] = useState(
    apiStatusConstants.initial,
  )

  const getProductsList = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress)

      const response = await fetch(`${BASE_URL}/api/products`)
      const data = await response.json()

      if (response.ok) {
        setProductsList(data.products)
        setApiStatus(apiStatusConstants.success)
      } else setApiStatus(apiStatusConstants.failure)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const getRecommendations = async () => {
    try {
      setRecommendStatus(apiStatusConstants.inProgress)

      const userId = localStorage.getItem("userId")
      if (!userId) {
        setRecommendStatus(apiStatusConstants.success)
        return
      }

      const response = await fetch(`http://localhost:5001/recommend/${userId}`)
      const data = await response.json()

      if (response.ok) {
        setRecommendData(data)
        setRecommendStatus(apiStatusConstants.success)
      } else setRecommendStatus(apiStatusConstants.failure)
    } catch {
      setRecommendStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProductsList()
    getRecommendations()
  }, [])

  const onExploreDeals = () =>
    dealsRef.current?.scrollIntoView({ behavior: "smooth" })

  const onSearchProduct = (e) => setSearchInput(e.target.value)
  const onChangeActiveFilter = (id) => setActiveFilterId(id)

  const getProductsByCategories = (products, categories) =>
    products.filter((p) => categories.includes(p.category))

  const isSearching = searchInput.trim() !== ""
  const isFiltering = activeFilterId !== "all"
  const showFilteredResults = isSearching || isFiltering

  let filteredProducts = productsList

  if (isFiltering)
    filteredProducts = filteredProducts.filter(
      (p) => p.category === activeFilterId,
    )

  if (isSearching)
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

  const formatTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1)

  let resultsTitle = ""
  if (isSearching && isFiltering)
    resultsTitle = `Results for "${searchInput}" in ${formatTitle(
      activeFilterId,
    )}`
  else if (isSearching) resultsTitle = `Search results for "${searchInput}"`
  else if (isFiltering) resultsTitle = `Deals on ${formatTitle(activeFilterId)}`

  const nearbyProducts = recommendData?.recommendations?.nearby || []
  const trendingProducts = recommendData?.recommendations?.trending || []
  const recentProducts = recommendData?.recommendations?.recent || []

  const hybridRaw =
    recommendData?.recommendations?.hybrid ||
    recommendData?.recommendations?.contentBased ||
    recommendData?.recommendations?.collaborative ||
    []

  const hybridProducts = hybridRaw.map((p) => ({
    ...p,
    thumbnail: p.thumbnail || p.image,
    discountPrice: p.discountPrice || p.price,
    originalPrice: p.originalPrice || p.price,
  }))

  const isNewUser = hybridProducts.length === 0

  const beautyProducts = productsList.filter(
    (p) => p.category.toLowerCase() === "beauty",
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

  let aiSubtitle = "Recommended for you"
  if (recommendData?.explanation) {
    const exp = recommendData.explanation
    const strongest = Object.keys(exp).reduce((a, b) =>
      exp[a] > exp[b] ? a : b,
    )

    const map = {
      interaction: "Based on your activity",
      similarity: "Users like you loved these",
      location: "Popular near your area",
    }

    aiSubtitle = map[strongest] || aiSubtitle
  }

  const renderLoadingView = () => (
    <LoaderContainer>
      <ThreeDots height="50" width="50" color="#2563eb" />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <FailureContainer>
      <MdErrorOutline size={50} />
      <FailureText>Failed to load products.</FailureText>
      <RetryButton onClick={getProductsList}>Retry</RetryButton>
    </FailureContainer>
  )

  const renderRecommendationLoader = () => (
    <RecommendationLoaderBox>
      <ThreeDots height="40" width="40" color="#2563eb" />
      <LoaderTitle>Finding deals you'll love...</LoaderTitle>
      <LoaderSub>AI is analyzing your interests</LoaderSub>
    </RecommendationLoaderBox>
  )

  const renderSuccessView = () => {
    if (showFilteredResults)
      return (
        <CategorySection
          isLoading={apiStatus === apiStatusConstants.inProgress}
          title={resultsTitle}
          products={filteredProducts}
        />
      )

    return (
      <>
        {recommendStatus === apiStatusConstants.inProgress &&
          renderRecommendationLoader()}

        {recommendStatus === apiStatusConstants.success && (
          <>
            {nearbyProducts.length > 0 && (
              <CategorySection
                isLoading={apiStatus === apiStatusConstants.inProgress}
                title="Service Near You"
                subtitle="Products with nearby support centers"
                products={nearbyProducts}
              />
            )}

            {!isNewUser && hybridProducts.length > 0 && (
              <CategorySection
                isLoading={apiStatus === apiStatusConstants.inProgress}
                title="Recommended for you"
                subtitle={aiSubtitle}
                products={hybridProducts}
              />
            )}

            {recentProducts.length > 0 && (
              <CategorySection
                isLoading={apiStatus === apiStatusConstants.inProgress}
                title="Recently Viewed"
                products={recentProducts}
              />
            )}

            {(isNewUser || trendingProducts.length > 0) && (
              <CategorySection
                isLoading={apiStatus === apiStatusConstants.inProgress}
                title="Trending Now"
                products={trendingProducts}
              />
            )}
          </>
        )}

        <div ref={dealsRef}>
          <CategorySection
            isLoading={apiStatus === apiStatusConstants.inProgress}
            title="Beauty Picks"
            products={beautyProducts}
          />
        </div>

        <CategorySection
          isLoading={apiStatus === apiStatusConstants.inProgress}
          title="Electronics"
          products={electronicsProducts}
        />
        <CategorySection
          isLoading={apiStatus === apiStatusConstants.inProgress}
          title="Fashion"
          products={fashionProducts}
        />
        <CategorySection
          isLoading={apiStatus === apiStatusConstants.inProgress}
          title="Groceries"
          products={groceriesProducts}
        />
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
          {filterCategories.map((item) => (
            <FilterItem
              key={item.id}
              filterItemDetails={item}
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
