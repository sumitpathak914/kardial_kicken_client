import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AddCategory = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle form submission
  const handleSubmit = () => {
    setCategories((prev) => [...prev, { ...formData, id: categories.length + 1 }]);
    setFormData({ name: "", status: "" });
    setModalOpen(false);
  };

  // Open modal
  const openModal = () => setModalOpen(true);

  // Close modal
  const closeModal = () => setModalOpen(false);

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Add Category</h1>
        <button
          onClick={openModal}
          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search by Category Name or ID"
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

      {/* Category Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">ID</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Category Name</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border border-purple-200">{category.id}</td>
                  <td className="px-4 py-2 border border-purple-200">{category.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{category.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-4 py-2 text-gray-500">
                  No categories found.
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
            <h2 className="mb-6 text-2xl font-semibold text-purple-700">Add Category</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
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

export default AddCategory;
