import '../src/styles/globals.css'
import { ThemeProvider } from '../src/context/ThemeContext'
import { LanguageProvider } from '../src/context/LanguageContext'
import { AuthProvider } from '../src/context/AuthContext'
import { CartProvider } from '../src/context/CartContext'
import { SecurityProvider } from '../src/context/SecurityContext'
import { ProductProvider } from '../src/context/ProductContext'

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SecurityProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </SecurityProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}