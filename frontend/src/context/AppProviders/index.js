import { WishlistProvider } from '../WishlistContext'
import { CartProvider } from '../CartContext'

const AppProviders = ({ children }) => (
  <CartProvider>
    <WishlistProvider>{children}</WishlistProvider>
  </CartProvider>
)

export default AppProviders
