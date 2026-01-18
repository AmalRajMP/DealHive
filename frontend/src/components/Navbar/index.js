import { FiShoppingCart, FiUser } from 'react-icons/fi'

import Website_Logo from '../../assets/Website_Logo.png'

import {
  Navbar,
  NavWrapper,
  NavIcons,
  NavIconButton,
  WebsiteLogo,
} from './styledComponents'

const Header = () => (
  <Navbar>
    <NavWrapper>
      <WebsiteLogo src={Website_Logo} alt="website-logo" />

      <NavIcons>
        <NavIconButton>
          <FiShoppingCart />
        </NavIconButton>

        <NavIconButton>
          <FiUser />
        </NavIconButton>
      </NavIcons>
    </NavWrapper>
  </Navbar>
)

export default Header
