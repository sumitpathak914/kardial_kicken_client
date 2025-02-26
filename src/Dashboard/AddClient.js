import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BaseUrl } from "../Auth/Url";

const AddClient = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    status: "",
    id:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "mobile" ? value.replace(/\D/g, "") : value, // Allow only digits for "mobile"
    }));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/GetClient`);
      const data = await response.json();
      if (data.statusCode === 200) {
        setClients(data.data);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  const handleSubmit = async () => {
    debugger
    setErrors({});

    const newErrors = {};

    // Validate Name
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain alphabets and spaces.";
    }

    // Validate Mobile
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    // Validate Email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate City
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    // If there are errors, stop the submission and display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      if (action === 1) {
        // Update Client API
        const response = await fetch(`${BaseUrl}/api/Client_update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            city: formData.city,
            email: formData.email,
            number: formData.mobile,
            id: formData.id, // Assuming `formData.id` contains the client's ID
            status: formData.status,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
          setModalOpen(false);
          fetchClients(); // Fetch updated clients
          setErrors({});
          setAction(0)
        } else {
          // handle error for update failure
          // setError("Failed to update client. Please try again.");
          // setAction(0)
        }
      } else {
        // Add Client API
        const response = await fetch(`${BaseUrl}/api/AddClient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            city: formData.city,
            email: formData.email,
            number: formData.mobile,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
          setModalOpen(false);
          fetchClients(); // Fetch updated clients
          setErrors({});
        } else {
          // handle error for add failure
          // setError("Failed to add client. Please try again.");
          // setAction(0)
        }
      }
    } catch (error) {
     
      setLoading(false);
      alert('client with this email or number already exists')
    } 
  };


  // const openModal = (client,status) => {
  //   setModalOpen(true);
    
  // }
  
  const openModal = (client = null, status) => {
    if (client) {
      if (status === 1) {
        setAction(1)
      }

      setFormData({
        id: client.id,
        name: client.name,
        mobile: client.number,
        email: client.email,
        city: client.city,
        status:client.status
       
      });
    } else {
      setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => { 
    setErrors({});
    setModalOpen(false);
    setFormData({ name: "", mobile: "", email: "", city: "", status: "" });
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm)
  );

  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(`${BaseUrl}/api/Client/${id}`);
      if (response.status === 200) {
        
        fetchClients()
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  const handleToggleStatus = async (clientId, currentStatus) => {
    // Set the new status (0 for inactive, 1 for active)
    const newStatus = currentStatus === 0 ? 1 : 0;

    try {
      // Send the PUT request to update the status
      const response = await fetch(`${BaseUrl}/api/update_Client_Status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: clientId, status: newStatus }), // Send new status in the body
      });

      // Check if the request was successful
      if (response.ok) {
        // Update the local state to reflect the change
        fetchClients()
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };
  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Client Management</h1>
        <button
          onClick={() => openModal(null,0)} 
          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by Client Name or ID"
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

      {/* Client Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-purple-100">
            <tr>
              {["ID", "Name", "Mobile Number", "Email", "City", "Status","Action"].map((header) => (
                <th key={header} className="px-4 py-2 text-left border border-purple-200">
                  <span className="font-medium text-purple-700">{header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border border-purple-200">{client.id}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.number}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.email}</td>
                  <td className="px-4 py-2 border border-purple-200">{client.city}</td>
                  <td className="px-4 py-2 border border-purple-200">
                    <label className="flex items-center">
                      <span className="mr-2">
                       
                      </span>
                      <input
                        type="checkbox"
                        checked={client.status !== 0}
                        onChange={() => handleToggleStatus(client.id, client.status)}
                        className="hidden toggle-checkbox"
                      />
                      <div
                        className={`w-10 h-5 rounded-full cursor-pointer ${client.status === 0 ? "bg-gray-400" : "bg-green-500"}`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${client.status === 0 ? "translate-x-0" : "translate-x-5"
                            }`}
                        ></div>
                      </div>
                    </label>
                  </td>


                <td className="px-4 py-2 border border-purple-200">
                                    <div className="flex items-center gap-2">
                                      <button
                        onClick={() => openModal(client, 1)} 
                                        className="text-purple-600 hover:text-purple-800"
                                      >
                                        <FaEdit />
                                      </button>
                      <button className="text-red-600 hover:text-red-800"
                        onClick={() => deleteClient(client.id)}
                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No clients found.
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
            <h2 className="mb-6 text-2xl font-semibold text-purple-700">Add Client</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Client Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {(errors.name || formData.name === '') && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                maxLength={10}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {(errors.mobile || formData.mobile === '') && (
                <p className="text-sm text-red-500">{errors.mobile}</p>
              )}


              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {(errors.email || formData.email === '') && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}


              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {(errors.city || formData.city === '') && (
                <p className="text-sm text-red-500">{errors.city}</p>
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
    </div>
  );
};

export default AddClient;
