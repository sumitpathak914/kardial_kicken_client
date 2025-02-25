import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const AddQuality = () => {
  const [isModalOpen, setModalOpen] = useState(false);
    const [qualities, setQualities] = useState([]);
    const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
    const [action, setAction] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
      status: "",
    id:""
  });
  const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(true);

  // Fetch qualities from the API
  useEffect(() => {
   

      fetchQualities();
      fetchCategories();
  }, []); // Empty dependency array ensures this runs once on component mount
    const fetchQualities = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/GetQuality"
            );
            if (response.data.statusCode === 200 && response.data.result) {
                setQualities(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching qualities:", error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/GetCategories");
            if (response.data.statusCode === 200 && response.data.result) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
    const handleSubmit = async () => {
        
        setErrors({});
        const newErrors = {};

        // Validate Name
        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = "Quality Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain alphabets and spaces.";
        }

        if (!formData.category.trim() || formData.category.length < 2) {
            newErrors.category = "Category is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.category)) {
            newErrors.category = "Category should only contain alphabets and spaces.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            let response;

            // If action is 1, update the quality
            if (action === 1) {
                response = await axios.put("http://localhost:8080/api/Quality_update", {
                    id: formData.id, // Ensure the formData contains an `id` field for updating
                    name: formData.name,
                    Categories_name: formData.category,
                    status: formData.status,
                });
            } else {
                // Else add the quality
                response = await axios.post("http://localhost:8080/api/Add_Quality", {
                    name: formData.name,
                    Categories_name: formData.category,
                });
            }

            if (response.data.statusCode === 200 && response.data.result) {
                setFormData({ name: "", category: "", status: "", id: null }); // Reset form data
                setModalOpen(false);
                setErrors({});
                fetchQualities()
                setAction(0)
                setSearchQuery('')
            } 
           
        } catch (error) {
            alert('Quality with this name or Categories_name already exists')
            console.error("Error processing quality:", error);
        }
    };


  // Open modal
//   const openModal = () => setModalOpen(true);
    const openModal = (Quality = null, status) => {
        if (Quality) {
            if (status === 1) {
                setAction(1)
            }

            setFormData({
                id: Quality.id,
                name: Quality.name,
                category: Quality.Categories_name,
                status: Quality.status

            });
        } else {
            setFormData({ name: "", category: "", status: "" });
        }
        setModalOpen(true);
    };
  // Close modal
    const closeModal = () => {
        setModalOpen(false);
        setErrors({});
        setFormData({ name: "", category: "", status: "" });
        setAction(0)
        setSearchQuery('')
    }
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter qualities based on search term
  const filteredQualities = qualities.filter(
    (quality) =>
      quality.name.toLowerCase().includes(searchTerm) ||
      quality.Categories_name.toLowerCase().includes(searchTerm)
  );


    const deleteQuality = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/Quality/${id}`);
            if (response.status === 200) {

                fetchQualities()
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };


  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Add Quality</h1>
        <button
                  onClick={() => openModal(null, 0)} 

          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Quality
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by Quality Name or Category"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
        />
        <button className="px-4 py-2 text-white bg-purple-600 rounded-r-lg hover:bg-purple-700">
          <FaSearch />
        </button>
      </div>

      {/* Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse border-purple-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 font-medium text-purple-700 border">
                ID
              </th>
              <th className="px-4 py-2 font-medium text-purple-700 border">
                Quality Name
              </th>
              <th className="px-4 py-2 font-medium text-purple-700 border">
                Category
              </th>
              <th className="px-4 py-2 font-medium text-purple-700 border">
                Status
                          </th>
                          <th className="px-4 py-2 font-medium text-purple-700 border">
                              Action
                          </th>
            </tr>
          </thead>
          <tbody>
            {filteredQualities.length > 0 ? (
              filteredQualities.map((quality, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border">{quality.id}</td>
                  <td className="px-4 py-2 border">{quality.name}</td>
                  <td className="px-4 py-2 border">
                    {quality.Categories_name}
                  </td>
                  <td className="px-4 py-2 border">{quality.status}</td>
                  <td className="px-4 py-2 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <button
                                  onClick={() => openModal(quality, 1)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                                  onClick={() => deleteQuality(quality.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No qualities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
          {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="mb-6 text-xl font-bold text-purple-700">
                          {action === 1 ? "Edit Quality" : "Add Quality"}
                      </h2>
                      <div className="space-y-4">
                          <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Quality Name"
                              className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                          <div className="relative">
                              <div className="border border-purple-300 rounded-lg">
                                  <input
                                      type="text"
                                      placeholder="Search Category"
                                      value={searchQuery}
                                      onChange={(e) => {
                                          setSearchQuery(e.target.value);
                                          setDropdownVisible(true); // Show dropdown when typing
                                      }}
                                      className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  />
                                  {dropdownVisible && (
                                      <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border border-purple-300 rounded-lg h-[150px]">
                                          {categories
                                              .filter((cat) =>
                                                  cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                                              )
                                              .map((cat) => (
                                                  <div
                                                      key={cat.id}
                                                      onClick={() => {
                                                          handleChange({
                                                              target: { name: "category", value: cat.name },
                                                          });
                                                          setSearchQuery(cat.name);
                                                          setDropdownVisible(false); // Hide dropdown after selection
                                                      }}
                                                      className="px-4 py-2 cursor-pointer hover:bg-purple-100"
                                                  >
                                                      {cat.name}
                                                  </div>
                                              ))}
                                      </div>
                                  )}
                              </div>
                          </div>
                          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                      </div>
                      <div
                          className={`flex justify-end ${dropdownVisible ? "mt-[200px]" : "mt-[50px]"
                              }`}
                      >
                          <button
                              onClick={() => {
                                  closeModal();
                                  setDropdownVisible(true); // Reset dropdown visibility on cancel
                              }}
                              className="px-4 py-2 mr-4 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-100"
                          >
                              Cancel
                          </button>
                          <button
                              onClick={handleSubmit}
                              className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                          >
                              Save
                          </button>
                      </div>

                  </div>
              </div>
          )}



    </div>
  );
};

export default AddQuality;
