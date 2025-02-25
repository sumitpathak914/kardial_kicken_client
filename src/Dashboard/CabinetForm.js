import React, { useState } from "react";

const CabinetForm = () => {
    const [formData, setFormData] = useState({
        cabinetType: "",
        subCabinetType: "",
        additionalInfo: "",
        records: [],
        unit: "",
       
    });
    console.log(formData, "formdata");
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const addRecord = () => {
        const newRecord = {
            width: "",
            thickness: "",
            height: "",
            qty: 1,
            component: "side", // default component
            type: formData.cabinetType,
            subType: formData.subCabinetType,
            unit: formData.unit
        };

        setFormData((prevData) => ({
            ...prevData,
            records: [...prevData.records, newRecord],
        }));
    };

    const updateRecord = (index, field, value) => {
        const updatedRecords = [...formData.records];
        updatedRecords[index][field] = value;
        setFormData((prevData) => ({ ...prevData, records: updatedRecords }));
    };

    const calculateVolume = (record) => {
        const { width, thickness, height, qty } = record;
        if (width && thickness && height && qty) {
            return (width * thickness * height * qty) / 92900; // Replace 92900 with your calculation divisor
        }
        return 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Final Data:", formData);
        // Submit logic here
    };

    return (
        <form onSubmit={handleFormSubmit} className="p-6 bg-white rounded-lg shadow-md">
            {/* Cabinet Type Selection */}
            <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Select Cabinet Type</label>
                <select
                    name="cabinetType"
                    value={formData.cabinetType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                >
                    <option value="">Select Cabinet Type</option> {/* Add this default option */}
                    <option value="baseCabinet">Base Cabinet</option>
                    <option value="wallCabinet">Wall Cabinet</option>
                    <option value="tallCabinet">Tall Cabinet</option>
                </select>

            </div>

            {/* Sub-Cabinet Type */}
            {formData.cabinetType === "baseCabinet" && (
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Select Sub-Cabinet Type</label>
                    <select
                        name="subCabinetType"
                        value={formData.subCabinetType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                    >
                        <option value="">Select Sub-Cabinet Type</option>
                        <option value="regularCabinet">Regular Cabinet</option>
                        <option value="cornerCabinet">Corner Cabinet</option>
                        <option value="threeQuarterCornerCabinet">3/4th Corner Cabinet</option>
                        <option value="openCabinet">Open Cabinet</option>
                        <option value="crockeryCabinet">Crockery Cabinet</option>
                        <option value="msCube">MS Cube</option>
                        <option value="sideExpose">Side Expose</option>
                        <option value="backExposePanel">Back Expose Panel</option>
                    </select>
                </div>
            )}
           
            <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Unit</label>
                <input
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows="6"
                    placeholder="Enter unit here..."
                />
            </div>
            {/* Additional Information */}
            <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Remark</label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows="6"
                    placeholder="Enter additional details here..."
                />
            </div>

            {/* Add Record Button */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={addRecord}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Add Component
                </button>
            </div>

            {/* Records List */}
            {formData.records.map((record, index) => (
                formData.cabinetType === "baseCabinet" && record.subType === "regularCabinet" && (
                    <div key={index} className="p-6 mb-6 bg-white border-2 rounded-lg shadow-lg">
                      
                        {[
                            { title: "BASE CABINET", fields: ["width", "thickness", "height", "qty","remark"] },
                            { title: "ACRYLIC SHUTTER", fields: ["width", "thickness", "height", "qty","remark"] },
                            { title: "LEG", fields: ["qty","remark"] },
                            { title: "SKIRTING", fields: ["width", "thickness", "height", "qty","remark"] }
                        ].map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4">
                                <div className="mb-2 text-lg font-semibold text-gray-700">{section.title}</div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {section.fields.map((field, fieldIndex) => (
                                        <InputField
                                            key={fieldIndex}
                                            label={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize field name
                                            value={record[field]}
                                            onChange={(e) => updateRecord(index, field, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Labour Charges */}
                        <div className="mb-4">
                            <div className="mb-2 text-lg font-semibold text-gray-700">LABOUR CHARGES</div>
                            <div className="flex gap-4 text-gray-600">
                                <p className="font-medium">SQ/FT</p>
                                <p>5.0</p>
                                <p>100</p>
                            </div>
                        </div>

                        {/* Calculated Volume */}
                        <div className="text-lg font-semibold text-gray-700">
                            Calculated Volume: <span className="font-bold text-blue-500">{calculateVolume(record).toFixed(2)}</span>
                        </div>
                    </div>
                )
            ))}


           


            {/* Submit Button */}
            <button
                type="submit"
                className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
                Submit
            </button>
        </form>
    );
};
const InputField = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
        <input
            type="number"
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${label}`}
            required
        />
    </div>
);

export default CabinetForm;
