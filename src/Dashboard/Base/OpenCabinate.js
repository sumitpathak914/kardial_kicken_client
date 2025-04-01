import axios from "axios";
import React, { useEffect, useState } from "react";
import OpenCabinetCalculatorBase from "./OpenCabinetCalculatorBase";

const OpenCabinate = ({ handleRecordAdd }) => {

    const [exposeData, setExposeData] = useState([]);
    const [exposeDataBottom, setExposeDataBottom] = useState([]);
    const [exposeDataBack, setExposeDataBack] = useState([]);
    const [selectedRate, setSelectedRate] = useState(null);
    console.log(selectedRate, "selectedRate")
    const fixedCabinetSize = { width: 600, height: 770, thickness: 400 }; // Fixed size for the cabinet
    const initialItems = [
        { description: "TOP/BOTTOM", width: fixedCabinetSize.width, height: fixedCabinetSize.thickness, thickness: fixedCabinetSize.thickness, rate: selectedRate, unit: "MODUL", QTY: 2, thick: 18, remark: "MARINE PLY" },
        { description: "SIDE", width: fixedCabinetSize.thickness, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: selectedRate, unit: "SQ/FT", QTY: 2, thick: 18, remark: "MARINE PLY" },
        { description: "BACK", width: fixedCabinetSize.width, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: selectedRate, unit: "SQ/FT", QTY: 1, thick: 18, remark: "MARINE PLY" },
        { description: "SHELF", width: fixedCabinetSize.width, height: fixedCabinetSize.thickness, thickness: fixedCabinetSize.thickness, rate: selectedRate, unit: "SQ/FT", QTY: 1, thick: 20, remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, thickness: 0, rate: 400, unit: "Qty", QTY: 1, remark: "HETTICH" },
        { description: "Skirting", width: fixedCabinetSize.width, height: 1, thickness: fixedCabinetSize.thickness, rate: 0.66, unit: "SQ/FT", remark: "MARINE PLY", QTY: 1, },
        { description: "Labour Charges", width: fixedCabinetSize.width, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: 100, unit: "SQ/FT", },
    ];

    const [cabinetSize, setCabinetSize] = useState(fixedCabinetSize);
    const [items, setItems] = useState(initialItems);
    console.log(items, "items")
    const [shutterType, setShutterType] = useState("");
    const calculateSqFt = (width, height, qty) => (width * height) / 92903.04 * qty;

    const [shutters, setShutters] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5050/shutters/list")
            .then((response) => {
                setShutters(response.data);
            })
            .catch((error) => {
                console.error("Error fetching shutters:", error);
            });
    }, []);
    const calculateTotal = (sqFt, rate, unit, description, width, qty) => {
        if (unit === "Qty") return rate * qty; // This handles "Legs" correctly
        if (description === "Skirting") return width * rate; // This handles "Skirting" correctly
        return sqFt * rate; // Default calculation for others
    };



    const handleCabinetSizeChange = (field, value) => {
        const newValue = parseFloat(value) || 0;
        setCabinetSize((prevSize) => {
            const updatedSize = { ...prevSize, [field]: newValue };
            updateItemDimensions(updatedSize);
            return updatedSize;
        });
    };

    const updateItemDimensions = (size) => {
        setItems((prevItems) => {
            let topBottomSqFt = 0;
            let sideSqFt = 0;
            let shelfSqFt = 0;

            const updatedItems = prevItems.map((item) => {
                if (["TOP/BOTTOM", "BACK", "SHELF", "Skirting"].includes(item.description)) {
                    item.width = size.width;
                    item.thickness = size.thickness;
                }

                if (item.description === "SIDE" || item.description === "BACK") {
                    item.height = size.height;
                    item.thickness = size.thickness;
                }

                if (item.description === "TOP/BOTTOM" || item.description === "SHELF") {
                    item.height = size.thickness;
                }

                if (item.description === "SIDE") {
                    item.width = size.thickness;
                }

                item.sqFt = calculateSqFt(item.width, item.height, item.QTY);
                item.total = calculateTotal(item.sqFt, item.rate, item.unit, item.description, item.width, item.QTY);

                // Store SQ/FT for Labour Charges calculation
                if (item.description === "TOP/BOTTOM") topBottomSqFt += item.sqFt;
                if (item.description === "SIDE") sideSqFt += item.sqFt;
                if (item.description === "SHELF") shelfSqFt += item.sqFt;

                return { ...item };
            });

            // Find and update Labour Charges
            return updatedItems.map((item) => {
                if (item.description === "Labour Charges") {
                    item.sqFt = topBottomSqFt + sideSqFt + shelfSqFt; // Sum of these parts
                    item.total = calculateTotal(item.sqFt, item.rate, item.unit, item.description, item.width, item.QTY);
                }
                return { ...item };
            });
        });
    };


    const handleDimensionChange = (dimension, value, index) => {
        const newValue = parseFloat(value) || 0;
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index][dimension] = newValue;
            updatedItems[index].sqFt = calculateSqFt(updatedItems[index].width, updatedItems[index].height, updatedItems[index].QTY);
            updatedItems[index].total = calculateTotal(
                updatedItems[index].sqFt,
                updatedItems[index].rate,
                updatedItems[index].unit,
                updatedItems[index].description,
                updatedItems[index].width,
                updatedItems[index].QTY
            );
            return updatedItems;
        });
    };

    useEffect(() => {
        updateItemDimensions(cabinetSize);
    }, [selectedRate, shutterType]);

    const grandTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const handleRateChange = (e, description) => {
        const newRate = parseFloat(e.target.value) || 0;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.description === description
                    ? { ...item, rate: newRate, total: calculateTotal(item.sqFt, newRate, item.unit, item.description, item.width, item.QTY) }
                    : item
            )
        );
    };
    const Changerateaccordingshutter = (e) => {
        const selectedShutterName = e.target.value;
        setShutterType(selectedShutterName);

        // Find the selected shutter object
        const selectedShutter = shutters.find(shutter => shutter.shutterName.trim() === selectedShutterName);
        const newRate = selectedShutter ? Number(selectedShutter.rate) : 0;
        setSelectedRate(newRate);
    };

    useEffect(() => {
        // Update rate for all items dynamically when selectedRate changes
        setItems((prevItems) =>
            prevItems.map(item =>
                ["TOP/BOTTOM", "SIDE", "BACK", "SHELF"].includes(item.description)
                    ? { ...item, rate: selectedRate, total: calculateTotal(item.sqFt, selectedRate, item.unit, item.description, item.width, item.QTY) }
                    : item
            )
        );
    }, [selectedRate]);
    return (
        <div className="p-6">
            <div className="mb-4">
                <label className="block font-semibold">Select Shutter Type:</label>
                <select
                    className="w-full p-2 border rounded"
                    value={shutterType}
                    onChange={Changerateaccordingshutter}
                >
                    <option value="">Select</option>
                    {shutters.map((shutter) => (
                        <option key={shutter.id} value={shutter.shutterName.trim()}>
                            {shutter.shutterName}
                        </option>
                    ))}
                </select>
            </div>
            <h2 className="mb-4 text-2xl font-bold">OPEN CABINET</h2>
            <div className="flex gap-4 mb-4">
                <label>
                    Cabinet Width:
                    <input
                        type="number"
                        value={cabinetSize.width || ""}
                        className="p-1 ml-2 border rounded"
                        onChange={(e) => handleCabinetSizeChange("width", e.target.value)}
                    />
                </label>
                <label>
                    Cabinet Height:
                    <input
                        type="number"
                        value={cabinetSize.height || ""}
                        className="p-1 ml-2 border rounded"
                        onChange={(e) => handleCabinetSizeChange("height", e.target.value)}
                    />
                </label>
                <label>
                    Cabinet Thickness:
                    <input
                        type="number"
                        value={cabinetSize.thickness || ""}
                        className="p-1 ml-2 border rounded"
                        onChange={(e) => handleCabinetSizeChange("thickness", e.target.value)}
                    />
                </label>
            </div>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>

                        <th className="p-2 border">UNIT</th>
                        <th className="p-2 border">Remark</th>
                        <th className="p-2 border">QTY</th>
                        <th className="p-2 border">SQ/FT</th>
                        <th className="p-2 border">Rate</th>
                        <th className="p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="bg-white">
                            <td className="p-2 border">{item.description}</td>
                            <td className="p-2 border">
                                {
                                    item.description !== "Legs" && (
                                        <>
                                            {item.width}
                                        </>
                                    )
                                }

                            </td>
                            <td className="p-2 border">
                                {
                                    item.description !== "Legs" && (
                                        <>
                                            {item.thick}
                                        </>
                                    )
                                }

                            </td>
                            <td className="p-2 border">
                                {
                                    item.description !== "Legs" && (
                                        <>
                                            {item.height}
                                        </>
                                    )
                                }

                            </td>
                            <td className="p-2 border">

                                {item.unit}
                            </td>
                            <td className="p-2 border">
                                {item.remark}
                            </td>
                            <td className="p-2 border">
                                {item.description !== "Legs" && item.description !== "Skirting" && item.description !== "Labour Charges" ? (
                                    <input
                                        type="number"
                                        value={item.QTY}
                                        disabled
                                        className="p-1 border rounded"
                                        onChange={(e) => handleDimensionChange("QTY", e.target.value, index)}
                                    />
                                ) : (
                                    null
                                )}
                            </td>
                            <td className="p-2 border">
                                {item.description === "Skirting" ? item.width : item.sqFt > 0 ? item.sqFt.toFixed(2) : ""}
                                {item.description === 'Legs' && (
                                    <>
                                        1
                                    </>
                                )}
                            </td>

                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => handleRateChange(e, item.description)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>

                            <td className="p-2 border">{item.total > 0 ? item.total.toFixed(2) : ""}</td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-200">
                        <td className="p-2 text-right border" colSpan="9">
                            Grand Total
                        </td>
                        <td className="p-2 border">{grandTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <OpenCabinetCalculatorBase
                setExposeData={setExposeData}
                exposeData={exposeData}
                exposeDataBottom={exposeDataBottom}
                setExposeDataBottom={setExposeDataBottom}
                setExposeDataBack={setExposeDataBack}
                exposeDataBack={exposeDataBack}
            />
            {exposeData.length > 0 && (
                <div className="flex items-center gap-2 mt-5">
                    <p className="font-semibold text-green-600">Side Expose Added</p>
                    {/* <button onClick={() => clearExposeData("side")} className="px-2 py-1 text-white bg-red-500 rounded">
                        Delete
                    </button> */}
                </div>
            )}

            {exposeDataBottom.length > 0 && (
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-green-600">Bottom Expose Added</p>
                    {/* <button onClick={() => clearExposeData("bottom")} className="px-2 py-1 text-white bg-red-500 rounded">
                        Delete
                    </button> */}
                </div>
            )}

            {exposeDataBack.length > 0 && (
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-green-600">Back Data Expose</p>
                    {/* <button onClick={() => clearExposeData("back")} className="px-2 py-1 text-white bg-red-500 rounded">
                        Delete
                    </button> */}
                </div>
            )}
            <button
                onClick={() => handleRecordAdd({ shutterType, shutterCost: selectedRate, items: items, grandTotal: grandTotal, SideExpose: exposeData, BottomExpose: exposeDataBottom, BackExpose: exposeDataBack })}
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
            >
                Record Add
            </button>
        </div>
    );
};

export default OpenCabinate;
