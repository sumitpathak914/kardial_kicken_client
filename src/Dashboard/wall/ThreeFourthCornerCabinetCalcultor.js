
import { useState, useEffect } from "react";

const calculateComponentAreaInFeet = (w, d, quantity) => {
    const areaInSquareFeet = (w * d * quantity) / 92900;
    return areaInSquareFeet;
};

const calculateRate = (width, thick, height) => {
    const ratePerSqFt = 471;
    const backRate = 280;

    const components = [
        { name: "side", w: thick, d: height, quantity: 2, rate: ratePerSqFt },
        { name: "top", w: width - 36, d: thick, quantity: 1, rate: ratePerSqFt },
        { name: "bottom", w: width - 36, d: thick, quantity: 1, rate: ratePerSqFt },
        { name: "back", w: width - 26, d: height - 26, quantity: 1, rate: backRate },
    ];
console.log(components,"this is for the ")
    let totalPrice = 0;
    components.forEach(({ w, d, quantity, rate }) => {
        const areaInFeet = calculateComponentAreaInFeet(w, d, quantity);
        totalPrice += areaInFeet * rate;
    });

    return totalPrice.toFixed(2);
};

const ThreeFourthCornerCabinetCalcultor = ({ width, thick, height, onRateUpdate }) => {
    const [item, setItem] = useState({
        description: "Base Cabinet",
        width: width,
        thick: thick,
        height: height,
        rate: calculateRate(width, thick, height), // Initialize rate with calculated value
        unit: "MODUL",
    });

    // Function to handle changes in width, thick, and height
    const handleChange = (e, field) => {
        const value = parseFloat(e.target.value) || 0;
        const updatedItem = { ...item, [field]: value };
        setItem(updatedItem);

        // Recalculate the rate whenever any dimension is changed
        const newRate = calculateRate(updatedItem.width, updatedItem.thick, updatedItem.height);
        setItem((prev) => ({ ...prev, rate: newRate }));
console.log(newRate,"newratefromchild")
        // Update the parent component with the new rate
       // Optional: Call the callback to update the rate in the parent
    };

    useEffect(() => {
        // Update rate when props change (if it's passed as a parent prop)
        const newRate = calculateRate(width, thick, height);
        setItem((prev) => ({ ...prev, rate: newRate }));
        onRateUpdate(newRate);
    }, [width, thick, height]); // Recalculate rate on prop changes

    return (
        <table className="border">
            <tbody>
                <tr>
                    <td className="p-2 border">
                        <input
                            type="number"
                            value={width}
                            className="w-full p-1 border rounded"
                            disabled
                            onChange={(e) => handleChange(e, 'width')} />
                    </td>
                    <td className="p-2 border">
                        <input
                            type="number"
                            value={thick}
                            className="w-full p-1 border rounded"
                            disabled
                            onChange={(e) => handleChange(e, 'thick')} />
                    </td>
                    <td className="p-2 border">
                        <input
                            type="number"
                            value={height}
                            className="w-full p-1 border rounded"
                            disabled
                            onChange={(e) => handleChange(e, 'height')} />
                    </td>
                    <td className="p-2 border">
                        <input
                            type="number"
                            value={item.rate || ""}
                            disabled
                            className="w-full p-1 border rounded"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ThreeFourthCornerCabinetCalcultor;