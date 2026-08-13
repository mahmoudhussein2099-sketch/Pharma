import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Contact Us - Awon Pharmacy</title>
        <meta name="description" content="Get in touch with Awon Pharmacy for any questions or support" />
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
                <Link href="/contact" className="text-teal-600 font-medium">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600">We're here to help with all your healthcare needs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">123 Health Street, Medical District<br />Riyadh, Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">✉️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@awonpharmacy.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">🕒</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Hours</h3>
                      <p className="text-gray-600">24/7 Customer Support<br />Store: 8AM - 10PM Daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}