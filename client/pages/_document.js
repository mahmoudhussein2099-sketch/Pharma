import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // Default to LTR, client-side code will update this based on language selection
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="description" content="Awon Pharmacy — صيدلية عون. Shop medicines, vitamins, and wellness products online in Saudi Arabia." />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Awon" />
        <link rel="icon" href="/favicon.ico" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}