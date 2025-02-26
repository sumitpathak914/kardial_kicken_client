import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BaseUrl } from "../Auth/Url";

const AddProduct = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState({});
    const [action, setAction] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        quality: "",
        category: "",
        id: "",
        status: null
    });

    // Fetch products when the component loads
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/GetProducts`);
            const data = await response.json();
            if (data.statusCode === 200 && data.result) {
                setProducts(data.data);
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new product using the API
    const handleSubmit = async () => {
        setErrors({});
        const newErrors = {};

        // Validate Name
        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = "Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain alphabets and spaces.";
        }

        // Validate Quality
        if (!formData.quality.trim() || formData.quality.length < 2) {
            newErrors.quality = "Quality is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.quality)) {
            newErrors.quality = "Quality should only contain alphabets and spaces.";
        }

        // Validate Category
        if (!formData.category.trim() || formData.category.length < 2) {
            newErrors.category = "Category is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.category)) {
            newErrors.category = "Category should only contain alphabets and spaces.";
        }

        // If there are errors, stop the submission and display them
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Decide API based on the action value
            const url =
                action === 1
                    ? `${BaseUrl}/api/product_update`
                    : `${BaseUrl}/api/Add_Product`;

            const method = action === 1 ? "PUT" : "POST";

            const bodyData =
                action === 1
                    ? {
                        id: formData.id, // Include `id` for update
                        productname: formData.name,
                        quality: formData.quality,
                        category: formData.category,
                        status: 1, // Example status for update
                    }
                    : {
                        productname: formData.name,
                        quality: formData.quality,
                        category: formData.category,
                    };

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();
            if (response.ok) {
                setFormData({ name: "", quality: "", category: "" });
                setModalOpen(false);
                fetchProducts(); // Refresh product list
                setAction(0); // Reset action
            } else {
                console.error(`Failed to ${action === 1 ? "update" : "add"} product:`, data);
            }
        } catch (error) {
            console.error(`Error ${action === 1 ? "updating" : "adding"} product:`, error);
        }
    };


    const openModal = (product = null, status) => {
        if (product) {
            if (status === 1) {
                setAction(1)
            }

            setFormData({
                id: product.id,
                name: product.productname,
                quality: product.quality,
                quality: product.quality,
                category: product.category,
                status: product.status

            });
        } else {
            setFormData({ name: "", quality: "", category: "" });
        }
        setModalOpen(true);
    };
    const closeModal = () => {
        setErrors({})
        setModalOpen(false);
        setAction(0)
    }
    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

    // Filter products based on the search term
    const filteredProducts = products.filter(
        (product) =>
            product.productname.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
    );
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/product/${id}`);
            if (response.status === 200) {

                fetchProducts()
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };
    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Add Product</h1>
                <button
                    onClick={() => openModal(null, 0)}
                    className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Product Name or Category"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
                />
                <button className="px-4 py-2 text-white bg-purple-600 rounded-r-lg hover:bg-purple-700">
                    <FaSearch />
                </button>
            </div>

            {/* Product Table */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <table className="w-full text-left border-collapse border-purple-200">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Product id</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Name</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Quality</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Category</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Status</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 border">{product.id}</td>
                                    <td className="px-4 py-2 border">{product.productname}</td>
                                    <td className="px-4 py-2 border">{product.quality}</td>
                                    <td className="px-4 py-2 border">{product.category}</td>
                                    <td className="px-4 py-2 border">
                                        {product.status === 0 ? "Inactive" : "Active"}
                                    </td>
                                    <td className="px-4 py-2 border border-purple-200">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openModal(product, 1)}
                                                className="text-purple-600 hover:text-purple-800"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
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
                            {(errors.name || formData.name === '') && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                            <input
                                type="text"
                                name="quality"
                                value={formData.quality}
                                onChange={handleChange}
                                placeholder="Quality"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {(errors.quality || formData.quality === '') && (
                                <p className="text-sm text-red-500">{errors.quality}</p>
                            )}
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {(errors.category || formData.category === '') && (
                                <p className="text-sm text-red-500">{errors.category}</p>
                            )}
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
