import React from "react";
import { useNavigate } from "react-router-dom"; // For page redirection

const Process = () => {
    const navigate = useNavigate();

    // Sample process data (can be fetched from API)
    const processData = [
        { id: 1, clientName: "Client 1", fixedAmount: "$500", status: "Completed" },
        { id: 2, clientName: "Client 2", fixedAmount: "$750", status: "In Progress" },
        { id: 3, clientName: "Client 3", fixedAmount: "$300", status: "Not Started" },
    ];

    // Handle Create Process button click
    const handleCreateProcess = () => {
        navigate("/create-process"); // Redirects to the create process page
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-700">Process List</h1>

            {/* Process Table */}
            <div className="p-4 overflow-x-auto bg-white rounded-md shadow-md">
                <table className="w-full border border-collapse border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border border-gray-300">Client Name</th>
                            <th className="px-4 py-2 border border-gray-300">Fixed Amount</th>
                            <th className="px-4 py-2 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processData.map((process) => (
                            <tr key={process.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">
                                    {process.clientName}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {process.fixedAmount}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {process.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Process Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleCreateProcess}
                    className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Create Process
                </button>
            </div>
        </div>
    );
};

export default Process;
