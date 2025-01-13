import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Process = () => {
    const navigate = useNavigate();
    const initialProcessData = [
        { id: 1, clientName: "Client 1", fixedAmount: "$500", status: "Completed" },
        { id: 2, clientName: "Client 2", fixedAmount: "$750", status: "In Progress" },
        { id: 3, clientName: "Client 3", fixedAmount: "$300", status: "Not Started" },
    ];

    const [processData, setProcessData] = useState(initialProcessData);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredProcessData = processData.filter((process) =>
        process.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateProcess = () => navigate("/create-process");

    const handleView = (id) => alert(`Viewing details for Client ID: ${id}`);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this process?")) {
            setProcessData(processData.filter((process) => process.id !== id));
        }
    };

    const handleAddInstallment = (id) => alert(`Adding installment for Client ID: ${id}`);

    return (
        <div className="p-6 min-h-screen bg-white">
            <h1 className="mb-6 text-2xl font-bold text-purple-700">Process List</h1>

            {/* Search & Create Button */}
            <div className="flex items-center justify-between mb-4">
                <div className="relative w-72 flex ">
                    <input
                     type="text"
                     placeholder="Search by Client Name or ID"
                     value={searchTerm}
                     onChange={handleSearch}
                     className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
                     />
                     <button className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700">
                    
                    <FaSearch />
                    </button>
                </div>
                <button
                    onClick={handleCreateProcess}
                    className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Create Process
                </button>
            </div>

            {/* Process Table */}
            <div className="p-4 bg-white rounded-md shadow-lg">
                <table className="w-full border border-collapse border-gray-200">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300 text-purple-700">Client Name</th>
                            <th className="px-4 py-2 border border-gray-300 text-purple-700">Fixed Amount</th>
                            <th className="px-4 py-2 border border-gray-300 text-purple-700">Status</th>
                            <th className="px-4 py-2 border border-gray-300 text-purple-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProcessData.length > 0 ? (
                            filteredProcessData.map((process) => (
                                <tr key={process.id} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 border border-gray-300">{process.clientName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{process.fixedAmount}</td>
                                    <td className="px-4 py-2 border border-gray-300">{process.status}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            onClick={() => handleView(process.id)}
                                            className="px-3 py-1 mr-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(process.id)}
                                            className="px-3 py-1 mr-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleAddInstallment(process.id)}
                                            className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                        >
                                            Add Installment
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                    No process found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Process;
