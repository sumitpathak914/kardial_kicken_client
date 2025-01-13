import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProcess = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        dateOfStudio: "",
        clientName: "",
        contact: "",
        architect: "",
        address: "",
        cabinetType: "",
        additionalInfo: "",
        files: [], // New state for storing files
    });

    const navigate = useNavigate();

    const steps = [
        "Requirement Gathering",
        "Measurement",
        "Design",
        "Quotation",
        "Design Discussion",
        "Final Client",
        "Final Document",
        "Final Design",
        "Payment Amount",
        "PPT Drawing",
        "Measurement",
        "Final Measurement",
    ];

    // Handle next step button click
    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate("/process");
        }
    };

    // Handle previous step button click
    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle clicking on a step number
    const handleStepClick = (index) => {
        setCurrentStep(index);
    };

    // Handle form input change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            files: [...formData.files, ...files],
        });
    };

    // Handle file delete
    const handleDeleteFile = (index) => {
        const updatedFiles = formData.files.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            files: updatedFiles,
        });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleNextStep(); // Proceed to the next step after form submission
    };

    return (
        <div className="p-8 min-h-screen bg-white">
            <h1 className="mb-8 text-3xl font-semibold text-purple-700">Create Process</h1>

            {/* Step Progression */}
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            onClick={() => handleStepClick(index)}
                            className={`flex items-center justify-center w-14 h-14 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out ${index === currentStep
                                ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white border-purple-700 scale-110"
                                : "bg-white text-purple-700 border-purple-300"
                                }`}
                        >
                            <span className="font-semibold">{index + 1}</span>
                        </div>
                    ))}
                </div>
                <p className="text-lg font-medium text-center text-purple-800">
                    Current Step: <span className="font-bold">{steps[currentStep]}</span>
                </p>
            </div>
            {currentStep === 0 ? (
    <form onSubmit={handleFormSubmit} className="p-0 bg-white rounded-lg shadow-md">

        {/* Existing fields for Requirement Gathering */}
        <div className="mb-2">
            <label className="block mb-2 font-medium text-gray-700">
                Date of Studio Visit
            </label>
            <input
                type="date"
                name="dateOfStudio"
                value={formData.dateOfStudio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
                Client Name
            </label>
            <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        {/* New Fields */}
        <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
                Client Contact
            </label>
            <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
                Architect
            </label>
            <input
                type="text"
                name="architect"
                value={formData.architect}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
                Architect Contact
            </label>
            <input
                type="text"
                name="architectContact"
                value={formData.architectContact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
                Address
            </label>
            <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows="4"
                required
            />
        </div>

        <button
            type="submit"
            className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
            Next
        </button>
    </form>

  
            ) : currentStep === 1 ? (
                // Form for Measurement Step
                <form onSubmit={handleFormSubmit} className="p-6 bg-white rounded-lg shadow-md">
                    {/* Existing fields for Measurement */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">
                            Select Cabinet Type
                        </label>
                        <select
                            name="cabinetType"
                            value={formData.cabinetType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        >
                            <option value="">Select a cabinet type</option>
                            <option value="baseCabinet">Base Cabinet</option>
                            <option value="wallCabinet">Wall Cabinet</option>
                            <option value="tallCabinet">Tall Cabinet</option>
                            <option value="saccharides">Saccharides</option>
                            <option value="loftCabinet">Loft Cabinet</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">
                            Additional Information
                        </label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            rows="6"
                            placeholder="Enter additional details here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                    >
                        Next
                    </button>
                </form>
            ) : currentStep === 2 ? (
                // Form for Design Step with Multiple File Upload
                <form onSubmit={handleFormSubmit} className="p-6 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">
                            Upload Design Files
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    {formData.files.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-700">Uploaded Files:</h3>
                            <ul className="list-disc pl-5 mt-2">
                                {formData.files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteFile(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                    >
                        Next
                    </button>
                </form>
            ) : (
                // Previous and Next Step Buttons for other steps
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handlePreviousStep}
                        className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ease-in-out ${currentStep === 0
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                            }`}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextStep}
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700 transition-all duration-300 ease-in-out"
                    >
                        {currentStep === steps.length - 1 ? "Complete" : "Next"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateProcess;
