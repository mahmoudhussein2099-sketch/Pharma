import React from 'react';
import UserSidebar from '../../components/dashboard/UserSidebar';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <p className="text-gray-600">Your account overview and statistics</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <p className="text-gray-600">Your latest orders and activities</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Health Reminders</h3>
              <p className="text-gray-600">Medication and appointment reminders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;