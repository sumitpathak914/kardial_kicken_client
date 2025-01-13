import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AddClient = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setClients((prev) => [...prev, formData]);
    setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
    setModalOpen(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Client Management</h1>
        <button
          onClick={openModal}
          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search by Client Name or ID"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-purple-600 rounded-r-lg text-white hover:bg-purple-700"
        >
          <FaSearch />
        </button>
      </div>

      {/* Client Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              {["ID","Name", "Mobile Number", "Email", "City", "Status"].map((header) => (
                <th key={header} className="px-4 py-2 text-left border border-purple-200">
                  <span className="font-medium text-purple-700">{header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <tr key={index} className="hover:bg-purple-50">
                 <td className="px-4 py-2 border border-purple-200">{client.ID}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.mobile}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.email}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.city}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-purple-700">Add Client</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Client Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Status"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-3 mr-4 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
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

export default AddClient;
