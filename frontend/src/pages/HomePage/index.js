import FilterItem from '../../components/FilterItem'
import ProductItem from '../../components/ProductItem'

import Website_Logo from '../../assets/Website_Logo.png'
import home_page_hero_image from '../../assets/home_page_hero_image.png'

import { filterCategories } from '../../constants/filterCategories'

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
  HeroImage,
  RecommendationsSection,
  RecommendationTitle,
  RecommendationExplanation,
  ProductsList,
} from './styledComponents'

const productsList = productsData

const HomePage = () => {
  const recommendedProducts = productsList.slice(0, 6).map((eachItem) => ({
    ...eachItem,
    isAiPick: true,
  }))

  return (
    <MainContainer>
      <Navbar>
        <NavWrapper>
          <WebsiteLogo src={Website_Logo} alt="website-logo" />
        </NavWrapper>
      </Navbar>
      <HeroImage src={home_page_hero_image} alt="hero image" />
      <SearchbarWrapper>
        <SearchIcon>
          <BsSearch />
        </SearchIcon>
        <SearchInput type="search" placeholder="Search" />
      </SearchbarWrapper>
      <FiltersWrapper>
        {filterCategories.map((eachItem) => (
          <FilterItem key={eachItem.id} filterItemDetails={eachItem} />
        ))}
      </FiltersWrapper>
      <RecommendationsSection>
        <RecommendationTitle>Recommended for you</RecommendationTitle>
        <RecommendationExplanation>
          Curated using AI to match your interests
        </RecommendationExplanation>
        <ProductsList>
          {recommendedProducts.map((eachItem) => (
            <ProductItem key={eachItem.id} productDetails={eachItem} />
          ))}
        </ProductsList>
      </RecommendationsSection>
    </MainContainer>
  )
}

export default HomePage
