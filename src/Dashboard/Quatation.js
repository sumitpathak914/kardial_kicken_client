import React, { useState, useEffect } from "react";
import BaseCabinet from "./Base/BaseCabinetCalculater";
import axios from "axios";
import SideExpose from "./Base/SideExpose";

const CabinetCalculator = ({ handleRecordAdd }) => {
    const [exposeData, setExposeData] = useState([]);

    const [exposeDataBottom, setExposeDataBottom] = useState([]);
    const [exposeDataBack, setExposeDataBack] = useState([]);
    const [shutterType, setShutterType] = useState("");
    const [selectedRate, setSelectedRate] = useState(0);
    const [GrandTotal, setGrandTotal] = useState(0);
    const initialItems = [
        { description: "Base Cabinet", width: 600, thick: 600, height: 770, rate: 8259, unit: "MODUL", qty: 1, remark:"MARINE PLY"},
        { description: `${shutterType} Shutter`, width: 600, thick: 18, height: 770, rate: selectedRate, unit: "SQ/FT", qty: 1, remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, rate: 400, unit: "Qty", remark: "HETTICH" },
        { description: "Skirting", width: 600, height: 1, rate: 0.66, unit: "SQ/FT" ,remark: "MARINE PLY" },
        { description: "Labour Charges", width: 600, height: 770, rate: 100, unit: "SQ/FT" },
    ];

    const [items, setItems] = useState(initialItems);
    const [shutters, setShutters] = useState([]);
    const calculateSqFt = (width, height) => (width * height) / 92903.04;
    const clearExposeData = (type) => {
        if (type === "side") setExposeData([]);
        if (type === "bottom") setExposeDataBottom([]);
        if (type === "back") setExposeDataBack([]);
    };
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
                    ? { ...item, description: `${selectedShutterName} Shutter`, rate: newRate }
                    : item
            )
        );
    };
    useEffect(() => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.description.includes("Shutter") ?
                    { ...item, description: `${shutterType} Shutter` } :
                    item
            )
        );
    }, [shutterType]);
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
        return sqFt * rate; // Default calculation for other items
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;

        if (field === "width" || field === "height") {
            updatedItems.forEach((item) => {
                item[field] = newValue;
                const sqFt = calculateSqFt(item.width, item.height);
                const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);
                item.sqFt = sqFt;
                item.total = total;
            });
        } else {
            updatedItems[index][field] = newValue;
            const sqFt = calculateSqFt(updatedItems[index].width, updatedItems[index].height);
            const total = calculateTotal(sqFt, updatedItems[index].rate, updatedItems[index].unit, updatedItems[index].description, updatedItems[index].width);
            updatedItems[index].sqFt = sqFt;
            updatedItems[index].total = total;
        }
        setItems(updatedItems);
    };

    const filteredItems = items.filter(
        (item) => !(item.description === "Labour Charges" && (item.width === 0 || item.rate === 0))
    );

    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);
            return { ...item, sqFt, total };
        });
        setItems(updatedItems);
    }, [shutterType, selectedRate]);

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
            
            <h2 className="mb-4 text-2xl font-bold">REGULAR CABINET</h2>
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
                            <td className="p-2 border">{item.description}</td>
                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Labour Charges" && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) =>
                                            handleInputChange(index, "width", e.target.value)
                                        }
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
                                    />
                                )}
                            </td>
                          
                            {/* <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.qty || ""}
                                    disabled
                                    className="w-full p-1 border rounded"
                                    onChange={(e) =>
                                        handleInputChange(index, "qty", e.target.value)
                                    }
                                />
                            </td> */}
                            <td className="p-2 border">
                                {item.description !== 'Skirting' && item.unit !== "Qty" && item.description !== 'Labour Charges' && item.description !== 'Legs' && (
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
                                {item.unit}
                            </td>
                            <td className="p-2 border">
                                {item.remark}
                            </td>

                            <td className="p-2 border">
                                {item.description === "Base Cabinet"
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
                <BaseCabinet
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
                    setGrandTotal={setGrandTotal}
                   
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
            <div className="flex mt-4 space-x-2">
               
                <button
                    onClick={() => handleRecordAdd({ shutterType, shutterCost: selectedRate, items: items, grandTotal: grandTotal, SideExpose: exposeData, BottomExpose: exposeDataBottom, BackExpose: exposeDataBack })}
                    className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
                >
                    Record Add
                </button>
                                            {/* <button onClick={handleCancel} className="px-4 py-2 text-white bg-red-500 rounded">
                                                Cancel
                                            </button> */}
                                        </div>

          

        </div>
    );
};

export default CabinetCalculator;
