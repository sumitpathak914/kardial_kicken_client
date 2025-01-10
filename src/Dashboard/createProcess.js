import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For page redirection

const CreateProcess = () => {
    const [currentStep, setCurrentStep] = useState(0);
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
            navigate("/process"); // Redirect to process page after completing the steps
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

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-700">Create Process</h1>

            {/* Step Progression */}
            <div className="mb-6">
                <div className="flex mb-4 space-x-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            onClick={() => handleStepClick(index)}
                            className={`flex items-center justify-center w-16 h-16 cursor-pointer rounded-full border-2 ${index === currentStep
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                                }`}
                        >
                            <span>{index + 1}</span>
                        </div>
                    ))}
                </div>
                <p className="text-lg font-medium">
                    Current Step: {steps[currentStep]}
                </p>
            </div>

            {/* Previous and Next Step Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePreviousStep}
                    className={`px-6 py-2 rounded-md ${currentStep === 0
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    disabled={currentStep === 0}
                >
                    Previous Step
                </button>
                <button
                    onClick={handleNextStep}
                    className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    {currentStep === steps.length - 1 ? "Complete Process" : "Next Step"}
                </button>
            </div>
        </div>
    );
};

export default CreateProcess;
