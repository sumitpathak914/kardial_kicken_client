import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AddProduct = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        quality: "",
        category: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        setProducts((prev) => [...prev, formData]);
        setFormData({ name: "", quality: "", category: "", status: "" });
        setModalOpen(false);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="p-6 min-h-screen bg-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Add Product</h1>
                <button
                    onClick={openModal}
                    className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    placeholder="Search by Product Name or Category"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700">
                    <FaSearch />
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left border-collapse border-purple-200">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Name</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Quality</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Category</th>
                            <th className="px-4 py-2 border text-purple-700 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 border">{product.name}</td>
                                    <td className="px-4 py-2 border">{product.quality}</td>
                                    <td className="px-4 py-2 border">{product.category}</td>
                                    <td className="px-4 py-2 border">{product.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                    No products found.
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
                        <h2 className="mb-6 text-xl font-bold text-purple-700">Add Product</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="quality"
                                value={formData.quality}
                                onChange={handleChange}
                                placeholder="Quality"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
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

export default AddProduct;


