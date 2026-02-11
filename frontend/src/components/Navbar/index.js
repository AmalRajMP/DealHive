import { useNavigate } from 'react-router-dom'

import { FiShoppingCart, FiLogOut } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
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
  LogoutButton,
} from './styledComponents'

const Header = () => {
  const navigate = useNavigate()
  const firstName = localStorage.getItem('dealhive_username')

  const onClickLogo = () => navigate('/home')
  const onClickCart = () => navigate('/cart')
  const onClickWishlist = () => navigate('/wishlist')

  const onClickLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('dealhive_username')
    navigate('/login', { replace: true })
  }

  return (
    <Navbar>
      <NavWrapper>
        <WebsiteLogo
          src={Website_Logo}
          alt="website-logo"
          onClick={onClickLogo}
        />

        <Greeting>
          <GreetingIcon>
            <BsStars />
          </GreetingIcon>
          <GreetingText>Hi, {firstName ? firstName : 'Guest'}</GreetingText>
        </Greeting>

        <NavIcons>
          <NavIconButton onClick={onClickWishlist}>
            <AiOutlineHeart />
          </NavIconButton>

          <NavIconButton onClick={onClickCart}>
            <FiShoppingCart />
          </NavIconButton>

          <LogoutButton onClick={onClickLogout}>
            <span className="logout-text">Logout</span>
            <FiLogOut className="logout-icon" />
          </LogoutButton>
        </NavIcons>
      </NavWrapper>
    </Navbar>
  )
}

export default Header
