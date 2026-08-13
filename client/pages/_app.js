import '../src/App.css'
import '../src/index.css'
import '../src/styles/AdminStyles.css'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { initPwa } from '../src/lib/pwa'

// Bump this when the app shell changes so stale caches/service workers
// from older builds (including the pre-upgrade CRA app) are evicted.
const SW_VERSION = 'awon-v4';

// Register the service worker once on the client for PWA/offline support.
async function evictStaleServiceWorker() {
  try {
    if (localStorage.getItem('awon_sw_version') === SW_VERSION) return;
    const evicts = [];
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) evicts.push(reg.unregister());
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        if (!key.startsWith(SW_VERSION)) evicts.push(caches.delete(key));
      }
    }
    await Promise.all(evicts);
    localStorage.setItem('awon_sw_version', SW_VERSION);
  } catch {
    /* ignore */
  }
}

function useServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    // Capture beforeinstallprompt immediately — it can fire before window 'load'.
    initPwa();

    let cancelled = false;
    let reloaded = false;
    // Reload once when a (new) service worker takes control so users land on
    // the current build instead of a stale cached app shell.
    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    const run = async () => {
      await evictStaleServiceWorker();
      if (cancelled || process.env.NODE_ENV !== 'production') return;
      const onLoad = () => {
        if (cancelled) return;
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .catch(() => {});
      };
      window.addEventListener('load', onLoad);
      if (document.readyState === 'complete') onLoad();
    };
    run();

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);
}

// Import providers
const RouterWrapper = dynamic(() => import('../src/components/RouterWrapper'), { ssr: false })
const NextApp = dynamic(() => import('../src/NextApp'), { ssr: false })
const LanguageProvider = dynamic(() => import('../src/context/LanguageContext').then(mod => mod.LanguageProvider), { ssr: false })
const ThemeProvider = dynamic(() => import('../src/context/ThemeContext').then(mod => mod.ThemeProvider), { ssr: false })
const SecurityProvider = dynamic(() => import('../src/context/SecurityContext').then(mod => mod.SecurityProvider), { ssr: false })
const AuthProvider = dynamic(() => import('../src/context/AuthContext').then(mod => mod.AuthProvider), { ssr: false })
const ProductProvider = dynamic(() => import('../src/context/ProductContext').then(mod => mod.ProductProvider), { ssr: false })
const ProductDataProvider = dynamic(() => import('../src/context/ProductDataContext').then(mod => mod.ProductDataProvider), { ssr: false })
const CartProvider = dynamic(() => import('../src/context/CartContext').then(mod => mod.CartProvider), { ssr: false })
const WishlistProvider = dynamic(() => import('../src/context/WishlistContext').then(mod => mod.WishlistProvider), { ssr: false })
const ToastProvider = dynamic(() => import('../src/components/ui/toast').then(mod => mod.ToastProvider), { ssr: false })

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function App({ Component, pageProps }) {
  // If we're on the index page, use the NextApp component
  const isIndexPage = Component.name === 'Home'
  useServiceWorker()
  
  return (
    <>
      <Script id="i18n-init" strategy="beforeInteractive">
        {`
          if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('language') || 'en';
            document.documentElement.lang = savedLang;
            document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
          }
        `}
      </Script>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      <LanguageProvider>
        <ThemeProvider>
          <SecurityProvider>
            <AuthProvider>
              <ProductProvider>
                <ProductDataProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <ToastProvider>
                        <RouterWrapper>
                          {isIndexPage ? <NextApp /> : <Component {...pageProps} />}
                        </RouterWrapper>
                      </ToastProvider>
                    </WishlistProvider>
                  </CartProvider>
                </ProductDataProvider>
              </ProductProvider>
            </AuthProvider>
          </SecurityProvider>
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}
