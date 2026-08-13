import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple login simulation
    setTimeout(() => {
      if (formData.email && formData.password) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify({
            email: formData.email,
            name: 'User',
            role: 'user'
          }))
        }
        alert('Login successful!')
        router.push('/')
      } else {
        setError('Please enter valid credentials')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Login - Awon Pharmacy</title>
        <meta name="description" content="Login to your Awon Pharmacy account" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Link href="/" className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-teal-600">Awon</span>
                <span className="text-3xl font-light text-gray-900">Pharmacy</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Admin access?{' '}
                <Link href="/admin/login" className="text-teal-600 hover:text-teal-700 font-medium">
                  Admin Login
                </Link>
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="text-teal-600 hover:text-teal-700 text-sm">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}