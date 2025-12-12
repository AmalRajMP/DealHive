import FilterItem from '../../components/FilterItem'

import Website_Logo from '../../assets/Website_Logo.png'

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
  </MainContainer>
)

export default HomePage
