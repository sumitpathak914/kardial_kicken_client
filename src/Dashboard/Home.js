import React, { useState } from 'react';

const Dashboard = () => {
  const [orders] = useState([
    { id: '01224', date: 'June 12, 2022 - 17:42', customer: 'A customer', product: 'Sectionals', amount: '$450.00', status: 'Order Placed' },
    { id: '01225', date: 'May 12, 2022 - 17:42', customer: 'B customer ', product: 'Sofas', amount: '$450.00', status: 'On Progress' },
    { id: '01226', date: 'May 12, 2022 - 17:42', customer: 'C customer', product: 'Chairs', amount: '$900.00', status: 'Delivered' },
    { id: '01227', date: 'May 12, 2022 - 17:42', customer: 'D customer', product: 'Ottomans', amount: '$90.00', status: 'Cancelled' },
    { id: '01228', date: 'May 12, 2022 - 17:42', customer: 'E customer', product: 'Benches', amount: '$450.00', status: 'Refunded' },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Today's Order Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700">Today's Order</h3>
          <p className="text-3xl font-bold text-blue-900">128</p>
          <p className="text-green-600 mt-2">+8.26% More earning than usual</p>
        </div>

        {/* Total Order Card */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-700">Total Order</h3>
          <p className="text-3xl font-bold text-green-900">15,265</p>
          <p className="text-green-600 mt-2">+2.45% More earning than usual</p>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-700">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-900">327</p>
          <p className="text-red-600 mt-2">-1.32% Less new user than usual</p>
        </div>

        {/* Cancelled Card */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-700">Cancelled</h3>
          <p className="text-3xl font-bold text-red-900">1,360</p>
          <p className="text-red-600 mt-2">-8.26% Less cancel than usual</p>
        </div>

        {/* All Employees Card */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-700">All Employees</h3>
          <p className="text-3xl font-bold text-purple-900">1,235</p>
          <p className="text-green-600 mt-2">+5% More than last month</p>
        </div>

        {/* Clients Card */}
        <div className="bg-pink-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-pink-700">Clients</h3>
          <p className="text-3xl font-bold text-pink-900">567</p>
          <p className="text-green-600 mt-2">+3.2% New clients</p>
        </div>

        {/* Architecture Card */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-indigo-700">Architecture</h3>
          <p className="text-3xl font-bold text-indigo-900">12</p>
          <p className="text-blue-600 mt-2">New designs added</p>
        </div>

        {/* Category Card */}
        <div className="bg-orange-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-700">Category</h3>
          <p className="text-3xl font-bold text-orange-900">32</p>
          <p className="text-green-600 mt-2">+1 New category added</p>
        </div>
      </div>

      {/* Order Management */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Management</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg shadow">Filters</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg shadow">Export</button>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Date & Time</th>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                <td className="border border-gray-300 px-4 py-2">{order.product}</td>
                <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-200 text-green-800'
                        : order.status === 'Cancelled'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg mr-2">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
