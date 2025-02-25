import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
const AddCategory = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [action, setAction] = useState(0);
  const [isModalOpennew, setIsModalOpennew] = useState(false);
  const [categoryId, setcategoryId] = useState('');
  const [records, setRecords] = useState([]);
  const [newRecordName, setNewRecordName] = useState('');
  const [newRecordRate, setNewRecordRate] = useState('');



  const openModalnew = async (id) => {
    console.log("Category ID:", id);  // Log to confirm categoryId is set correctly
    setcategoryId(id);

    try {
      // Use GET instead of POST, and pass the category_id as a query parameter
      const response = await axios.get(
        `http://localhost:8080/api/Get_Options?category_id=${id}`
      );

      if (response.data && response.data.data) {
        setRecords(response.data.data);
        
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
    setIsModalOpennew(true); // Open the modal
  };




 

  const closeModalnew = () => { 
    setcategoryId('')
    setIsModalOpennew(false);
    setRecords([])
  }


  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/Delete_Option/${id}`
      );
      if (response.status === 200) {
       
      
        alert(response.data.message);
       
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert(
        error.response?.data?.message || "An error occurred while deleting."
      );
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    id: '',
    status: null, // Assuming the default status is 0
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories from the API
  useEffect(() => {


    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/GetCategories");
      const data = await response.json();
      if (data.statusCode === 200) {
        setCategories(data.data); // Set categories data
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle form submission to add a new category
  const handleSubmit = async () => {
    setErrors({});
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Category is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Category should only contain alphabets and spaces.";
    }

    // If there are errors, stop the submission and display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let response;
      if (action === 1) {
        // Call Update API
        response = await fetch("http://localhost:8080/api/Categories_update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formData.id,  // Make sure formData includes the ID for update
            name: formData.name,
            status: formData.status || 0,  // Adjust default value as needed
          }),
        });
      } else {
        // Call Add API
        response = await fetch("http://localhost:8080/api/Add_Categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: formData.name }),
        });
      }

      const data = await response.json();

      if (data.statusCode === 201 || data.statusCode === 200) {
        setFormData({ name: "", id: "", status: "" });  // Reset form data
        setModalOpen(false);
        setErrors({})
        fetchCategories();  // Make sure to define this function
      } else {
        alert('Category with this name already exists')
      }
    } catch (error) {
      alert('Category with this name already exists')
      console.error("Error saving category:", error);
    }
  };


  // Open modal
  const openModal = (category = null, status) => {
    if (category) {
      if (status === 1) {
        setAction(1)
      }

      setFormData({
        id: category.id,
        name: category.name,
        status: category.status

      });
    } else {
      setFormData({ name: "", status: null });
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setErrors({});
    setFormData({ name: "" });
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toString().includes(searchTerm)
  );


  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/Categories/${id}`);
      if (response.status === 200) {

        fetchCategories()
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  const addRecordAPI = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/Add_Option", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: categoryId,
          option_name: newRecordName,
          rate: newRecordRate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful record addition, e.g., show success message or update state
        console.log("Option added successfully:", data);
       
        setNewRecordName("");
        setNewRecordRate("");
      } else {
        // Handle errors from the server
        console.error("Error adding option:", data.message);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Add Category</h1>
        <button
          onClick={() => openModal(null, 0)}
          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by Category Name or ID"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72"
        />
        <button
          onClick={() => { }}
          className="px-4 py-2 text-white bg-purple-600 rounded-r-lg hover:bg-purple-700"
        >
          <FaSearch />
        </button>
      </div>

      {/* Category Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">ID</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Category Name</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Status</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Sub options</span>
              </th>
              <th className="px-4 py-2 text-left border border-purple-200">
                <span className="font-medium text-purple-700">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border border-purple-200">{category.id}</td>
                  <td className="px-4 py-2 border border-purple-200">{category.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{category.status}</td>
                  <td className="justify-center px-4 py-2 border border-purple-200" ><span className="flex justify-center cursor-pointer hover:scale-105" onClick={() => openModalnew(category.id)}><IoMdAddCircleOutline /></span></td>
                  <td className="px-4 py-2 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(category, 1)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-purple-700">Add Category</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {(errors.name || formData.name === '') && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-3 mr-4 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpennew && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded shadow-lg w-[500px]">
            <h2 className="mb-4 text-lg font-bold">Manage Records</h2>
            <ul className="mb-4">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <span>{record.option_name}</span>
                  <span>{record.rate}</span>
                  <button
                    className="text-red-500"
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Record Name"
                  value={newRecordName}
                  onChange={(e) => setNewRecordName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="Rate"
                  value={newRecordRate}
                  onChange={(e) => setNewRecordRate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="button" // Make sure it's a button and not part of a form submission
                onClick={() => addRecordAPI()} // Call the addRecordAPI directly on button click
                className="w-full px-4 py-2 text-white bg-blue-500 rounded"
              >
                Add Record
              </button>
            </div>

            <button
              className="w-full px-4 py-2 text-white bg-gray-500 rounded"
              onClick={closeModalnew}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AddCategory;
