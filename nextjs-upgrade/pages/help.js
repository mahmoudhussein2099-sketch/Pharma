import Head from 'next/head'
import Link from 'next/link'

export default function Help() {
  const faqs = [
    {
      question: "How do I upload a prescription?",
      answer: "Go to our Prescriptions page and click 'Upload Prescription'. You can upload images or PDF files of your prescription."
    },
    {
      question: "What are your delivery hours?",
      answer: "We offer 24/7 delivery service. Same-day delivery is available for orders placed before 6 PM."
    },
    {
      question: "How can I track my order?",
      answer: "After placing an order, you'll receive a tracking number via SMS and email to monitor your delivery status."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans. Contact us with your insurance details for verification."
    }
  ]

  return (
    <>
      <Head>
        <title>Help & Support - Awon Pharmacy</title>
        <meta name="description" content="Get help and support for your Awon Pharmacy orders and services" />
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
                <Link href="/help" className="text-teal-600 font-medium">Help</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
              <p className="text-xl text-gray-600">Find answers to common questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">24/7 customer support</p>
                <p className="font-semibold text-teal-600">+1 (800) 123-4567</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our pharmacists</p>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  Start Chat
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your questions</p>
                <p className="font-semibold text-teal-600">info@awonpharmacy.com</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}