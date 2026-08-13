import React from 'react';
import UserSidebar from '../../components/dashboard/UserSidebar';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      change: '+12%',
      color: 'from-blue-500 to-blue-600',
      icon: '📦'
    },
    {
      title: 'Active Prescriptions',
      value: '3',
      change: '+2',
      color: 'from-green-500 to-green-600',
      icon: '💊'
    },
    {
      title: 'Wishlist Items',
      value: '18',
      change: '+5',
      color: 'from-purple-500 to-purple-600',
      icon: '❤️'
    },
    {
      title: 'Saved Amount',
      value: 'SAR 245',
      change: '+18%',
      color: 'from-orange-500 to-orange-600',
      icon: '💰'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      date: '2024-06-25',
      items: 'Panadol Extra, Vitamin C',
      status: 'Delivered',
      amount: 'SAR 45.50'
    },
    {
      id: '#ORD-002',
      date: '2024-06-23',
      items: 'Face Cream, Sunscreen',
      status: 'Processing',
      amount: 'SAR 78.25'
    },
    {
      id: '#ORD-003',
      date: '2024-06-20',
      items: 'Baby Formula, Diapers',
      status: 'Shipped',
      amount: 'SAR 125.00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your account.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl`}>
                    {stat.icon}
                  </div>
                  <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{order.id}</td>
                      <td className="py-4 px-4 text-gray-600">{order.date}</td>
                      <td className="py-4 px-4 text-gray-600">{order.items}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;