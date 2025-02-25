import React, { useState } from "react";

const RequirementForm = ({handleFormSubmit}) => {
    const [formData, setFormData] = useState({
        clientName: "",
        architect: "",
        platformType: "",
        kitchenType: "",
        address: "",
        BaseMaterial: "",
        Shutter: "",
        DrawerType: "",
        Tandem: "",
        Handle: "",
        Cutlery: "",
        Thali_Cup_Sau_Inlet: "",
        CornerUnit: "",
        CabinetShutter: "",
        PantryUnit: "",
        PantrySize: "",
        RollingShutter: "",
        WickerBasket:"",
        ProfileShutter: "",
        GlassType: "",
        Other: "",
        Ro: "",
        LPG: "",
        SinkSize: "",
        Dustbin: "",
        Hob: "",
        HobSize: "",
        Fridge:"",
        FridgeSize:"",
        Skirting:"",
        Appliances: "",
        Dishwasher: "",
        Chimney: "",
        Lights: "",
        OtherDetails: "",
        visitDate: "",
        clientContact: "",
        architectContact:""
        
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="p-8 mx-auto bg-white rounded-lg shadow-lg ">
            {/* <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Requirement Form</h1> */}

            {/* Client Name Dropdown */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Client Name</label>
                <select
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    <option value="">Select Client</option>
                    <option value="Client 1">Client 1</option>
                    <option value="Client 2">Client 2</option>
                </select>
            </div>

            {/* Architect Dropdown */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Architect</label>
                <select
                    name="architect"
                    value={formData.architect}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    <option value="">Select Architect</option>
                    <option value="Architect 1">Architect 1</option>
                    <option value="Architect 2">Architect 2</option>
                </select>
            </div>

            {/* Address and Contact */}
            <div className="flex flex-col gap-6 mb-6 sm:flex-row">
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Date Of Studio Visit</label>
                    <input
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 mb-6 sm:flex-row">
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Client Contact</label>
                    <input
                        type="text"
                        name="clientContact"
                        placeholder="Enter client contact"
                        value={formData.clientContact}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Architect Contact</label>
                    <input
                        type="text"
                        name="architectContact"
                        placeholder="Enter architect contact"
                        value={formData.architectContact}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Platform Type Radio Buttons */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Platform Type</label>
                <div className="flex gap-4">
                    {["L Shape", "C Shape", "Parallel", "I Land"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="platformType"
                                value={type}
                                checked={formData.platformType === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Kitchen Type Radio Buttons */}
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Kitchen Type</label>
                <div className="flex gap-4">
                    {["Modular", "Semi Modular"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="kitchenType"
                                value={type}
                                checked={formData.kitchenType === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Base Material</label>
                <div className="flex gap-4">
                    {["Carecass", "Ss Frame", "Ply Partition"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="BaseMaterial"
                                value={type}
                                checked={formData.BaseMaterial === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Shutter</label>
                <div className="flex gap-4">
                    {["Laminate", "Acrylic", "Fenix" ,"Pu" ,"Glax", "Glass"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Shutter"
                                value={type}
                                checked={formData.Shutter === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Drawer Type</label>
                <div className="flex gap-4">
                    {["SS Basket", "Tandem"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="DrawerType"
                                value={type}
                                checked={formData.DrawerType === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Tandem</label>
                <div className="flex gap-4">
                    {["Blum Legra", "Blum Regular","Hafele","Grass","Hettich","Ebco"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Tandem"
                                value={type}
                                checked={formData.Tandem === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Handle</label>
                <div className="flex gap-4">
                    {["J Handle", "Surface", "Gola", "Regular"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Handle"
                                value={type}
                                checked={formData.Handle === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Cutlery</label>
                <div className="flex gap-4">
                    {["Pvc", "Cusio", "Ss Bowl", "Wooden"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Cutlery"
                                value={type}
                                checked={formData.Cutlery === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Thali/Cup/Sau Inlet</label>
                <div className="flex gap-4">
                    {["ss", "pvc"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Thali_Cup_Sau_Inlet"
                                value={type}
                                checked={formData.Thali_Cup_Sau_Inlet === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Corner Unit</label>
                <div className="flex gap-4">
                    {["Magic Corner", "Swing Tray", "Peka" ,"Corousel"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="CornerUnit"
                                value={type}
                                checked={formData.CornerUnit === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Cabinet Shutter</label>
                <div className="flex gap-4">
                    {["Up Opening", "Side opening", "Servo Drive", "Forte Lift" ,"Maxi Lift" ,"Deuo","Bi Fold","Gas Pump"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="CabinetShutter"
                                value={type}
                                checked={formData.CabinetShutter === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex gap-10 mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Pantry Unit</label>
                    <div className="flex gap-4">
                        {["ss", "Hi Gold", "Hafele"].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="PantryUnit"
                                    value={type}
                                    checked={formData.PantryUnit === type}
                                    onChange={handleChange}
                                    className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                                {type}
                            </label>
                        ))}
                    </div>  
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
                    <input
                        type="text"
                        name="PantrySize"
                        placeholder="Enter Pantry Size"
                        value={formData.PantrySize}
                         onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                
            </div>
            <div className="flex gap-10 mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Rolling Shutter</label>
                    <div className="flex gap-4">
                        {["Pvc", "Glass"].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="RollingShutter"
                                    value={type}
                                    checked={formData.RollingShutter === type}
                                    onChange={handleChange}
                                    className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Rolling Shutter Size</label>
                    <input
                        type="text"
                        name="RollingShutterSize"
                        placeholder="Enter Rolling Shutter Size"
                        // value={formData.architectContact}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Wicker Basket</label>
                <div className="flex gap-4">
                    {["Cane","Pvc"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="WickerBasket"
                                value={type}
                                checked={formData.WickerBasket === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Profile Shutter</label>
                <div className="flex gap-4">
                    {["001", "Mini Ikus" ,"Jb" ,"Profine"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="ProfileShutter"
                                value={type}
                                checked={formData.ProfileShutter === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Glass Type</label>
                <div className="flex gap-4">
                    {["FluTed", "Black Tinted", "Brown Tinted", "Transparent","Mesh Glass","Frosted","Back Painted"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="GlassType"
                                value={type}
                                checked={formData.GlassType === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Other</label>
                <div className="flex gap-4">
                    {["Gtpt", "Table Extention", "Ms Cube", "Pull Down Shelf"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Other"
                                value={type}
                                checked={formData.Other === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Ro</label>
                <div className="flex gap-4">
                    {["Over Counter","Under Counter", "OutSide"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Ro"
                                value={type}
                                checked={formData.Ro === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">LPG</label>
                <div className="flex gap-4">
                    {["In", "Out", "Pipeline"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="LPG"
                                value={type}
                                checked={formData.LPG === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-6 mb-6 sm:flex-row">
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Sink Size</label>
                    <input
                        type="text"
                        name="SinkSize"
                        placeholder="Enter Sink Size"
                        value={formData.SinkSize}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Dustbin</label>
                    <input
                        type="text"
                        name="Dustbin"
                        placeholder="Enter Dustbin"
                        value={formData.Dustbin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex gap-10 mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Hob</label>
                    <div className="flex gap-4">
                        {["Free Standing", "Built-in"].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="Hob"
                                    value={type}
                                    checked={formData.Hob === type}
                                    onChange={handleChange}
                                    className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Hob Size</label>
                    <input
                        type="text"
                        name="HobSize"
                        placeholder="Enter Hob Size"
                        value={formData.HobSize}
                         onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

            </div>

            <div className="flex gap-10 mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Fridge</label>
                    <div className="flex gap-4">
                        {["Free Standing", "Built-in"].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="Fridge"
                                    value={type}
                                    checked={formData.Fridge === type}
                                    onChange={handleChange}
                                    className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Fridge Size</label>
                    <input
                        type="text"
                        name="FridgeSize"
                        placeholder="Enter Fridge Size"
                        value={formData.FridgeSize}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

            </div>

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-600">Skirting</label>
                <div className="flex gap-4">
                    {["Pvc", "Civil"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="Skirting"
                                value={type}
                                checked={formData.Skirting === type}
                                onChange={handleChange}
                                className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-10 mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Appliances</label>
                    <div className="flex gap-4">
                        {["Microwave", "Oven", "Otg"].map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="Appliances"
                                    value={type}
                                    checked={formData.Appliances === type}
                                    onChange={handleChange}
                                    className="text-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600">Type</label>
                    <input
                        type="text"
                        name="RollingShutterSize"
                        placeholder="Enter Rolling Shutter Size"
                        // value={formData.architectContact}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

            </div>
            <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">Dishwasher</label>
                <input
                    type="text"
                    name="Dishwasher"
                    placeholder="Enter Dishwasher"
                    value={formData.Dishwasher}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>
            <div className="flex-1 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-600">Chimney</label>
                <input
                    type="text"
                    name="Chimney"
                    placeholder="Enter Chimney"
                    value={formData.Chimney}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>
            <div className="flex-1 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-600">Lights</label>
                <textarea
                    name="Lights"
                    placeholder="Enter Lights notes or requirements"
                    value={formData.Lights}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    rows="4" // You can adjust the number of rows as needed
                ></textarea>
            </div>
            <div className="flex-1 mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600">Other Details</label>
                <textarea
                    name="OtherDetails"
                    placeholder="Enter Other notes or requirements"
                    value={formData.OtherDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    rows="4" // You can adjust the number of rows as needed
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                <button
                    type="button"
                    className="w-full py-2 text-white transition-all duration-300 ease-in-out transform bg-purple-600 rounded-md hover:bg-purple-700 hover:scale-105"
                    onClick={handleFormSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default RequirementForm;
