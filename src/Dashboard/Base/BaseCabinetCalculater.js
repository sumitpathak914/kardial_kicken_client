import { useState, useEffect } from "react";

const calculateComponentAreaInFeet = (w, d, quantity) => {
    return (w * d * quantity) / (304.8 * 304.8);
};

const calculateRate = (width, thick, height, ratePerSqFt, backRate) => {
    const components = [
        { name: "side", w: thick, d: height, quantity: 2, rate: ratePerSqFt },
        { name: "top", w: width - 36, d: 100, quantity: 2, rate: ratePerSqFt },
        { name: "bottom", w: width - 36, d: thick, quantity: 1, rate: ratePerSqFt },
        { name: "back", w: width - 26, d: height - 26, quantity: 1, rate: backRate },
    ];

    return components.reduce((total, { w, d, quantity, rate }) => {
        return total + calculateComponentAreaInFeet(w, d, quantity) * rate;
    }, 0).toFixed(2);
};

const BaseCabinet = ({ width, thick, height, onRateUpdate, setExposeData, exposeData, exposeDataBottom, setExposeDataBottom, setExposeDataBack, exposeDataBack, setGrandTotal }) => {
    const [ratePerSqFt, setRatePerSqFt] = useState(471);
    const [backRate, setBackRate] = useState(280);
    const [showModal, setShowModal] = useState(false);
    const [showModalExpose, setShowModalExpose] = useState(false);
    const [selectedExpose, setSelectedExpose] = useState("");
    const [isAdding, setIsAdding] = useState(true);
    const [isAddingBottom, setIsAddingBottom] = useState(true);
    const [isAddingBack, setIsAddingBack] = useState(true);
    const [editingIndex, setEditingIndex] = useState(null);

    const [newExpose, setNewExpose] = useState({ thick: "", height: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });


    const [newExposeBottom, setNewExposeBottom] = useState({ width: "", thick: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });

    const [newExposeBack, setNewExposeBack] = useState({ width: "", height: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });
    useEffect(() => {
        setNewExpose((prev) => ({ ...prev, exposeType: selectedExpose }));
    }, [selectedExpose]);
    useEffect(() => {
        setNewExposeBottom((prev) => ({ ...prev, exposeType: selectedExpose }));
    }, [selectedExpose]);
    useEffect(() => {
        setNewExposeBack((prev) => ({ ...prev, exposeType: selectedExpose }));
    }, [selectedExpose]);
   
    const addExpose = () => {
        setExposeData([{ ...newExpose }]); 
        setNewExpose({ thick: "", height: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });
        setIsAdding(false);
        setShowModalExpose(false)
    };
    const addExposeBottom = () => {
        
        setExposeDataBottom([{ ...newExposeBottom }]);
        setNewExposeBottom({ width: "", thick: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });
        setIsAddingBottom(false);
        setShowModalExpose(false)
    };
    const addExposeBack = () => {
        setExposeDataBack([{ ...newExposeBack }]);
        setNewExposeBottom({ width: "", height: "", qty: "", rate: "", sqFoot: null, total: "", exposeType: selectedExpose });
        setIsAddingBack(false);
        setShowModalExpose(false)
    };

    const editExpose = (index) => {
        setNewExpose(exposeData[index]); 
        setEditingIndex(index);
        setIsAdding(true); 
    };

    const editExposeBottom = (index) => {
        setNewExposeBottom(exposeDataBottom[index]);
        setEditingIndex(index);
        setIsAddingBottom(true);
    };
    const editExposeBack = (index) => {
        setNewExposeBack(exposeDataBack[index]);
        setEditingIndex(index);
        setIsAddingBack(true);
    };

    // Function to save edited expose entry
    const saveEdit = () => {
        const updatedData = [...exposeData];
        updatedData[editingIndex] = newExpose;

        setExposeData(updatedData);
        setNewExpose({ thick: "", height: "", qty: "", rate: "", sqFoot: "", total: "" });
        setIsAdding(false); // Hide input fields
        setEditingIndex(null);
    };

    const saveEditBottom = () => {
        const updatedData = [...exposeDataBottom];
        updatedData[editingIndex] = newExposeBottom;

        setExposeDataBottom(updatedData);
        setNewExposeBottom({ width: "", thick: "", qty: "", rate: "", sqFoot: "", total: "" });
        setIsAddingBottom(false); 
        setEditingIndex(null);
    };
    const saveEditBack = () => {
        const updatedData = [...exposeDataBack];
        updatedData[editingIndex] = newExposeBack;

        setExposeDataBack(updatedData);
        setNewExposeBack({ width: "", height: "", qty: "", rate: "", sqFoot: "", total: "" });
        setIsAddingBack(false);
        setEditingIndex(null);
    };
    const handleExposeChange = (field, value) => {
        setNewExpose((prev) => {
            const updatedExpose = { ...prev, [field]: value };

            // Ensure numeric values for calculations
            const thick = parseFloat(updatedExpose.thick) || 0;
            const height = parseFloat(updatedExpose.height) || 0;
            const qty = parseFloat(updatedExpose.qty) || 0;
            const rate = parseFloat(updatedExpose.rate) || 0;

            updatedExpose.sqFoot = calculateComponentAreaInFeet(thick, height, qty);
            updatedExpose.total = (updatedExpose.sqFoot * rate).toFixed(2);

            return updatedExpose;
        });
    };
    const handleExposeChangeBottom = (field, value) => {
        setNewExposeBottom((prev) => {
            const updatedExpose = { ...prev, [field]: value };

            // Ensure numeric values for calculations
            const width = parseFloat(updatedExpose.width) || 0;
            const thick = parseFloat(updatedExpose.thick) || 0;
            const qty = parseFloat(updatedExpose.qty) || 0;
            const rate = parseFloat(updatedExpose.rate) || 0;

            updatedExpose.sqFoot = calculateComponentAreaInFeet(width, thick, qty);
            updatedExpose.total = (updatedExpose.sqFoot * rate).toFixed(2);

            return updatedExpose;
        });
    };

    const handleExposeChangeBack = (field, value) => {
        setNewExposeBack((prev) => {
            const updatedExpose = { ...prev, [field]: value };

            // Ensure numeric values for calculations
            const width = parseFloat(updatedExpose.width) || 0;
            const height = parseFloat(updatedExpose.height) || 0;
            const qty = parseFloat(updatedExpose.qty) || 0;
            const rate = parseFloat(updatedExpose.rate) || 0;

            updatedExpose.sqFoot = calculateComponentAreaInFeet(width, height, qty);
            updatedExpose.total = (updatedExpose.sqFoot * rate).toFixed(2);

            return updatedExpose;
        });
    };

    const [item, setItem] = useState({
        description: "Base Cabinet",
        width,
        thick,
        height,
        rate: calculateRate(width, thick, height, ratePerSqFt, backRate),
        unit: "MODUL",
    });

    const updateRate = () => {
        const newRate = calculateRate(item.width, item.thick, item.height, ratePerSqFt, backRate);
        setItem(prev => ({ ...prev, rate: newRate }));
        setShowModal(false);
    };

    useEffect(() => {
        const newRate = calculateRate(width, thick, height, ratePerSqFt, backRate);
        setItem(prev => ({ ...prev, rate: newRate }));
        onRateUpdate(newRate);
    }, [width, thick, height, ratePerSqFt, backRate]);

    return (
        <div>
            <table className="border">
                <tbody>
                    <tr>
                        <td className="p-2 border">
                            <input type="number" value={width} className="w-full p-1 border rounded" disabled />
                        </td>
                        <td className="p-2 border">
                            <input type="number" value={thick} className="w-full p-1 border rounded" disabled />
                        </td>
                        <td className="p-2 border">
                            <input type="number" value={height} className="w-full p-1 border rounded" disabled />
                        </td>
                        <td className="p-2 border">
                            <input type="number" value={item.rate || ""} disabled className="w-full p-1 border rounded" />
                        </td>
                        <td className="p-2 border">
                            <button onClick={() => setShowModal(true)} className="p-2 text-white bg-blue-500 rounded">
                                Change Rate
                            </button>
                        </td>

                        <td className="p-2 border">
                            <button onClick={() => setShowModalExpose(true)} className="p-2 text-white bg-blue-500 rounded">
                                Expose
                            </button>
                        </td>
                       
                    </tr>
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="mb-4 text-lg font-bold">Update Rates</h2>
                        <label className="block mb-2">
                            Rate per SqFt:
                            <input type="number" value={ratePerSqFt} onChange={(e) => setRatePerSqFt(Number(e.target.value))} className="w-full p-2 border rounded" />
                        </label>
                        <label className="block mb-4">
                            Back Rate:
                            <input type="number" value={backRate} onChange={(e) => setBackRate(Number(e.target.value))} className="w-full p-2 border rounded" />
                        </label>
                        <div className="flex justify-end">
                            <button onClick={() => setShowModal(false)} className="p-2 mr-2 text-white bg-gray-400 rounded">Cancel</button>
                            <button onClick={updateRate} className="p-2 text-white bg-green-500 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}



            {showModalExpose && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/2 p-6 bg-white rounded shadow-lg">
                        <h2 className="mb-4 text-lg font-bold">Select Exposure Type</h2>

                        {/* Dropdown Selection */}
                        <select
                            className="w-full p-2 mb-4 border rounded"
                            value={selectedExpose}
                            onChange={(e) => setSelectedExpose(e.target.value)}
                        >
                            <option value="">Select Exposure Type</option>
                            <option value="side">Side Expose</option>
                            <option value="bottom">Bottom Expose</option>
                            <option value="back">Back Expose</option>
                        </select>

                        {/* Conditional Tables */}
                        {selectedExpose === "side" && (
                            <>
                                <table className="w-full mt-4 border border-collapse border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">Thickness</th>
                                            <th className="p-2 border">Height</th>
                                            <th className="p-2 border">Quantity</th>
                                            <th className="p-2 border">Rate</th>
                                            <th className="p-2 border">Sq Foot</th>
                                            <th className="p-2 border">Total</th>
                                            <th className="p-2 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exposeData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2 border">{item.thick}</td>
                                                <td className="p-2 border">{item.height}</td>
                                                <td className="p-2 border">{item.qty}</td>
                                                <td className="p-2 border">{item.rate}</td>
                                                <td className="p-2 border">{item.sqFoot}</td>
                                                <td className="p-2 border">{item.total}</td>
                                                <td className="p-2 border">
                                                    <button
                                                        onClick={() => editExpose(index)}
                                                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {isAdding && (
                                            <tr>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExpose.thick} onChange={(e) => handleExposeChange("thick", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExpose.height} onChange={(e) => handleExposeChange("height", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExpose.qty} onChange={(e) => handleExposeChange("qty", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExpose.rate} onChange={(e) => handleExposeChange("rate", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">{newExpose.sqFoot}</td>
                                                <td className="p-2 border">{newExpose.total}</td>
                                                <td className="p-2 border">
                                                    {editingIndex === null ? (
                                                        // <button onClick={addExpose} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
                                                       null
                                                  
                                                    ) : (
                                                        <button onClick={saveEdit} className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600">Save</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex gap-5 mt-5">
                                    <button
                                        onClick={addExpose}
                                        className={`p-2 text-white rounded ${exposeData.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                        disabled={exposeData.length > 0}
                                    >
                                        Add
                                    </button>

                                    {/* Close Button */}
                                    <button onClick={() => setShowModalExpose(false)} className="p-2 text-white bg-red-500 rounded ">
                                        Close
                                    </button>
                                </div>
                            </>
                        )}

                        {/* {selectedExpose === "bottom" && (
                            <table className="w-full mt-4 border border-collapse border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">Width</th>
                                        <th className="p-2 border">Thickness</th>
                                        <th className="p-2 border">Quantity</th>

                                        <th className="p-2 border">Rate</th>
                                        <th className="p-2 border">Sq Foot</th>
                                        <th className="p-2 border">Total</th>
                                        <th className="p-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        )} */}
                        {selectedExpose === "bottom" && (
                            <>
                                <table className="w-full mt-4 border border-collapse border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">Width</th>
                                            <th className="p-2 border">thick</th>
                                            <th className="p-2 border">Quantity</th>
                                            <th className="p-2 border">Rate</th>
                                            <th className="p-2 border">Sq Foot</th>
                                            <th className="p-2 border">Total</th>
                                            <th className="p-2 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exposeDataBottom.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2 border">{item.width}</td>
                                                <td className="p-2 border">{item.thick}</td>
                                                <td className="p-2 border">{item.qty}</td>
                                                <td className="p-2 border">{item.rate}</td>
                                                <td className="p-2 border">{item.sqFoot}</td>
                                                <td className="p-2 border">{item.total}</td>
                                                <td className="p-2 border">
                                                    <button
                                                        onClick={() => editExposeBottom(index)}
                                                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {isAddingBottom && (
                                            <tr>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBottom.width} onChange={(e) => handleExposeChangeBottom("width", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBottom.thick} onChange={(e) => handleExposeChangeBottom("thick", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBottom.qty} onChange={(e) => handleExposeChangeBottom("qty", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBottom.rate} onChange={(e) => handleExposeChangeBottom("rate", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">{newExposeBottom.sqFoot}</td>
                                                <td className="p-2 border">{newExposeBottom.total}</td>
                                                <td className="p-2 border">
                                                    {editingIndex === null ? (
                                                        // <button onClick={addExpose} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
                                                        null

                                                    ) : (
                                                            <button onClick={saveEditBottom} className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600">Save</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex gap-5 mt-5">
                                    <button
                                        onClick={addExposeBottom}
                                        className={`p-2 text-white rounded ${exposeDataBottom.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                        disabled={exposeDataBottom.length > 0}
                                    >
                                        Add
                                    </button>

                                    {/* Close Button */}
                                    <button onClick={() => setShowModalExpose(false)} className="p-2 text-white bg-red-500 rounded ">
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                        {/* {selectedExpose === "back" && (
                            <table className="w-full mt-4 border border-collapse border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">Width</th>
                                        <th className="p-2 border">Height</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                        <td className="p-2 border"><input type="number" className="w-full p-1 border rounded" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        )} */}
                        {selectedExpose === "back" && (
                            <>
                                <table className="w-full mt-4 border border-collapse border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">Width</th>
                                            <th className="p-2 border">height</th>
                                            <th className="p-2 border">Quantity</th>
                                            <th className="p-2 border">Rate</th>
                                            <th className="p-2 border">Sq Foot</th>
                                            <th className="p-2 border">Total</th>
                                            <th className="p-2 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exposeDataBack.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2 border">{item.width}</td>
                                                <td className="p-2 border">{item.height}</td>
                                                <td className="p-2 border">{item.qty}</td>
                                                <td className="p-2 border">{item.rate}</td>
                                                <td className="p-2 border">{item.sqFoot}</td>
                                                <td className="p-2 border">{item.total}</td>
                                                <td className="p-2 border">
                                                    <button
                                                        onClick={() => editExposeBack(index)}
                                                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {isAddingBack && (
                                            <tr>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBack.width} onChange={(e) => handleExposeChangeBack("width", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBack.height} onChange={(e) => handleExposeChangeBack("height", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBack.qty} onChange={(e) => handleExposeChangeBack("qty", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">
                                                    <input type="number" value={newExposeBack.rate} onChange={(e) => handleExposeChangeBack("rate", e.target.value)} className="w-full p-1 border rounded" />
                                                </td>
                                                <td className="p-2 border">{newExposeBack.sqFoot}</td>
                                                <td className="p-2 border">{newExposeBack.total}</td>
                                                <td className="p-2 border">
                                                    {editingIndex === null ? (
                                                        // <button onClick={addExpose} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
                                                        null

                                                    ) : (
                                                        <button onClick={saveEditBack} className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600">Save</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex gap-5 mt-5">
                                    <button
                                        onClick={addExposeBack}
                                        className={`p-2 text-white rounded ${exposeDataBack.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                                        disabled={exposeDataBack.length > 0}
                                    >
                                        Add
                                    </button>

                                    {/* Close Button */}
                                    <button onClick={() => setShowModalExpose(false)} className="p-2 text-white bg-red-500 rounded ">
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                      
                    </div>
                </div>
            )}
        </div>
    );
};

export default BaseCabinet;
