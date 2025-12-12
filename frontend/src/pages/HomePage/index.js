import Website_Logo from '../../assets/Website_Logo.png'

import { BsSearch } from 'react-icons/bs'

import {
  MainContainer,
  Navbar,
  NavWrapper,
  WebsiteLogo,
  SearchbarWrapper,
  SearchIcon,
  SearchInput,
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
  </MainContainer>
)

export default HomePage
