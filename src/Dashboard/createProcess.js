import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackExposePanal from "./Base/BackExposePanal";
import Cornercabinate from "./Base/Cornercabinate";
import CornerCabinateThreeFourth from "./Base/CornerCabinateThreeFourth";
import Crockerycabinter from "./Base/Crockerycabinter";
import Mscubecabinate from "./Base/Mscubecabinate";
import OpenCabinate from "./Base/OpenCabinate";
import SideExpose from "./Base/SideExpose";
import MeasurementImageUploader from "./MeasurementImageUploader";
import CabinetCalculator from "./Quatation";
import RequrementGathring from "./RequrementGathring";
import WallRegularCabinet from "./wall/WallRegularcabinet";
import WallCornerCabinet from "./wall/WallCornerCabinet";
import ThreeFourthCornerCabinet from "./wall/ThreeFourthCornerCabinet";
import OpenWallCabinet from "./wall/OpenWallCabinet";
import CrockeryWallCabinet from "./wall/CrockeryWallCabinet";
import MsCubeWallCabinet from "./wall/MsCubeWallCabinet";
import RollingWallCabinet from "./wall/RollingWallCabinet";
import SideExposeWallCabiet from "./wall/SideExposeWallCabiet";
import BottomOrBackExposeWall from "./wall/BottomOrBackExposeWall";
import RegularCabinetTall from "./Tall/RegularCabinetTall";
import CornerCabinetTall from "./Tall/CornerCabinetTall";
import ThreeFourthTallCabinet from "./Tall/ThreeFourthTallCabinet";
import ThreeFourthTall from "./Tall/ThreeFourthTall";
import OpenCabinetTall from "./Tall/OpenCabinetTall";
import CrockeryCabinetTall from "./Tall/CrockeryCabinetTall";
import MsCubeTall from "./Tall/MsCubeTall";
import SideExposeTall from "./Tall/SideExposeTall";
import BackExposePanalTall from "./Tall/BackExposePanalTall";

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
    const [formDatastep2, setFormDatastep2] = useState({
        cabinetType: '',
        subCabinetType: '',
        additionalInfo: '',
    });
    const [cabinetType, setCabinetType] = useState(""); // Base, Wall, Tall
    const [baseMaterial, setBaseMaterial] = useState("");
    const [shutterType, setShutterType] = useState("");
    const [tandemType, setTandemType] = useState("");
    const [handleType, setHandleType] = useState("");
    const handleInputChangestep2 = (e) => {
        const { name, value } = e.target;
        setFormDatastep2({ ...formData, [name]: value });
    };

    const handleFormSubmitstep2 = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };
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
        <div className="min-h-screen p-8 bg-white">
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

            {
                currentStep === 0 && (
                    <>
                        <RequrementGathring handleFormSubmit={handleFormSubmit} />
                    </>
                )
            }
            {
                currentStep === 1 && (
                    <>
                        <MeasurementImageUploader />
                    </>
                )
            }

            {
                currentStep === 2 && (
                    <form onSubmit={handleFormSubmitstep2} className="p-6 bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Upload Design Files
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleInputChangestep2}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        {formData.files.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-gray-700">Uploaded Files:</h3>
                                <ul className="pl-5 mt-2 list-disc">
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
                )
            }
            {
                currentStep === 3 && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h2 className="mb-2 text-lg font-bold">Select Cabinet Options</h2>

                        {/* First Dropdown - Select Cabinet Type */}
                        <div className="mb-4">
                            <label className="block font-semibold">Select Cabinet Type:</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={cabinetType}
                                onChange={(e) => setCabinetType(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Base">Base</option>
                                <option value="Wall">Wall</option>
                                <option value="Tall">Tall</option>
                            </select>
                        </div>

                        {/* Second Dropdown - Select Base Material (Only for Base) */}
                        {cabinetType !== "" && (
                            <div className="mb-4">
                                <label className="block font-semibold">Select Base Material:</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={baseMaterial}
                                    onChange={(e) => setBaseMaterial(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Carcass">Carcass</option>
                                    <option value="SS Frame">SS Frame</option>
                                    <option value="Ply Partition">Ply Partition</option>
                                </select>
                            </div>
                        )}
                        

                        {/* Third Dropdown - Select Shutter Type */}
                        {baseMaterial && (
                            <div className="mb-4">
                                <label className="block font-semibold">Select Shutter Type:</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={shutterType}
                                    onChange={(e) => setShutterType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Laminate">Laminate</option>
                                    <option value="Acrylic">Acrylic</option>
                                    <option value="Fenix">Fenix</option>
                                    <option value="PU">PU</option>
                                    <option value="Glass">Glass</option>
                                </select>
                            </div>
                        )}

                        {/* Fourth Dropdown - Select Tandem Type */}
                        {shutterType && (
                            <div className="mb-4">
                                <label className="block font-semibold">Select Tandem Type:</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={tandemType}
                                    onChange={(e) => setTandemType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Blum Legra">Blum Legra</option>
                                    <option value="Blum Regular">Blum Regular</option>
                                    <option value="Hafele">Hafele</option>
                                    <option value="Grass">Grass</option>
                                    <option value="Hettich">Hettich</option>
                                    <option value="Ebco">Ebco</option>
                                </select>
                            </div>
                        )}

                        {/* Fifth Dropdown - Select Handle Type */}
                        {tandemType && (
                            <div className="mb-4">
                                <label className="block font-semibold">Select Handle Type:</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={handleType}
                                    onChange={(e) => setHandleType(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="J Handle">J Handle</option>
                                    <option value="Surface">Surface</option>
                                    <option value="Gola">Gola</option>
                                    <option value="Regular">Regular</option>
                                </select>
                            </div>
                        )}

                        {/* Conditional Rendering */}
                        <div className="p-4 mt-4 bg-white border rounded">
                            {cabinetType === "Base" && (
                                <>
                                    <p className="font-semibold text-blue-500">Base Cabinet Selected</p>
                                    {/* Render Base Cabinet Components */}
                                    <>
                                        {/* <CabinetForm /> */}
                                        <CabinetCalculator />
                                        <Cornercabinate />
                                        <CornerCabinateThreeFourth />
                                        <OpenCabinate />
                                        <Crockerycabinter />
                                        <Mscubecabinate />
                                        <SideExpose />
                                        <BackExposePanal />
                                    </>
                                </>
                            )}

                            {cabinetType === "Wall" && <>
                                {/* <CabinetForm /> */}
                                <WallRegularCabinet />
                                <WallCornerCabinet />
                                <ThreeFourthCornerCabinet />
                                <OpenWallCabinet />
                                <CrockeryWallCabinet />
                                <MsCubeWallCabinet />
                                <RollingWallCabinet />
                                <SideExposeWallCabiet />
                                <BottomOrBackExposeWall />
                            </>}
                            {cabinetType === "Tall" &&
                                <>
                                <RegularCabinetTall />
                                <CornerCabinetTall />
                                <ThreeFourthTall />
                                <OpenCabinetTall />
                                <CrockeryCabinetTall />
                                <MsCubeTall />
                                <SideExposeTall />
                                <BackExposePanalTall/>
                                </>
                               
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CreateProcess;

