import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import AIMarketingGenerator from '../../src/components/AIMarketingGenerator'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminToken = localStorage.getItem('adminToken')
      const userData = localStorage.getItem('user')
      
      if (!adminToken || !userData) {
        router.push('/admin/login')
        return
      }
      
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== 'admin') {
        router.push('/admin/login')
        return
      }
      
      setUser(parsedUser)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('user')
    }
    router.push('/admin/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  const stats = [
    { title: 'Total Orders', value: '1,234', change: '+12%', color: 'bg-blue-500', icon: '📦' },
    { title: 'Revenue', value: 'SAR 45,678', change: '+8%', color: 'bg-green-500', icon: '💰' },
    { title: 'Products', value: '856', change: '+3%', color: 'bg-purple-500', icon: '💊' },
    { title: 'Customers', value: '2,341', change: '+15%', color: 'bg-orange-500', icon: '👥' }
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'Ahmed Ali', amount: 'SAR 125.50', status: 'Completed', date: '2024-06-25' },
    { id: '#ORD-002', customer: 'Sara Mohammed', amount: 'SAR 89.25', status: 'Processing', date: '2024-06-25' },
    { id: '#ORD-003', customer: 'Omar Hassan', amount: 'SAR 234.75', status: 'Shipped', date: '2024-06-24' },
    { id: '#ORD-004', customer: 'Fatima Al-Zahra', amount: 'SAR 67.00', status: 'Pending', date: '2024-06-24' }
  ]

  const aiTools = [
    { name: 'Marketing Generator', description: 'Generate social media posts and email campaigns', icon: '🎯', active: true },
    { name: 'Sales Monitor', description: 'AI-powered sales analytics and predictions', icon: '📈', active: true },
    { name: 'Security Scanner', description: 'Automated security threat detection', icon: '🛡️', active: true },
    { name: 'Performance Monitor', description: 'Real-time website performance analysis', icon: '⚡', active: true },
    { name: 'Customer Insights', description: 'AI-driven customer behavior analysis', icon: '🧠', active: false },
    { name: 'Inventory Optimizer', description: 'Smart inventory management predictions', icon: '📊', active: false }
  ]

  return (
    <>
      <Head>
        <title>Admin Dashboard - Awon Pharmacy</title>
        <meta name="description" content="Awon Pharmacy admin dashboard with AI tools and analytics" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center mr-8">
                  <span className="text-2xl font-bold text-teal-600">Awon</span>
                  <span className="text-2xl font-light text-gray-900">Pharmacy</span>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">All Systems Online</span>
                </div>
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'ai-tools', name: 'AI Tools', icon: '🤖' },
                { id: 'orders', name: 'Orders', icon: '📦' },
                { id: 'products', name: 'Products', icon: '💊' },
                { id: 'customers', name: 'Customers', icon: '👥' },
                { id: 'security', name: 'Security', icon: '🛡️' },
                { id: 'marketing', name: 'Marketing', icon: '🎯' },
                { id: 'analytics', name: 'Analytics', icon: '📈' },
                { id: 'settings', name: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xl">{stat.icon}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                      <span className="text-gray-600 text-sm"> from last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AI Tools Tab */}
          {activeTab === 'ai-tools' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI-Powered Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiTools.map((tool, index) => (
                    <div key={index} className={`p-6 rounded-xl border-2 ${tool.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{tool.icon}</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tool.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tool.active ? 'Active' : 'Coming Soon'}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Marketing Generator */}
              <AIMarketingGenerator />
            </div>
          )}

          {/* Marketing Tab */}
          {activeTab === 'marketing' && (
            <div className="space-y-8">
              <AIMarketingGenerator />
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6">🎯 Marketing Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2,341</div>
                    <div className="text-sm text-gray-600">Social Media Reach</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">18.5%</div>
                    <div className="text-sm text-gray-600">Email Open Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4.2%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6">🛡️ Security Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-green-800">System Secure</span>
                    </div>
                    <p className="text-sm text-green-600">No threats detected in the last 24 hours</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-medium text-blue-800">SSL Certificate</span>
                    </div>
                    <p className="text-sm text-blue-600">Valid until Dec 2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {!['overview', 'ai-tools', 'marketing', 'security'].includes(activeTab) && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
              <p className="text-gray-600 mb-6">
                Advanced {activeTab} management features with AI integration
              </p>
              <div className="text-6xl mb-4">🚀</div>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}