import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BaseUrl } from "../Auth/Url";
import { TripleDES } from "crypto-js";
import { BiTerminal } from "react-icons/bi";
import { generatePath } from "react-router-dom";

const AddArchitect = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [architects, setArchitects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState({});
    const [action, setAction] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        status: null,
        id:""
    });

    // Fetch architects on component mount
    useEffect(() => {
        fetchArchitects();
    }, []);

    const fetchArchitects = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/GetArchitech`);
            if (response.data.statusCode === 200) {
                setArchitects(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching architects:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "mobile" ? value.replace(/\D/g, "") : value, // Allow only digits for "mobile"
        }));
    };
    const handleSubmit = async () => {
        setErrors({});
        const newErrors = {};

        // Validate Name
        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = "Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain alphabets and spaces.";
        }

        // Validate Mobile
        if (!formData?.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be exactly 10 digits.";
        }

        // Validate Email
        if (!formData?.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Validate City
        if (!formData?.city.trim()) {
            newErrors.city = "City is required.";
        }

        // If there are errors, stop the submission and display them
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (action === 1) {
                // Call the Update API
                await axios.put(`${BaseUrl}/api/architech_update`, {
                    name: formData.name,
                    status: formData.status,
                    city: formData.city,
                    email: formData.email,
                    number: formData.mobile,
                    id: formData.id, // Ensure formData includes the ID for update
                });
            } else {
                // Call the Add API
                await axios.post(`${BaseUrl}/api/Add_architech`, {
                    name: formData.name,
                    number: formData.mobile,
                    email: formData.email,
                    city: formData.city,
                });
            }

            // Refresh architect list after operation
            fetchArchitects();
            setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
            setModalOpen(false);
            setErrors({})
            setAction(0)
        } catch (error) {
            alert('architech with this email or number already exists')
            console.error("Error submitting architect data:", error);
        }
    };


    // const openModal = () => {
        
    //     setModalOpen(true);
    // } 

    const openModal = (architech = null, status) => {
        if (architech) {
            if (status === 1) {
                setAction(1)
            }

            setFormData({
                id: architech.id,
                name: architech.name,
                mobile: architech.number,
                email: architech.email,
                city: architech.city,
                status: architech.status

            });
        } else {
            setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
        }
        setModalOpen(true);
    };
    const closeModal = () => {
        setErrors({})
        setModalOpen(false);
        setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
        setAction(0)
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredArchitects = architects.filter(
        (architect) =>
            architect.name.toLowerCase().includes(searchTerm) ||
            architect.number.includes(searchTerm)
    );

    const deleteArchitech = async (id) => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/architech/${id}`);
            if (response.status === 200) {

                fetchArchitects()
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    
    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Add Architect</h1>
                <button
                    onClick={() => openModal(null, 0)} 
                    className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Add Architect
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Architect Name or Number"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
                />
                <button className="px-4 py-2 text-white bg-purple-600 rounded-r-lg hover:bg-purple-700">
                    <FaSearch />
                </button>
            </div>

            {/* Architect Table */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <table className="w-full text-left border-collapse border-purple-200">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 font-medium text-purple-700 border">ID</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Name</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Mobile</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Email</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">City</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Status</th>
                            <th className="px-4 py-2 font-medium text-purple-700 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArchitects.length > 0 ? (
                            filteredArchitects.map((architect, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 border">{architect.id}</td>
                                    <td className="px-4 py-2 border">{architect.name}</td>
                                    <td className="px-4 py-2 border">{architect.number}</td>
                                    <td className="px-4 py-2 border">{architect.email}</td>
                                    <td className="px-4 py-2 border">{architect.city}</td>
                                    <td className="px-4 py-2 border">{architect.status ? "Active" : "Inactive"}</td>
                                     <td className="px-4 py-2 border border-purple-200">
                                                                        <div className="flex items-center gap-2">
                                                                          <button
                                                onClick={() => openModal(architect, 1)} 
                                                                            className="text-purple-600 hover:text-purple-800"
                                                                          >
                                                                            <FaEdit />
                                                                          </button>
                                                          <button className="text-red-600 hover:text-red-800"
                                                onClick={() => deleteArchitech(architect.id)}
                                                          >
                                                                            <FaTrash />
                                                                          </button>
                                                                        </div>
                                                                      </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
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
                            {(errors.name || formData.name === '') && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength={10}
                                placeholder="Mobile Number"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {(errors.mobile || formData.mobile === '') && (
                                <p className="text-sm text-red-500">{errors.mobile}</p>
                            )}
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {(errors.email || formData.email === '') && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {(errors.city || formData.city === '') && (
                                <p className="text-sm text-red-500">{errors.city}</p>
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

export default AddArchitect;

