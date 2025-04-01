

import React, { useEffect, useState } from "react";
import ThreeFourthTallCabinet from "./ThreeFourthTallCabinet";
import axios from "axios";





const ThreeFourthTall = ({ handleRecordAddT }) => {
    // Sample data for different items
     const [exposeData, setExposeData] = useState([]);
                         const [exposeDataBottom, setExposeDataBottom] = useState([]);
                          const [exposeDataBack, setExposeDataBack] = useState([]);
     const [selectedRate, setSelectedRate] = useState(0);
    const [shutterType, setShutterType] = useState("");
    const initialItems = [
        { description: "Base Cabinet", width: 950, thick: 900, height: 2100, rate: 15415.23, unit: "MODUL", qty: 1, UNIT: "MODUL", remark: "MARINE PLY" },
        { description: "Shutter 1", width: 350, thick: 18, height: 2100, rate: selectedRate, unit: "SQ/FT", qty: 1, UNIT: "SQ/FT", remark: "MARINE PLY" },
        { description: "Shutter 2", width: 300, thick: 19, height: 2100, rate: selectedRate, unit: "SQ/FT", qty: 1, UNIT: "SQ/FT", remark: "MARINE PLY" },
        { description: "HANGING PATTA", width: 950, thick: 19, height: 100, rate: 471, unit: "SQ/FT", qty: 1, UNIT: "SQ/FT", remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, rate: 400, unit: "Qty", remark: "HETTICH" },
        { description: "Skirting", width: 950, thick: 18, height: 900, rate: 0.66, unit: "SQ/FT", qty: 1, UNIT: "SQ/FT", remark: "MARINE PLY" },
        { description: "Labour Charges", width: 350, height: 600, rate: 100, unit: "SQ/FT" },
    ];

    const [items, setItems] = useState(initialItems);
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
    const Changerateaccordingshutter = (e) => {
        const selectedShutterName = e.target.value;
        setShutterType(selectedShutterName);

        // Find the selected shutter object
        const selectedShutter = shutters.find(shutter => shutter.shutterName.trim() === selectedShutterName);
        const newRate = selectedShutter ? Number(selectedShutter.rate) : 0;
        setSelectedRate(newRate);

        // Update the items state with new shutter type and rate
        setItems(prevItems =>
            prevItems.map(item =>
                item.description.includes("Shutter")
                    ? { ...item, rate: newRate }
                    : item
            )
        );
    };
    const calculateSqFt = (width, height) => (width * height) / 92903.04;

    const calculateTotal = (sqFt, rate, unit, description, width) => {
        if (unit === "Qty") {
            return rate; // Return rate as total for 'Qty' items
        }
        if (description === "Skirting") {
            return width * rate; // Skirting is calculated based on width
        }
        if (description === "Labour Charges") {
            return sqFt * rate; // Labour Charges based on sqFt
        }
        if (description === "Base Cabinet") {
            return rate; // Base Cabinet uses rate directly as total
        }
        if (description === "Legs") {
            return rate; // Return the rate for "Legs" directly
        }
        return sqFt * rate; // Default calculation for other items
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;

        // Update the changed field
        updatedItems[index][field] = newValue;

        // Handle width updates for "Skirting" and "Labour Charges"
        if (field === "width") {
            if (updatedItems[index].description === "Base Cabinet") {
                const skirtingItem = updatedItems.find(item => item.description === "HANGING PATTA");
                if (skirtingItem) {
                    skirtingItem.width = newValue; // Update Skirting width
                }


                const SKIRTINGItem = updatedItems.find(item => item.description === "Skirting");
                if (SKIRTINGItem) {
                    SKIRTINGItem.width = newValue;
                }
            }

            if (updatedItems[index].description === "Shutter 1") {

                const ShelfChargesItem = updatedItems.find(item => item.description === "Labour Charges");
                if (ShelfChargesItem) {
                    ShelfChargesItem.width = newValue;
                }

            }
        }
        if (field === "thick" && updatedItems[index].description === "Base Cabinet") {
            // Update height for SHELF when Base Cabinet thickness changes
            updatedItems.forEach(item => {
                if (item.description === "SHELF") {
                    item.height = newValue;
                }
            });
        }
        if (field === "height" && updatedItems[index].description === "Base Cabinet") {
            updatedItems.forEach(item => {
                if (item.description !== "HANGING PATTA" && item.description !== "SHELF") {
                    item.height = newValue;
                }
            });
        }

        // Recalculate values for all items
        updatedItems.forEach(item => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);
            item.sqFt = sqFt;
            item.total = total;
        });

        setItems(updatedItems);
    };


    const filteredItems = items.filter(
        (item) => !(item.description === "Labour Charges" && (item.width === 0 || item.rate === 0))
    );
    console.log(filteredItems, "filteredItems")
    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);
            return { ...item, sqFt, total };
        });
        setItems(updatedItems);
    }, [selectedRate,shutterType]);

    const grandTotal = filteredItems.reduce((sum, item) => {
        // Convert item.total to a number before adding to the sum
        return sum + (Number(item.total) || 0); // Ensures item.total is a number
    }, 0);



    const handleRateUpdate = (newRate) => {
        // Update the rate of the "Base Cabinet" item
        const updatedItems = [...items];
        const updatedBaseCabinetItem = updatedItems.find(
            (item) => item.description === "Base Cabinet"
        );
        updatedBaseCabinetItem.rate = newRate;

        // Recalculate total for all items after rate update
        updatedItems.forEach((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);
            item.sqFt = sqFt;
            item.total = total;
        });

        setItems(updatedItems);
    };

    return (
        <div className="p-6 ">
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
            <h2 className="mb-4 text-2xl font-bold">3/4TH CORNER CABINET</h2>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>
                        <th className="p-2 border">QTY </th>
                        <th className="p-2 border">UNIT </th>
                        <th className="p-2 border">REMARK </th>
                        <th className="p-2 border">SQ/FT</th>
                        <th className="p-2 border">Rate</th>
                        <th className="p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index} className="bg-white">
                            <td className="p-2 border">
                                {item.description === "Shutter 1" || item.description === "Shutter 2" ? `${shutterType} ${item.description}` : item.description}
                            </td>
                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Labour Charges" && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "width", e.target.value)}
                                        disabled={item.description === "HANGING PATTA" || item.description === "SHELF"} // Disable input for Hanging Patta & Shelf
                                    />
                                )}
                            </td>

                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Labour Charges" && item.description !== "Skirting" && (
                                    <input
                                        type="number"
                                        value={item.thick || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) =>
                                            handleInputChange(index, "thick", e.target.value)
                                        }
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Skirting" && item.description !== "Labour Charges" && (
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) =>
                                            handleInputChange(index, "height", e.target.value)
                                        }
                                        disabled={item.description === "Shutter 1" || item.description === "SHELF" || item.description === "Shutter 2"}
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                {(item.description !== "Labour Charges" && item.description !== "Legs") && (
                                    <input
                                        type="number"
                                        value={item.qty || ""}
                                        disabled
                                        className="w-full p-1 border rounded"
                                        onChange={(e) =>
                                            handleInputChange(index, "qty", e.target.value)
                                        }
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                {item.unit}
                            </td>
                            <td className="p-2 border">
                                {item.remark}
                            </td>
                            <td className="p-2 border">
                                {item.description === "Base Cabinet" || item.description === "Legs"
                                    ? "1"
                                    : item.description === "Skirting"
                                        ? item.width // Show width for Skirting
                                        : item.sqFt > 0
                                            ? item.sqFt.toFixed(2)
                                            : ""}
                            </td>

                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.rate || ""}
                                    disabled
                                    className="w-full p-1 border rounded"
                                    onChange={(e) =>
                                        handleInputChange(index, "rate", e.target.value)
                                    }
                                />
                            </td>
                            <td className="p-2 border">
                                {item.description === "Base Cabinet"
                                    ? item.rate
                                    : item.total > 0
                                        ? item.total.toFixed(2)
                                        : ""}
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-200">
                        <td className="p-2 text-right border" colSpan="9">
                            Grand Total
                        </td>
                        <td className="p-2 border">
                            {grandTotal.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
            {items.find((item) => item.description === "Base Cabinet") && (
                <ThreeFourthTallCabinet
                    width={items.find((item) => item.description === "Base Cabinet").width}
                    thick={items.find((item) => item.description === "Base Cabinet").thick}
                    height={items.find((item) => item.description === "Base Cabinet").height}
                    onRateUpdate={handleRateUpdate}
                    setExposeData={setExposeData}
                    exposeData={exposeData}
                    exposeDataBottom={exposeDataBottom}
                    setExposeDataBottom={setExposeDataBottom}
                    setExposeDataBack={setExposeDataBack}
                    exposeDataBack={exposeDataBack}
                />
            )}

            <div className="mt-5">
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
            </div>
            <div className="flex mt-4 space-x-2">
                <button
                    onClick={() => handleRecordAddT({ shutterType, shutterCost: selectedRate, items: items, grandTotal: grandTotal, SideExpose: exposeData, BottomExpose: exposeDataBottom, BackExpose: exposeDataBack })}
                    className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
                >
                    Record Add
                </button>
            </div>
        </div>
    );
};

export default ThreeFourthTall;
