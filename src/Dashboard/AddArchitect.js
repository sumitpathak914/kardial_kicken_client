import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AddArchitect = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [architects, setArchitects] = useState([]);
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
        setArchitects((prev) => [...prev, formData]);
        setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
        setModalOpen(false);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredArchitects = architects.filter(
        (architect) =>
            architect.name.toLowerCase().includes(searchTerm) ||
            architect.mobile.includes(searchTerm)
    );

    return (
        <div className="p-6 min-h-screen  bg-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Add Architect</h1>
                <button
                    onClick={openModal}
                    className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Add Architect
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    placeholder="Search by Architect Name or ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700">

                    <FaSearch />
                    </button>
            
            </div>

            {/* Architect Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left border-collapse border-purple-200">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 border text-purple-700 font-medium">ID</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Name</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Mobile</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Email</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">City</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArchitects.length > 0 ? (
                            filteredArchitects.map((architect, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 border">{architect.ID}</td>
                                    <td className="px-4 py-2 border">{architect.name}</td>
                                    <td className="px-4 py-2 border">{architect.mobile}</td>
                                    <td className="px-4 py-2 border">{architect.email}</td>
                                    <td className="px-4 py-2 border">{architect.city}</td>
                                    <td className="px-4 py-2 border">{architect.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                    No architects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="mb-6 text-xl font-bold text-purple-700">Add Architect</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                placeholder="Status"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mr-4 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
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

export default AddArchitect;
