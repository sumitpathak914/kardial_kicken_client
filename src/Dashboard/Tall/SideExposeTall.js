// import React from 'react'

// const SideExposeTall = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default SideExposeTall
import React, { useEffect, useState } from "react";

const SideExposeTall = () => {
    const fixedCabinetSize = { width: 600, height: 2100, thickness: 18 }; // Fixed size for the cabinet
    const initialItems = [
        { description: "SHELF WOODEN", width: fixedCabinetSize.width, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: 999, unit: "SQ/FT", QTY: 1, remark: "MARINE PLY" },
    ];

    const [cabinetSize, setCabinetSize] = useState(fixedCabinetSize);
    const [items, setItems] = useState(initialItems);

//      const calculateSqFt = (width, height, qty) => {
//     const sqFt = ((width * height) / 92903.04) * qty;
//     return Math.round(sqFt * 10) / 10; // Round to 1 decimal place
// };
const calculateSqFt = (width, height, qty) => (width * height) / 92903.04 * qty;
const calculateTotal = (sqFt, rate, unit, description, width, qty) => {
    if (unit === "Qty") return rate * qty;
    if (description === "Skirting") return width * rate * qty;
    return sqFt * rate;
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
        const updatedItems = prevItems.map((item) => {
            // Update width, height, and thickness based on cabinet size
            if (item.description === "SHELF WOODEN") {
                item.width = size.width;
                item.height = size.height;
                item.thickness = size.thickness;
            }

            item.sqFt = calculateSqFt(item.width, item.height, item.QTY);
            item.total = calculateTotal(item.sqFt, item.rate, item.unit, item.description, item.width, item.QTY);

            return { ...item };
        });

        return updatedItems;
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
}, []);

const grandTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);

return (
    <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold">SIDE EXPOSE</h2>
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
        <div className="overflow-x-auto">
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>
                        <th className="p-2 border">UNIT</th>
                        <th className="p-2 border">REMARK</th>
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
                                <input
                                    type="number"
                                    value={item.width}
                                    className="w-full p-1 border rounded"
                                    onChange={(e) => handleDimensionChange("width", e.target.value, index)}
                                />
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.thickness}
                                    className="w-full p-1 border rounded"
                                    onChange={(e) => handleDimensionChange("thickness", e.target.value, index)}
                                />
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.height}
                                    className="w-full p-1 border rounded"
                                    onChange={(e) => handleDimensionChange("height", e.target.value, index)}
                                />
                            </td>
                            <td className="p-2 border">{item.unit}</td>
                            <td className="p-2 border">{item.remark}</td>
                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.QTY}
                                    className="w-full p-1 border rounded"
                                    onChange={(e) => handleDimensionChange("QTY", e.target.value, index)}
                                />
                            </td>
                            <td className="p-2 border">{item.sqFt > 0 ? item.sqFt.toFixed(2) : ""}</td>
                            <td className="p-2 border">{item.rate}</td>
                            <td className="p-2 border">{item.total > 0 ? item.total.toFixed(2) : ""}</td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-gray-200">
                        <td className="p-2 text-right border" colSpan="9">Grand Total</td>
                        <td className="p-2 border">{grandTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
);
};

export default SideExposeTall;
