import React, { useState, useEffect } from "react";
import CrockeryCabinetCalculator from "./CrockeryCabinetCalculator";
import axios from "axios";

const Crockerycabinter = ({ handleRecordAdd }) => {
    const [selectedRate, setSelectedRate] = useState(0);
    const [exposeData, setExposeData] = useState([]);
        const [exposeDataBottom, setExposeDataBottom] = useState([]);
        const [exposeDataBack, setExposeDataBack] = useState([]);
    // Sample data for different items
    const initialItems = [
        { description: "Base Cabinet", width: 600, thick: 600, height: 770, rate: 11993, unit: "MODUL", sqFt: 0, qty: 1, total: 0, remark:"MARINE PLY"},
        { description: "Shutter", width: 600, thick: 18, height: 770, rate: selectedRate, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, rate: 400, unit: "set", sqFt: 0, qty: 1, total: 0, remark: "HETTICH" },
        { description: "Skirting", width: 600, height: 1, rate: 0.66, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "Labour Charges", width: 600, height: 770, rate: 100, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0 },
    ];
 const [shutters, setShutters] = useState([]);
    const [items, setItems] = useState(initialItems);
    const [grandTotal, setGrandTotal] = useState(0);
 const [shutterType, setShutterType] = useState("");
    // Function to calculate square feet

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

    // Function to calculate total cost for each item
    const calculateTotal = (sqFt, rate, unit, description, width, qty) => {
        if (unit === "Qty") {
            return rate * qty;
        }
        if (description === "Skirting") {
            return width * rate; // Skirting based on width
        }
        if (description === "Labour Charges") {
            return sqFt * rate; // Labour Charges based on sqFt
        }
        if (description === "Base Cabinet") {
            return rate; // Base Cabinet uses rate directly as total
        }
        if (description === "Legs") {
            return rate; // Base Cabinet uses rate directly as total
        }
        return sqFt * rate * qty; // Default calculation for other items
    };

    // Function to handle input changes and update the state
    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;

        // Handle height, width, and quantity updates based on item description
        if (field === "height") {
            updatedItems.forEach((item) => {
                if (item.description !== "Legs" && item.description !== "Skirting") {
                    item.height = newValue;
                }
            });
        } else if (field === "width") {
            updatedItems[index].width = newValue;
            const skirtingItem = updatedItems.find(item => item.description === "Skirting");
            if (skirtingItem) skirtingItem.width = newValue;
            const profileShutterItem = updatedItems.find(item => item.description === "Shutter");
            if (profileShutterItem) profileShutterItem.width = newValue;
            const leburchargesShutterItem = updatedItems.find(item => item.description === "Labour Charges");
            if (leburchargesShutterItem) leburchargesShutterItem.width = newValue;
        } else if (field === "qty") {
            updatedItems[index].qty = newValue;
        } else {
            updatedItems[index][field] = newValue;
        }

        // Recalculate sqFt and total for each item
        updatedItems.forEach((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            item.sqFt = sqFt;

            // Ensure correct sqFt and total for Labour Charges and Shutter
            if (item.description === "Shutter" || item.description === "Labour Charges") {
                const baseCabinetSqFt = updatedItems.find(i => i.description === "Base Cabinet")?.sqFt;
                item.sqFt = baseCabinetSqFt || 0; // Use base cabinet sqFt for Shutter and Labour Charges
            }

            const total = calculateTotal(item.sqFt, item.rate, item.unit, item.description, item.width, item.qty);
            item.total = total;
        });

        setItems(updatedItems);

        // Recalculate grand total
        const total = updatedItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
        setGrandTotal(total);
    };

    // Filter out Labour Charges if no valid width or rate
    const filteredItems = items.filter(
        (item) => !(item.description === "Labour Charges" && (item.width === 0 || item.rate === 0))
    );

    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty);
            return { ...item, sqFt, total };
        });
        setItems(updatedItems);

        // Recalculate grand total on load
        const total = updatedItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
        setGrandTotal(total);
    }, [selectedRate,shutterType]);
    // Grand total calculation
    const grandTotalamount = filteredItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    const handleRateUpdate = (newRate) => {
        const updatedItems = [...items]; // Copy the current items array

        // Find the "Base Cabinet" item and update its rate
        const updatedBaseCabinetItem = updatedItems.find(item => item.description === "Base Cabinet");
        updatedBaseCabinetItem.rate = newRate; // Update the rate with the new value

        // Recalculate sqFt and total for each item
        updatedItems.forEach((item) => {
            const sqFt = calculateSqFt(item.width, item.height); // Calculate sqFt for each item
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty); // Recalculate the total for each item
            item.sqFt = sqFt;
            item.total = total; // Update the total field
        });

        // Update the state with the new items
        setItems(updatedItems);
    };

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
            <h2 className="mb-4 text-2xl font-bold">CROCKERY CABINET</h2>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>
                        <th className="p-2 border">UNIT </th>
                        <th className="p-2 border">REMARK </th>
                        <th className="p-2 border">SQ/FT</th>
                        <th className="p-2 border">Qty</th>
                        <th className="p-2 border">Rate</th>
                        <th className="p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index} className="bg-white">
                            <td className="p-2 border">
                                {item.description === "Shutter" ? `${shutterType} ${item.description}` : item.description}
                            </td>
                            <td className="p-2 border">
                                {item.description !== "Legs" && item.description !== "Labour Charges" && item.description !== "Shutter" && item.description !== "Skirting" && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "width", e.target.value)}
                                    />
                                )}
                                {(item.description === "Shutter" || item.description === "Skirting") && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        disabled
                                    />
                                )}
                            </td>

                            <td className="p-2 border">
                                {item.description !== "Legs" && item.description !== "Labour Charges" && item.description !== "Skirting" && (
                                    <input
                                        type="number"
                                        value={item.thick || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "thick", e.target.value)}
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                {item.description !== "Legs" && item.description !== "Skirting" && item.description !== "Labour Charges" && item.description !== "Shutter" && (
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "height", e.target.value)}
                                    />
                                )}
                                {(item.description === "Shutter") && (
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        disabled
                                        onChange={(e) => handleInputChange(index, "height", e.target.value)}
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
                                {item.description === "Legs" ? 1 :
                                    item.description === "Skirting" ? item.width :
                                        item.description === "Base Cabinet" ? item.qty :
                                            (item.sqFt > 0 ? item.sqFt.toFixed(2) : "")
                                }
                            </td>

                            
                            <td className="p-2 border">
                                {item.description !== 'Skirting' && item.unit !== "Qty" && item.description !== 'Labour Charges' && (
                                    <input
                                        type="number"
                                        value={item.qty || ""}
                                        disabled
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "qty", e.target.value)}
                                    />
                                )}
                            </td>

                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.rate || ""}
                                    disabled
                                    className="w-full p-1 border rounded"
                                    onChange={(e) => handleInputChange(index, "rate", e.target.value)}
                                />
                            </td>
                            <td className="p-2 border">
                                {item.total ? Number(item.total).toFixed(2) : ""}
                            </td>

                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-200">
                        <td className="p-2 text-right border" colSpan="9">
                            Grand Total
                        </td>
                        <td className="p-2 border">{grandTotalamount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            {items.find((item) => item.description === "Base Cabinet") && (
                <CrockeryCabinetCalculator
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

export default Crockerycabinter;
