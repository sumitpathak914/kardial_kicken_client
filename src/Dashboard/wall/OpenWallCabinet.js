// import React from 'react'

// const OpenWallCabinet = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default OpenWallCabinet
import React, { useEffect, useState } from "react";

const OpenWallCabinet = () => {
    const fixedCabinetSize = { width: 600, height: 600, thickness: 400 }; // Fixed size for the cabinet
    const initialItems = [
        { description: "TOP/BOTTOM", width: fixedCabinetSize.width, height: fixedCabinetSize.thickness, thickness: fixedCabinetSize.thickness, rate: 710, unit: "MODUL", QTY: 2, thick: 18, remark: "MARINE PLY" },
        { description: "SIDE", width: fixedCabinetSize.thickness, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: 710, unit: "SQ/FT", QTY: 2, thick: 18, remark: "MARINE PLY" },
        { description: "BACK", width: fixedCabinetSize.width, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: 710, unit: "SQ/FT", QTY: 1, thick: 18, remark: "MARINE PLY" },
        { description: "SHELF", width: fixedCabinetSize.width, height: fixedCabinetSize.thickness, thickness: fixedCabinetSize.thickness, rate: 950, unit: "SQ/FT", QTY: 1, thick: 20, remark: "MARINE PLY" },
        { description: "HANGING PATTA", width: fixedCabinetSize.width, height: 100, thick: 18, rate: 471, unit: "SQ/FT", remark: "MARINE PLY" ,QTY: 1, },
        { description: "Labour Charges", width: fixedCabinetSize.width, height: fixedCabinetSize.height, thickness: fixedCabinetSize.thickness, rate: 100, unit: "SQ/FT", },
    ];

    const [cabinetSize, setCabinetSize] = useState(fixedCabinetSize);
    const [items, setItems] = useState(initialItems);
console.log(items,"items")
    // const calculateSqFt = (width, height, qty) => {
    //     const sqFt = ((width * height) / 92903.04) * qty;
    //     return Math.round(sqFt * 10) / 10; // Round to 1 decimal place
    // };
    const calculateSqFt = (width, height, qty) => (width * height) / 92903.04 * qty;


    const calculateTotal = (sqFt, rate, unit, description, width, qty) => {
        if (unit === "Qty") return rate * qty; // This handles "Legs" correctly
        if (description === "HANGING PATTA") return rate * sqFt; // This handles "Skirting" correctly
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
                if (["TOP/BOTTOM", "BACK", "SHELF", "HANGING PATTA"].includes(item.description)) {
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
    }, []);

    const grandTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);

    return (
        <div className="p-6">
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
                                    item.description !== "Labour Charges" && (
                                        <>
                                            {item.width}
                                        </>
                                    )
                                }

                            </td>
                            <td className="p-2 border">
                                {
                                    item.description !== "Labour Charges" && (
                                        <>
                                            {item.thick}
                                        </>
                                    )
                                }

                            </td>
                            <td className="p-2 border">
                                {
                                    item.description !== "Labour Charges" && (
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
                                {item.description !== "Legs"  && item.description !== "Labour Charges" ? (
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
                                {(item.sqFt ? item.sqFt.toFixed(2) : "0.00")}
                                {item.description === "Legs" && <>1</>}
                            </td>


                            <td className="p-2 border">{item.rate}</td>
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
        </div>
    );
};

export default OpenWallCabinet;
