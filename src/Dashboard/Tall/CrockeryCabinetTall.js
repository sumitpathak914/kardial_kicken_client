// import React from 'react'

// const CrockeryCabinetTall = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CrockeryCabinetTall
import React, { useState, useEffect } from "react";
import CrockeryCabinetCalculator from "./CrockeryTallCabinetCalculator";
import CrockeryCabinetCalculatortall from "./CrockeryTallCabinetCalculator";


const CrockeryCabinetTall = () => {
    // Sample data for different items
    const initialItems = [
        { description: "Base Cabinet", width: 600, thick: 600, height: 2100, rate: 11993, unit: "MODUL", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "PROFILE SHUTTER", width: 600, thick: 18, height: 2100, rate: 1500, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "HANGING PATTA", width: 600, thick: 19, height: 100, rate: 471, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, rate: 400, unit: "set", sqFt: 0, qty: 1, total: 0, remark: "HETTICH" },
        { description: "Skirting", width: 600, height: 1, rate: 0.66, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0, remark: "MARINE PLY" },
        { description: "Labour Charges", width: 600, height: 2100, rate: 100, unit: "SQ/FT", sqFt: 0, qty: 1, total: 0 },
    ];

    const [items, setItems] = useState(initialItems);
    const [grandTotal, setGrandTotal] = useState(0);

    // Function to calculate square feet
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
        if (description === "HANGING PATTA") {
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
        // if (field === "height") {
        //     updatedItems.forEach((item) => {
        //         if (item.description !== "Legs" && item.description !== "Skirting" && item.description !== "HANGING PATTA") {
        //             item.height = newValue;
        //         }
        //     });
// }
        if (field === "height" && updatedItems[index].description === "Base Cabinet") {
            // Update height for Base Cabinet
            updatedItems[index].height = newValue;

            // Update height for Acrylic Shutter & Labour Charges
            updatedItems.forEach(item => {
                if (item.description === "Legs" || item.description === "Skirting") {
                    item.height = newValue;
                }
            });
        }
        
        
        else if (field === "width") {
            updatedItems[index].width = newValue;
            const skirtingItem = updatedItems.find(item => item.description === "Skirting");
            if (skirtingItem) skirtingItem.width = newValue;
            const HANGINGPATTAItem = updatedItems.find(item => item.description === "HANGING PATTA");
            if (HANGINGPATTAItem) HANGINGPATTAItem.width = newValue;
            const profileShutterItem = updatedItems.find(item => item.description === "PROFILE SHUTTER");
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

            // Ensure correct sqFt and total for Labour Charges and PROFILE SHUTTER
            if (item.description === "PROFILE SHUTTER" || item.description === "Labour Charges") {
                const baseCabinetSqFt = updatedItems.find(i => i.description === "Base Cabinet")?.sqFt;
                item.sqFt = baseCabinetSqFt || 0; // Use base cabinet sqFt for PROFILE SHUTTER and Labour Charges
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
    }, []);
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
                            <td className="p-2 border">{item.description}</td>
                            <td className="p-2 border">
                                {item.description !== "Legs" && item.description !== "Labour Charges" && item.description !== "PROFILE SHUTTER" && item.description !== "Skirting" && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "width", e.target.value)}
                                    />
                                )}
                                {(item.description === "PROFILE SHUTTER" || item.description === "Skirting") && (
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
                                {item.description !== "Legs" && item.description !== "Skirting" && item.description !== "Labour Charges" && item.description !== "PROFILE SHUTTER" && (
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "height", e.target.value)}
                                    />
                                )}
                                {(item.description === "PROFILE SHUTTER") && (
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
                <CrockeryCabinetCalculatortall
                    width={items.find((item) => item.description === "Base Cabinet").width}
                    thick={items.find((item) => item.description === "Base Cabinet").thick}
                    height={items.find((item) => item.description === "Base Cabinet").height}
                    onRateUpdate={handleRateUpdate}
                />
            )}
        </div>
    );
};

export default CrockeryCabinetTall;
