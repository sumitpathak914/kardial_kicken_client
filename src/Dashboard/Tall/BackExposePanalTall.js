// import React from 'react'

// const BackExposePanalTall = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";

const BackExposePanalTall = () => {
    // Sample data for different items
    const initialItems = [
        { description: "PANEL", width: 920, thick: 19, height: 2100, rate: 1470, unit: "MODUL", qty: 1 },
        { description: "Labour Charges", width: 920, height: 2100, rate: 100, unit: "SQ/FT", qty: 1 },
    ];

    const [items, setItems] = useState(initialItems);

    // Calculate SQ/FT (Square Feet) for each item
    const calculateSqFt = (width, height, qty) => {
        return (width * height * qty) / 92903.04; // Conversion from mm^2 to square feet
    };

    // Calculate Total based on the description
    const calculateTotal = (sqFt, rate, unit, description) => {
        if (unit === "Qty") {
            return rate * 1; // Return rate as total for 'Qty' items
        }
        if (description === "Labour Charges") {
            return sqFt * rate; // Labour Charges based on sqFt
        }
        return sqFt * rate; // Default calculation for other items
    };

    // Use useEffect to calculate SQ/FT and Total for all items whenever relevant values change
    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height, item.qty);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description);
            return { ...item, sqFt, total };
        });
        setItems(updatedItems);
    }, [items]); // Recalculate whenever any item is updated

    // Filter items (e.g., remove Labour Charges if width or rate is 0)
    const filteredItems = items.filter(
        (item) => !(item.description === "Labour Charges" && (item.width === 0 || item.rate === 0))
    );

    // Calculate Grand Total
    const grandTotal = filteredItems.reduce((sum, item) => {
        return sum + (Number(item.total) || 0); // Ensure item.total is a number
    }, 0);

    // Handle Input Changes (for width, height, qty)
    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;
        updatedItems[index][field] = newValue;

        // If width, height, or qty is updated, apply it to all items
        if (field === "width") {
            updatedItems.forEach((item) => {
                item.width = newValue;
            });
        } else if (field === "height") {
            updatedItems.forEach((item) => {
                item.height = newValue;
            });
        } else if (field === "qty") {
            updatedItems.forEach((item) => {
                item.qty = newValue;
            });
        }

        setItems(updatedItems);
    };

    return (
        <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">BACK EXPOSE PANEL</h2>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>
                        <th className="p-2 border">Qty</th>
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
                                {
                                    item.description === 'PANEL' && (
                                        <input
                                            type="number"
                                            value={item.width || ""}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) =>
                                                handleInputChange(index, "width", e.target.value)
                                            }
                                        /> 
                                    )
                                }
                               
                            </td>
                            
                            <td className="p-2 border">
                                {
                                    item.description === 'PANEL' && (
                                        <input
                                            type="number"
                                            value={item.thick || ""}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) =>
                                                handleInputChange(index, "thick", e.target.value)
                                            }
                                        />
                                    )
                                }
                               
                            </td>
                            <td className="p-2 border">
                                {
                                    item.description === 'PANEL' && (
                                        <input
                                            type="number"
                                            value={item.height || ""}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) =>
                                                handleInputChange(index, "height", e.target.value)
                                            }
                                        />
                                    )
                                }
                                
                            </td>
                            <td className="p-2 border">
                                {
                                    item.description === 'PANEL' && (
                                        <input
                                            type="number"
                                            value={item.qty || ""}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) =>
                                                handleInputChange(index, "qty", e.target.value)
                                            }
                                        />
                                    )
                                }
                                
                            </td>
                            <td className="p-2 border">
                                {item.sqFt > 0 ? item.sqFt.toFixed(2) : ""}
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.rate || ""}
                                    disabled
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="p-2 border">
                                {item.total > 0 ? item.total.toFixed(2) : ""}
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-200">
                        <td className="p-2 text-right border" colSpan="7">
                            Grand Total
                        </td>
                        <td className="p-2 border">
                            {grandTotal.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BackExposePanalTall;
