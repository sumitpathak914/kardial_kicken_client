import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmpRegistration = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "",
    responsibilities: "",
    password:"",
    role: "sales",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    setEmployees((prev) => [...prev, formData]);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      status: "",
      responsibilities: "",
      password:"",
      role: "sales",
    });
    setModalOpen(false);
  };

  // Open modal
  const openModal = () => setModalOpen(true);

  // Close modal
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Employee Registration</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-md shadow-md">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Mobile</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Responsibilities</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
              <th className="px-4 py-2 border border-gray-300"> Password</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{employee.name}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.mobile}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.email}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.status}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.responsibilities}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.role}</td>
                <td className="px-4 py-2 border border-gray-300">{employee.password}</td>
                <td className="flex justify-center gap-2 px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Add Employee</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Status"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Responsibilities"
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="w-full px-4 py-2 border rounded-md"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="sales">Sales</option>
                <option value="designer">Designer</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 mr-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpRegistration;
