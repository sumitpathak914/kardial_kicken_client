import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex">
      

        
        <div className="flex-1 p-6">
         
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Welcome to the Dashboard</h1>
            
          </header>

         
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
            <div className="p-6 bg-white rounded-md shadow-md">
              <h2 className="text-lg text-gray-700">Total Users</h2>
              <p className="text-2xl font-bold text-blue-600">1,245</p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md">
              <h2 className="text-lg text-gray-700">Revenue</h2>
              <p className="text-2xl font-bold text-green-600">$34,567</p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md">
              <h2 className="text-lg text-gray-700">Orders</h2>
              <p className="text-2xl font-bold text-yellow-600">890</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Analytics Overview
            </h3>
            {/* Placeholder for charts */}
            <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-100">
              Chart will go here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
