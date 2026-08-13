import '../index.css';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { SecurityProvider } from '../context/SecurityContext';
import { ProductProvider } from '../context/ProductDataContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SecurityProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col bg-background text-foreground">
                  <Header />
                  <main className="flex-grow">
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </div>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </SecurityProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
