
import React, { useState, useEffect } from "react";
import WallCornerCabinetCalculator from "./WallCornerCabinetCalculator";


const WallCornerCabinet = () => {
    // Sample data for different items
    const initialItems = [
        { description: "Base Cabinet", width: 1200, thick: 350, height: 600, rate: 5124, unit: "MODUL", qty: 1, remark: "MARINE PLY" },
        { description: "Acrylic Shutter", width: 600, thick: 18, height: 600, rate: 1470, unit: "SQ/FT", qty: 1, remark: "MARINE PLY" },
        { description: "HANGING PATTA", width: 1200, thick: 19, height: 100, rate: 471, unit: "SQ/FT", qty: 1, remark: "MARINE PLY" },
        { description: "SHELF", width: 1200, thick: 18, height: 350, rate: 950, unit: "SQ/FT", qty: 1, remark: "MARINE PLY" },
        { description: "Labour Charges", width: 600, height: 600, rate: 100, unit: "SQ/FT" },
    ];

    const [items, setItems] = useState(initialItems);
    console.log(items, "items")
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
        return sqFt * rate; // Default calculation for other items
    };

   

    const handleInputChange = (index, field, value) => {
        debugger;
        const updatedItems = [...items];
        const newValue = parseFloat(value) || 0;

        if (field === "height" && updatedItems[index].description === "Base Cabinet") {
            // Update height for Base Cabinet
            updatedItems[index].height = newValue;

            // Update height for Acrylic Shutter & Labour Charges
            updatedItems.forEach(item => {
                if (item.description === "Acrylic Shutter" || item.description === "Labour Charges") {
                    item.height = newValue / 2;
                }
            });
        }

        if (field === "thick" && updatedItems[index].description === "Base Cabinet") {
            // Update height for SHELF when Base Cabinet thickness changes
            updatedItems.forEach(item => {
                if (item.description === "SHELF") {
                    item.height = newValue;
                }
            });
        }

        if (field === "width") {
            // Update width for all items
            updatedItems.forEach(item => {
                item.width = newValue;
            });

            // Set Acrylic Shutter width to newValue / 2
            updatedItems.forEach(item => {
                if (item.description === "Acrylic Shutter" || item.description === "Labour Charges") {
                    item.width = newValue / 2;
                }
            });
        } else {
            // Normal field update
            updatedItems[index][field] = newValue;
        }

        // Recalculate values
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

    useEffect(() => {
        const updatedItems = items.map((item) => {
            const sqFt = calculateSqFt(item.width, item.height);
            let total = calculateTotal(sqFt, item.rate, item.unit, item.description, item.width);

            // Get Acrylic Shutter sqFt
            const acrylicShutter = items.find(i => i.description === "Acrylic Shutter");
            if (item.description === "Labour Charges" && acrylicShutter) {
                item.sqFt = acrylicShutter.sqFt; // Set same sqFt as Acrylic Shutter
                total = acrylicShutter.sqFt * item.rate; // Calculate total based on Acrylic Shutter
            } else {
                item.sqFt = sqFt;
            }

            return { ...item, total };
        });
        setItems(updatedItems);
    }, []);

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
            <h2 className="mb-4 text-2xl font-bold">WALL CORNER CABINET</h2>
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
                                    // <input
                                    //     type="number"
                                    //     value={item.width || ""}
                                    //     className="w-full p-1 border rounded"
                                    //     onChange={(e) =>
                                    //         handleInputChange(index, "width", e.target.value)
                                    //     }
                                    // />
                                    <input
                                        type="number"
                                        value={item.width || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "width", e.target.value)}
                                        disabled={item.description !== "Base Cabinet"} // Disable unless Base Cabinet
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
                                    // <input
                                    //     type="number"
                                    //     value={item.height || ""}
                                    //     className="w-full p-1 border rounded"
                                    //     onChange={(e) =>
                                    //         handleInputChange(index, "height", e.target.value)
                                    //     }
                                    // />
                                    <input
                                        type="number"
                                        value={item.height || ""}
                                        className="w-full p-1 border rounded"
                                        onChange={(e) => handleInputChange(index, "height", e.target.value)}
                                        disabled={!["Base Cabinet", "HANGING PATTA"].includes(item.description)} // Enable only for these descriptions
                                    />

                                )}
                            </td>

                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={item.qty || ""}
                                    disabled
                                    className="w-full p-1 border rounded"
                                    onChange={(e) =>
                                        handleInputChange(index, "qty", e.target.value)
                                    }
                                />
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
                <WallCornerCabinetCalculator
                    width={items.find((item) => item.description === "Base Cabinet").width}
                    thick={items.find((item) => item.description === "Base Cabinet").thick}
                    height={items.find((item) => item.description === "Base Cabinet").height}
                    onRateUpdate={handleRateUpdate}
                />
            )}
        </div>
    );
};

export default WallCornerCabinet;
