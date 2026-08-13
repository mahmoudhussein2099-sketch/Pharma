import React from 'react';
import UserSidebar from '../../components/dashboard/UserSidebar';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Welcome to Your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <p className="text-muted-foreground">Your account overview and statistics</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <p className="text-muted-foreground">Your latest orders and activities</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Health Reminders</h3>
              <p className="text-muted-foreground">Medication and appointment reminders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;