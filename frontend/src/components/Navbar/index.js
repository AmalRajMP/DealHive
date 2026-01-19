import { FiShoppingCart, FiUser } from 'react-icons/fi'
import { BsStars } from 'react-icons/bs'

import Website_Logo from '../../assets/Website_Logo.png'

import {
  Navbar,
  NavWrapper,
  NavIcons,
  NavIconButton,
  WebsiteLogo,
  Greeting,
  GreetingText,
  GreetingIcon,
} from './styledComponents'

const firstName = localStorage.getItem('dealhive_username')

const Header = () => (
  <Navbar>
    <NavWrapper>
      <WebsiteLogo src={Website_Logo} alt="website-logo" />

      <Greeting>
        <GreetingIcon>
          <BsStars />
        </GreetingIcon>

        <GreetingText>Hi, {firstName ? firstName : 'Guest'}</GreetingText>
      </Greeting>

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
