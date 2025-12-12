import FilterItem from '../../components/FilterItem'

import Website_Logo from '../../assets/Website_Logo.png'
import home_page_hero_image from '../../assets/home_page_hero_image.png'

import { filterCategories } from '../../constants/filterCategories'

import { BsSearch } from 'react-icons/bs'

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
} from './styledComponents'

const HomePage = () => (
  <MainContainer>
    <Navbar>
      <NavWrapper>
        <WebsiteLogo src={Website_Logo} alt="website-logo" />
        <SearchbarWrapper>
          <SearchIcon>
            <BsSearch />
          </SearchIcon>
          <SearchInput type="search" placeholder="Search" />
        </SearchbarWrapper>
      </NavWrapper>
    </Navbar>
    <FiltersWrapper>
      {filterCategories.map((eachItem) => (
        <FilterItem key={eachItem.id} filterItemDetails={eachItem} />
      ))}
    </FiltersWrapper>
    <HeroImage src={home_page_hero_image} alt="hero image" />
  </MainContainer>
)

export default HomePage
