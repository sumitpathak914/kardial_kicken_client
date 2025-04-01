import { Dialog } from "@headlessui/react";
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
import BackExposePanalTall from "./Tall/BackExposePanalTall";
import CornerCabinetTall from "./Tall/CornerCabinetTall";
import CrockeryCabinetTall from "./Tall/CrockeryCabinetTall";
import MsCubeTall from "./Tall/MsCubeTall";
import OpenCabinetTall from "./Tall/OpenCabinetTall";
import RegularCabinetTall from "./Tall/RegularCabinetTall";
import SideExposeTall from "./Tall/SideExposeTall";
import ThreeFourthTall from "./Tall/ThreeFourthTall";
import BottomOrBackExposeWall from "./wall/BottomOrBackExposeWall";
import CrockeryWallCabinet from "./wall/CrockeryWallCabinet";
import MsCubeWallCabinet from "./wall/MsCubeWallCabinet";
import OpenWallCabinet from "./wall/OpenWallCabinet";
import RollingWallCabinet from "./wall/RollingWallCabinet";
import SideExposeWallCabiet from "./wall/SideExposeWallCabiet";
import ThreeFourthCornerCabinet from "./wall/ThreeFourthCornerCabinet";
import WallCornerCabinet from "./wall/WallCornerCabinet";
import WallRegularCabinet from "./wall/WallRegularcabinet";

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

    const [selectedB, setSelectedB] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCabinets, setSelectedCabinets] = useState({});
    const [selectedCabinetsw, setSelectedCabinetsw] = useState({});
    const [selectedCabinetsT, setSelectedCabinetsT] = useState({});
    console.log(selectedCabinetsw, "selectedCabinetsw")
    const [tempSelection, setTempSelection] = useState([]);
    console.log(tempSelection, "tempSelection")
    console.log(selectedCabinets, "selectedCabinets")

    const [selectedW, setSelectedW] = useState("");

    const [isOpenwall, setIsOpenWall] = useState(false);

    const [tempSelectionwall, setTempSelectionwall] = useState([]);
    console.log(tempSelectionwall, "tempSelectionwall")


    const [selectedT, setSelectedT] = useState("");

    const [isOpenTall, setIsOpenTall] = useState(false);

    const [tempSelectionTall, setTempSelectionTall] = useState([]);

    const [showWall, setShowWall] = useState(false);
    const [showTall, setShowTall] = useState(false);
    const [isOpenOverview, setIsOpenOverview] = useState(false);
    const handleSelectB = (event) => {
        setSelectedB(event.target.value);
        setTempSelection(selectedCabinets[event.target.value] || []);
        setIsOpen(true);
    };

    // Handle cabinet selection
    const toggleCabinet = (cabinet) => {
        setTempSelection((prev) =>
            prev.includes(cabinet) ? prev.filter((c) => c !== cabinet) : [...prev, cabinet]
        );
    };

    // Save selected cabinets and close modal
    const handleSave = () => {
        setSelectedCabinets((prev) => ({ ...prev, [selectedB]: tempSelection }));
        setIsOpen(false);
    };


    const handleSelectW = (event) => {
        setSelectedW(event.target.value);
        setTempSelectionwall(selectedCabinetsw[event.target.value] || []);
        setIsOpenWall(true);
    };

    // Handle cabinet selection
    const toggleCabinetW = (cabinet) => {
        setTempSelectionwall((prev) =>
            prev.includes(cabinet) ? prev.filter((c) => c !== cabinet) : [...prev, cabinet]
        );
    };

    // Save selected cabinets and close modal
    const handleSaveW = () => {
        setSelectedCabinetsw((prev) => ({ ...prev, [selectedW]: tempSelectionwall }));
        setIsOpenWall(false);
    };



    const handleSelectT = (event) => {
        setSelectedT(event.target.value);
        setTempSelectionTall(selectedCabinetsT[event.target.value] || []);
        setIsOpenTall(true);
    };

    // Handle cabinet selection
    const toggleCabinetT = (cabinet) => {
        setTempSelectionTall((prev) =>
            prev.includes(cabinet) ? prev.filter((c) => c !== cabinet) : [...prev, cabinet]
        );
    };

    // Save selected cabinets and close modal
    const handleSaveT = () => {
        setSelectedCabinetsT((prev) => ({ ...prev, [selectedT]: tempSelectionTall }));
        setIsOpenTall(false);
    };
    const handleInputChangestep2 = (e) => {
        const { name, value } = e.target;
        setFormDatastep2({ ...formData, [name]: value });
    };

    const handleFormSubmitstep2 = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };
    const navigate = useNavigate();
    const cabinetOptions = [
        "CabinetCalculator",
        "Cornercabinate",
        "CornerCabinateThreeFourth",
        "OpenCabinate",
        "Crockerycabinter",
        "Mscubecabinate",
        // "SideExpose",
        // "BackExposePanal",
    ];

    const cabinetOptionsForWall = [
        "WallRegularCabinet",
        "WallCornerCabinet",
        "ThreeFourthCornerCabinet",
        "OpenWallCabinet",
        "CrockeryWallCabinet",
        "MsCubeWallCabinet",
        "RollingWallCabinet",
        // "SideExposeWallCabiet",
        // "BottomOrBackExposeWall",
    ];
    const cabinetOptionsForTall = [
        "RegularCabinetTall",
        "CornerCabinetTall",
        "ThreeFourthTall",
        "OpenCabinetTall",
        "CrockeryCabinetTall",
        "MsCubeTall",
        // "RollingWallCabinet",
        // "SideExposeTall",
        // "BackExposePanalTall",
    ];

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
  

    const handleRecordAdd = (data) => {
        debugger
        if (selectedB && tempSelection.length > 0) {
            setSelectedCabinets((prev) => ({
                ...prev,
                [selectedB]: [...tempSelection, data], // Store the shutter type and cost
            }));
            setTempSelection([]); // Reset temp selection after adding
        }
    };
    const handleRecordAddW = (data) => {
        debugger
        if (selectedW && tempSelectionwall.length > 0) {
            setSelectedCabinetsw((prev) => ({
                ...prev,
                [selectedW]: [...tempSelectionwall,data], // Only update when confirmed
            }));
            setTempSelectionwall([]); // Reset temp selection after adding
        }
    };
    const handleRecordAddT = (data) => {
        debugger
        if (selectedT && tempSelectionTall.length > 0) {
            setSelectedCabinetsT((prev) => ({
                ...prev,
                [selectedT]: [...tempSelectionTall, data], // Only update when confirmed
            }));
            setTempSelectionTall([]); // Reset temp selection after adding
        }
    };
    // Remove selected cabinet type
    const handleCancel = () => {
        setSelectedCabinets((prev) => {
            const newCabinets = { ...prev };
            delete newCabinets[selectedB];
            return newCabinets;
        });
        setTempSelection([]); // Clear temp selection
        setSelectedB(""); // Reset selection
    };

    const handleCancelW = () => {
        setSelectedCabinetsw((prev) => {
            const newCabinets = { ...prev };
            delete newCabinets[selectedW];
            return newCabinets;
        });
        setTempSelectionwall([]); // Clear temp selection
        setSelectedW(""); // Reset selection
    };

    const handleCancelT = () => {
        setSelectedCabinetsT((prev) => {
            const newCabinets = { ...prev };
            delete newCabinets[selectedT];
            return newCabinets;
        });
        setTempSelectionTall([]);
        setSelectedT("");
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






                        {baseMaterial && (
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
                                <label classNeame="block font-semibold">Select Handle Type:</label>
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
                        <div className='flex justify-end'>
                            <button
                                className="px-4 py-2 text-white bg-gray-500 rounded"
                                onClick={() => setIsOpenOverview(true)}
                            >
                                Overview
                            </button>
                        </div>

                        <div className="flex justify-around gap-5 p-4 mt-4 bg-white border rounded">

                            <div>
                                <p>Base Cabinet</p>
                                <select value={selectedB} onChange={handleSelectB} className="p-2 border rounded">
                                    <option value="">Select Cabinet Type</option>
                                    {[...Array(100)].map((_, index) => (
                                        <option key={index} value={`B${index + 1}`}>
                                            B{index + 1}
                                        </option>
                                    ))}
                                </select>



                                <div className="flex gap-3 mt-4">

                                    <button onClick={() => setShowWall(true)} className="px-4 py-2 text-white bg-blue-500 rounded">
                                        Done
                                    </button>
                                </div>

                                {/* Modal */}
                                {isOpen && (
                                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="p-6 bg-white rounded shadow-lg w-96">
                                            <h2 className="text-lg font-semibold">Select Cabinets for {selectedB}</h2>
                                            <div className="mt-4 space-y-2">
                                                {cabinetOptions.map((cabinet) => (
                                                    <label key={cabinet} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={tempSelection.includes(cabinet)}
                                                            onChange={() => toggleCabinet(cabinet)}
                                                        />
                                                        <span>{cabinet}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="flex justify-end mt-4 space-x-2">
                                                <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                                                <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-500 rounded">OK</button>
                                            </div>
                                        </div>
                                    </Dialog>
                                )}
                            </div>

                            {showWall && (
                                <div>
                                    <p>Wall Cabinet</p>
                                    <select value={selectedW} onChange={handleSelectW} className="p-2 border rounded">
                                        <option value="">Select Cabinet Type</option>
                                        {[...Array(100)].map((_, index) => (
                                            <option key={index} value={`W${index + 1}`}>
                                                W{index + 1}
                                            </option>
                                        ))}
                                    </select>


                                    <div className="flex gap-3 mt-4">

                                        <button onClick={() => setShowTall(true)} className="px-4 py-2 text-white bg-blue-500 rounded">
                                            Done
                                        </button>
                                    </div>
                                    {/* Modal */}
                                    {isOpenwall && (
                                        <Dialog open={isOpenwall} onClose={() => isOpenwall(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="p-6 bg-white rounded shadow-lg w-96">
                                                <h2 className="text-lg font-semibold">Select Cabinets for {selectedW}</h2>
                                                <div className="mt-4 space-y-2">
                                                    {cabinetOptionsForWall.map((cabinet) => (
                                                        <label key={cabinet} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={tempSelectionwall.includes(cabinet)}
                                                                onChange={() => toggleCabinetW(cabinet)}
                                                            />
                                                            <span>{cabinet}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                <div className="flex justify-end mt-4 space-x-2">
                                                    <button onClick={() => setIsOpenWall(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                                                    <button onClick={handleSaveW} className="px-4 py-2 text-white bg-blue-500 rounded">OK</button>
                                                </div>
                                            </div>
                                        </Dialog>
                                    )}
                                </div>
                            )}
                            {showTall && (
                                <div>
                                    <p>Tall Cabinet</p>
                                    <select value={selectedT} onChange={handleSelectT} className="p-2 border rounded">
                                        <option value="">Select Cabinet Type</option>
                                        {[...Array(100)].map((_, index) => (
                                            <option key={index} value={`B${index + 1}`}>
                                                T{index + 1}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Selected Cabinets Display */}

                                    <div className="flex gap-3 mt-4">

                                        <button className="px-4 py-2 text-white bg-green-500 rounded">Finalize</button>
                                    </div>
                                    {/* Modal */}
                                    {isOpenTall && (
                                        <Dialog open={isOpenTall} onClose={() => setIsOpenTall(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="p-6 bg-white rounded shadow-lg w-96">
                                                <h2 className="text-lg font-semibold">Select Cabinets for {selectedT}</h2>
                                                <div className="mt-4 space-y-2">
                                                    {cabinetOptionsForTall.map((cabinet) => (
                                                        <label key={cabinet} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={tempSelectionTall.includes(cabinet)}
                                                                onChange={() => toggleCabinetT(cabinet)}
                                                            />
                                                            <span>{cabinet}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                <div className="flex justify-end mt-4 space-x-2">
                                                    <button onClick={() => setIsOpenTall(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                                                    <button onClick={handleSaveT} className="px-4 py-2 text-white bg-blue-500 rounded">OK</button>
                                                </div>
                                            </div>
                                        </Dialog>
                                    )}
                                </div>
                            )}

                        </div>

                        <div className="p-4 mt-4 bg-white border rounded">
                            {
                                selectedB &&
                                selectedCabinets[selectedB]?.length > 0 &&
                                tempSelection.length > 0 && (  // Ensure tempSelection is not empty
                                    <>

                                        {tempSelection.includes("CabinetCalculator") && <CabinetCalculator handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("Cornercabinate") && <Cornercabinate handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("CornerCabinateThreeFourth") && <CornerCabinateThreeFourth handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("OpenCabinate") && <OpenCabinate handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("Crockerycabinter") && <Crockerycabinter handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("Mscubecabinate") && <Mscubecabinate handleRecordAdd={handleRecordAdd} />}

                                        {tempSelection.includes("SideExpose") && <SideExpose handleRecordAdd={handleRecordAdd} />}
                                        {tempSelection.includes("BackExposePanal") && <BackExposePanal handleRecordAdd={handleRecordAdd} />}

                                        {/* <div className="flex mt-4 space-x-2">
                                            <button onClick={handleRecordAdd} className="px-4 py-2 mt-4 text-white bg-green-500 rounded">
                                                Record Add
                                            </button>
                                            <button onClick={handleCancel} className="px-4 py-2 text-white bg-red-500 rounded">
                                                Cancel
                                            </button>
                                        </div> */}
                                    </>
                                )}
                            {
                                selectedW &&
                                selectedCabinetsw[selectedW]?.length > 0 &&
                                tempSelectionwall.length > 0 && (  // Ensure tempSelection is not empty
                                    <>

                                        {tempSelectionwall.includes("WallRegularCabinet") && <WallRegularCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("WallCornerCabinet") && <WallCornerCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("ThreeFourthCornerCabinet") && <ThreeFourthCornerCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("OpenWallCabinet") && <OpenWallCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("CrockeryWallCabinet") && <CrockeryWallCabinet handleRecordAddW={handleRecordAddW}  />}
                                        {tempSelectionwall.includes("MsCubeWallCabinet") && <MsCubeWallCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("RollingWallCabinet") && <RollingWallCabinet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("SideExposeWallCabiet") && <SideExposeWallCabiet handleRecordAddW={handleRecordAddW} />}
                                        {tempSelectionwall.includes("BottomOrBackExposeWall") && <BottomOrBackExposeWall handleRecordAddW={handleRecordAddW} />}

                                        {/* <div className="flex mt-4 space-x-2">
                                            <button onClick={handleRecordAddW} className="px-4 py-2 mt-4 text-white bg-green-500 rounded">
                                                Record Add
                                            </button>
                                            <button onClick={handleCancelW} className="px-4 py-2 text-white bg-red-500 rounded">
                                                Cancel
                                            </button>
                                        </div> */}
                                    </>
                                )}


                            {
                                selectedT &&
                                selectedCabinetsT[selectedT]?.length > 0 &&
                                tempSelectionTall.length > 0 && (  // Ensure tempSelection is not empty
                                    <>

                                        {tempSelectionTall.includes("RegularCabinetTall") && <RegularCabinetTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("CornerCabinetTall") && <CornerCabinetTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("ThreeFourthTall") && <ThreeFourthTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("OpenCabinetTall") && <OpenCabinetTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("CrockeryCabinetTall") && <CrockeryCabinetTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("MsCubeTall") && <MsCubeTall handleRecordAddT={handleRecordAddT} />}
                                        {/* {tempSelectionTall.includes("RollingWallCabinet") && <RollingWallCabinet />} */}
                                        {tempSelectionTall.includes("SideExposeTall") && <SideExposeTall handleRecordAddT={handleRecordAddT} />}
                                        {tempSelectionTall.includes("BackExposePanalTall") && <BackExposePanalTall handleRecordAddT={handleRecordAddT} />}

                                        {/* <div className="flex mt-4 space-x-2">
                                            <button onClick={handleRecordAddT} className="px-4 py-2 mt-4 text-white bg-green-500 rounded">
                                                Record Add
                                            </button>
                                            <button onClick={handleCancelT} className="px-4 py-2 text-white bg-red-500 rounded">
                                                Cancel
                                            </button>
                                        </div> */}
                                    </>
                                )}


                        </div>
                        {isOpenOverview && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="w-full h-[800px] max-w-5xl p-6 overflow-auto bg-white rounded-lg shadow-xl">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                                        <button
                                            className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
                                            onClick={() => setIsOpenOverview(false)}
                                        >
                                            Close
                                        </button>
                                    </div>

                                    {/* Section - Base Cabinet */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-xl font-semibold text-gray-700">🛠 Base Cabinet</h3>
                                        {Object.entries(selectedCabinets).map(([b, cabinets]) => {
                                            const firstCabinet = cabinets[1];
                                            const firstItem = firstCabinet?.items?.[0];
                                            console.log(firstCabinet, "firstCabinet")
                                            console.log(firstItem, "firstItem")
                                            return (
                                                <div key={b} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
                                                    <p className="font-semibold text-blue-500">{b} Selected Cabinets:</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                                        <span className="text-lg font-bold text-gray-800">{cabinets[0]}</span>
                                                        {firstCabinet?.shutterType && (
                                                            <span className="font-medium text-gray-600">| Shutter: {firstCabinet.shutterType}</span>
                                                        )}
                                                        {firstItem && (
                                                            <span className="font-medium text-gray-600">
                                                                | Size: Width {firstItem.width}, Thick {firstItem.thick}, Height {firstItem.height}
                                                            </span>
                                                        )}
                                                        {firstCabinet?.grandTotal && (
                                                            <span className="font-semibold text-gray-800">
                                                                | Total: ₹{firstCabinet.grandTotal.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>


                                                    {firstCabinet?.SideExpose && firstCabinet.SideExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Side Expose</span>
                                                            {firstCabinet?.SideExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Side
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: height {value.height}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}

                                                          
                                                        </div>
                                                    )}

                                                    {firstCabinet?.BottomExpose && firstCabinet.BottomExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BottomExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Bottom
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}

                                                           
                                                        </div>
                                                    )}

                                                    {firstCabinet?.BackExpose && firstCabinet.BackExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BackExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Back
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, height {value.height}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}

                                                  
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Section - Wall Cabinet */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-xl font-semibold text-gray-700">📌 Wall Cabinet</h3>
                                        {Object.entries(selectedCabinetsw).map(([b, cabinets]) => {
                                            const firstCabinet = cabinets[1];
                                            const firstItem = firstCabinet?.items?.[0];

                                            return (
                                                <div key={b} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
                                                    <p className="font-semibold text-blue-500">{b} Selected Cabinets:</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                                        <span className="text-lg font-bold text-gray-800">{cabinets[0]}</span>
                                                        {firstCabinet?.shutterType && (
                                                            <span className="font-medium text-gray-600">| Shutter: {firstCabinet.shutterType}</span>
                                                        )}
                                                        {firstItem && (
                                                            <span className="font-medium text-gray-600">
                                                                | Size: Width {firstItem.width}, Thick {firstItem.thick}, Height {firstItem.height}
                                                            </span>
                                                        )}
                                                        {firstCabinet?.grandTotal && (
                                                            <span className="font-semibold text-gray-800">
                                                                | Total: ₹{firstCabinet.grandTotal.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {firstCabinet?.SideExpose && firstCabinet.SideExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Side Expose</span>
                                                            {firstCabinet?.SideExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Side
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: height {value.height}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}

                                                    {firstCabinet?.BottomExpose && firstCabinet.BottomExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BottomExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Bottom
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}
                                                    {firstCabinet?.BackExpose && firstCabinet.BackExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BackExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Back
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, height {value.height}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}
                                                   
                                                </div>


                                                
                                            );
                                        })}
                                    </div>

                                    {/* Section - Tall Cabinet */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-xl font-semibold text-gray-700">📏 Tall Cabinet</h3>
                                        {Object.entries(selectedCabinetsT).map(([b, cabinets]) => {
                                            const firstCabinet = cabinets[1];
                                            const firstItem = firstCabinet?.items?.[0];

                                            return (
                                                <div key={b} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
                                                    <p className="font-semibold text-blue-500">{b} Selected Cabinets:</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                                        <span className="text-lg font-bold text-gray-800">{cabinets[0]}</span>
                                                        {firstCabinet?.shutterType && (
                                                            <span className="font-medium text-gray-600">| Shutter: {firstCabinet.shutterType}</span>
                                                        )}
                                                        {firstItem && (
                                                            <span className="font-medium text-gray-600">
                                                                | Size: Width {firstItem.width}, Thick {firstItem.thick}, Height {firstItem.height}
                                                            </span>
                                                        )}
                                                        {firstCabinet?.grandTotal && (
                                                            <span className="font-semibold text-gray-800">
                                                                | Total: ₹{firstCabinet.grandTotal.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {firstCabinet?.SideExpose && firstCabinet.SideExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Side Expose</span>
                                                            {firstCabinet?.SideExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Side
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: height {value.height}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}

                                                    {firstCabinet?.BottomExpose && firstCabinet.BottomExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BottomExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Bottom
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, thick {value.thick}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}

                                                    {firstCabinet?.BackExpose && firstCabinet.BackExpose.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-4 mt-2">
                                                            <span className="text-lg font-bold text-gray-800">Bottom Expose</span>
                                                            {firstCabinet?.BackExpose?.map((value, index) => (
                                                                <React.Fragment key={index}>
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | ExpossType: Back
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Size: width {value.width}, height {value.height}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | Sq Foot:  {value.sqFoot.toFixed(2)}
                                                                        </span>
                                                                    )}
                                                                    {value && (
                                                                        <span className="font-medium text-gray-600">
                                                                            | total:  {value.total}
                                                                        </span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}


                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Close Button */}
                                    <div className="flex justify-center">
                                        <button
                                            className="px-5 py-2 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
                                            onClick={() => setIsOpenOverview(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>


                )
            }
        </div>
    );
};

export default CreateProcess;

