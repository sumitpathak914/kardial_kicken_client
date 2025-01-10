import React, { useState } from "react";

const AddCategory = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        status: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = () => {
        setCategories((prev) => [...prev, formData]);
        setFormData({ name: "", status: "" });
        setModalOpen(false);
    };

    // Open modal
    const openModal = () => setModalOpen(true);

    // Close modal
    const closeModal = () => setModalOpen(false);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-700">Add Category</h1>
                <button
                    onClick={openModal}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Add Category
                </button>
            </div>

            {/* Table */}
            <div className="p-4 overflow-x-auto bg-white rounded-md shadow-md">
                <table className="w-full border border-collapse border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Name</th>
                           
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">{category.name}</td>
                               
                                <td className="px-4 py-2 border border-gray-300">{category.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                        <h2 className="mb-4 text-xl font-bold">Add Category</h2>
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
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                placeholder="Status"
                                className="w-full px-4 py-2 border rounded-md"
                            />
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

export default AddCategory;
