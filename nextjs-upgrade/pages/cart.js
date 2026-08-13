import Head from 'next/head'
import Link from 'next/link'

export default function Cart() {
  return (
    <>
      <Head>
        <title>Shopping Cart - Awon Pharmacy</title>
        <meta name="description" content="Review your cart items and proceed to checkout" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-teal-600">Awon</span>
                <span className="text-2xl font-light text-gray-900">Pharmacy</span>
              </Link>
              <nav className="flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-teal-600">Home</Link>
                <Link href="/products" className="text-gray-700 hover:text-teal-600">Products</Link>
                <Link href="/cart" className="text-teal-600 font-medium">Cart</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to get started</p>
              <Link 
                href="/products"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}