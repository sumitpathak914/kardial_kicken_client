import { useState } from "react";

const MeasurementImageUploader = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-md">
            <label className="block mb-2 font-medium text-gray-700">Select Measurement Images</label>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full p-2 border border-gray-300 rounded-md cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-2 mt-4">
                {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image}
                            alt={`Measurement ${index + 1}`}
                            className="object-cover w-24 h-24 rounded-md shadow-md"
                        />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute p-1 text-xs text-white transition bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeasurementImageUploader;
