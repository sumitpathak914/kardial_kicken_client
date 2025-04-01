import React, { useState, useEffect } from "react";
import axios from "axios";

const RateSection = () => {
  const [shutters, setShutters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [shutterData, setShutterData] = useState({ shutterName: "", rate: "" });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetchShutters();
  }, []);

  // Fetch shutters from API
  const fetchShutters = async () => {
    try {
      const response = await axios.get("http://localhost:5050/shutters/list");
      setShutters(response.data);
    } catch (error) {
      console.error("Error fetching shutters:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setShutterData({ ...shutterData, [e.target.name]: e.target.value });
  };

  // Add shutter to API
  const addShutter = async () => {
    if (!shutterData.shutterName || !shutterData.rate) return;
    try {
      await axios.post("http://localhost:5050/shutters/add", shutterData);
      fetchShutters();
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding shutter:", error);
    }
  };

  return (
    <>
      <div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Module</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
            
          </thead>
          <tbody>
          
              <tr className="border border-gray-300">
                <td className="px-4 py-2 border border-gray-300">Shutter</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  className="px-4 py-1 text-white bg-blue-500 rounded"
                  onClick={() => setIsOpen(true)}
                >
                  View
                </button>
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="px-4 py-2 border border-gray-300">Tendem</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  className="px-4 py-1 text-white bg-blue-500 rounded"
                  onClick={() => setIsOpen(true)}
                >
                  View
                </button>
              </td>
            </tr>
          
          </tbody>
        </table>
      </div>
      {isOpen && (
        <>
          <div className="p-6 bg-white">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Shutter Section</h2>
              <div className="flex gap-5">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Add Shutter
                </button>
                <button
                  className="px-4 py-1 mt-4 text-white bg-red-500 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
              
            </div>


            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">Shutter</th>
                    <th className="px-4 py-2 border border-gray-300">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {shutters.map((shutter) => (
                    <tr key={shutter.id} className="border border-gray-300">
                      <td className="px-4 py-2 border border-gray-300">{shutter.shutterName}</td>
                      <td className="px-4 py-2 border border-gray-300">${shutter.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Shutter Button */}


            {/* Add Shutter Modal */}
            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                  <h3 className="mb-4 text-lg font-semibold">Add New Shutter</h3>
                  <input
                    type="text"
                    name="shutterName"
                    placeholder="Shutter Name"
                    value={shutterData.shutterName}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded-md"
                  />
                  <input
                    type="number"
                    name="rate"
                    placeholder="Rate"
                    value={shutterData.rate}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded-md"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-white bg-gray-400 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addShutter}
                      className="px-4 py-2 text-white bg-green-500 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          </>
      )}
     
    </>
    
  );
};

export default RateSection;
