// import React from 'react'

// const MsCubeTall = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default MsCubeTall
import React, { useEffect, useState } from "react";
import MsCubeCalculatorTall from "./MsCubeCalculatorTall";


const MsCubeTall = () => {
    // Sample data for different items
    const initialItems = [
        { description: "MS CUBE", width: 600, thick: 300, height: 770, rate: 4000, unit: "MODUL", qty: "1", remark: "MARINE PLY" },
        { description: "SHELF WOODEN", width: 600, thick: 18, height: 300, rate: 950, unit: "SQ/FT", qty: "1", remark: "MARINE PLY" },
        { description: "SHELF GLASS", width: 600, thick: 19, height: 18, rate: 250, unit: "SQ/FT", qty: "2", remark: "MARINE PLY" },
        { description: "Legs", width: 0, height: 0, rate: 400, unit: "set", qty: "1", remark: "HETTICH" },
        { description: "Skirting", width: 600, height: 1, rate: 0.66, unit: "SQ/FT", qty: "1", remark: "MARINE PLY" },
        { description: "Labour Charges", width: 600, height: 770, rate: 100, unit: "SQ/FT", qty: 1 },
    ];

    const [items, setItems] = useState(initialItems);

    const calculateSqFt = (width, height) => (width * height) / 92903.04;

    const calculateTotal = (sqFt, rate, unit, description, width, qty) => {
        const baseTotal = sqFt * rate; // Calculate base total
        if (unit === "Qty") {
            return rate * qty; // For "Qty" items, multiply rate by quantity
        }
        if (description === "Skirting") {
            return width * rate * qty; // Skirting is calculated based on width and quantity
        }
        if (description === "Labour Charges") {
            return sqFt * rate; // Labour Charges based on sqFt and quantity
        }
        if (description === "Legs") {
            return rate; // Labour Charges based on sqFt and quantity
        }
        return baseTotal * qty; // Default calculation for other items
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;

        // Find specific items
        const labourItem = updatedItems.find(item => item.description === "Labour Charges");
        const shutterItem = updatedItems.find(item => item.description === "Shutter");
        const acrylicShutterItem = updatedItems.find(item => item.description === "Acrylic Shutter");
        const baseCabinet = updatedItems.find(item => item.description === "Base Cabinet");

        if (field === "height") {
            updatedItems[index].height = newValue;

            if (labourItem) {
                labourItem.height = newValue;
            }
        }
        if (field === "thick" && updatedItems[index].description === "MS CUBE") {
            // Update height for SHELF when Base Cabinet thickness changes
            updatedItems.forEach(item => {
                if (item.description === "SHELF WOODEN") {
                    item.height = newValue;
                }
                
            });
        }
        if (field === "thick" && updatedItems[index].description === "SHELF WOODEN") {
            // Update height for SHELF when Base Cabinet thickness changes
            updatedItems.forEach(item => {
                if (item.description === "SHELF GLASS") {
                    item.height = newValue;
                }

            });
        }
        if (field === "width") {
            if (updatedItems[index].description === "MS CUBE") {
                updatedItems[index].width = newValue;

                const skirtingItem = updatedItems.find(item => item.description === "Skirting");
                if (skirtingItem) {
                    skirtingItem.width = newValue;
                }
                const SHELFWOODENItem = updatedItems.find(item => item.description === "SHELF WOODEN");
                if (SHELFWOODENItem) {
                    SHELFWOODENItem.width = newValue;
                }
                const SHELFGLASSItem = updatedItems.find(item => item.description === "SHELF GLASS");
                if (SHELFGLASSItem) {
                    SHELFGLASSItem.width = newValue;
                }
                const LabourChargesItem = updatedItems.find(item => item.description === "Labour Charges");
                if (LabourChargesItem) {
                    LabourChargesItem.width = newValue;
                }
            } else {
                updatedItems[index][field] = newValue;

                if (baseCabinet && field === "width") {
                    if (shutterItem) {
                        shutterItem.width = baseCabinet.width / 2;
                    }
                    if (acrylicShutterItem) {
                        acrylicShutterItem.width = baseCabinet.width / 2;
                    }
                    if (labourItem) {
                        labourItem.width = baseCabinet.width / 2;
                    }
                }
            }
        } else if (field === "qty") {
            updatedItems[index].qty = newValue;

            // Recalculate total for each item when quantity changes
            updatedItems.forEach((item) => {
                const sqFt = calculateSqFt(item.width, item.height);
                const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty);
                item.sqFt = sqFt;
                item.total = total;
            });
        } else {
            updatedItems[index][field] = newValue;
        }

        updatedItems.forEach((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty);
            item.sqFt = sqFt;
            item.total = total;
        });

        setItems(updatedItems);
    };

    const filteredItems = items.filter(
        (item) => !(item.description === "Labour Charges" && (item.width === 0 || item.rate === 0))
    );

    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty);
            return { ...item, sqFt, total };
        });

        // Update Labour Charges based on SHELF WOODEN and SHELF GLASS square footage
        const shelfWooden = updatedItems.find(item => item.description === "SHELF WOODEN");
        const shelfGlass = updatedItems.find(item => item.description === "SHELF GLASS");
        const labourCharges = updatedItems.find(item => item.description === "Labour Charges");

        if (labourCharges) {
            const totalSqFt = (shelfWooden?.sqFt || 0) + (shelfGlass?.sqFt || 0);
            labourCharges.sqFt = totalSqFt;
            labourCharges.total = totalSqFt * labourCharges.rate; // Corrected total calculation
        }
        setItems(updatedItems);
    }, [items]);

    const grandTotal = filteredItems.reduce((sum, item) => {
        return sum + (Number(item.total) || 0); // Ensures item.total is a number
    }, 0);

    const handleRateUpdate = (newRate) => {
        const updatedItems = [...items];
        const updatedBaseCabinetItem = updatedItems.find(
            (item) => item.description === "Base Cabinet"
        );
        updatedBaseCabinetItem.rate = newRate;

        updatedItems.forEach((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            const total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width, item.qty);
            item.sqFt = sqFt;
            item.total = total;
        });

        setItems(updatedItems);
    };

    return (
        <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">MS CUBE</h2>
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Width (mm)</th>
                        <th className="p-2 border">THICK (mm)</th>
                        <th className="p-2 border">Height (mm)</th>
                        <th className="p-2 border">UNIT</th>
                        <th className="p-2 border">Remark</th>
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
                                {item.description && item.description !== "Legs" && item.description !== "Labour Charges" && (
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "width", e.target.value)}
                                        disabled={item.description !== "MS CUBE"} // Disable input if description is not "MS CUBE"
                                    />
                                )}
                            </td>

                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Labour Charges" && item.description !== "Skirting" && (
                                    <input
                                        type="number"
                                        value={item.thick || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "thick", e.target.value)}
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                {item.description && item.description !== "Legs" && item.description !== "Skirting" && item.description !== "Labour Charges" && (
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "height", e.target.value)}
                                        disabled={!(item.description === "MS CUBE" )}
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
                                {item.description === 'MS CUBE' || item.description === 'SHELF WOODEN' || item.description === 'SHELF GLASS' ? (
                                    <input
                                        type="number"
                                        value={item.qty || ""}
                                        disabled
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "qty", e.target.value)}
                                    />
                                ) : (
                                    null
                                )}
                            </td>

                            <td className="p-2 border">
                                {item.description === "Base Cabinet"
                                    ? "1"
                                    : item.description === "Skirting"
                                        ? item.width
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
                                    onChange={(e) => handleInputChange(index, "rate", e.target.value)}
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
                <MsCubeCalculatorTall
                    width={items.find((item) => item.description === "Base Cabinet").width}
                    thick={items.find((item) => item.description === "Base Cabinet").thick}
                    height={items.find((item) => item.description === "Base Cabinet").height}
                    onRateUpdate={handleRateUpdate}
                />
            )}
        </div>
    );
};

export default MsCubeTall;
