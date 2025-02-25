import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import JoditEditor from "jodit-react";

const EmpRegistration = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState(0);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    responsibilities: "",
    password: "",
    role: "sales",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employees");
      if (response.data.statusCode === 200) {
        setEmployees(response.data.data); // Use `data` array from the API response
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    if (!formData.responsibilities.trim()) {
      setError("Responsibilities are required.");
      setLoading(false);
      return;
    }

    try {
      if (action === 0) {
        const response = await axios.post("http://localhost:8080/api/Add_employees", {
          name: formData.name,
          Responsibilities: formData.responsibilities,
          email: formData.email,
          number: formData.mobile,
          password: formData.password,
          role: formData.role,
        });

        if (response.data.statusCode === 201) {
          setFormData({
            id: "",
            name: "",
            mobile: "",
            email: "",
            responsibilities: "",
            password: "",
            role: "sales",
          });
          setModalOpen(false);
          
          setAction(0)
          fetchEmployees()
        }
      } else {
        const response = await axios.put("http://localhost:8080/api/employees_update", {
          name: formData.name,
          id: formData.id,
          Responsibilities: formData.responsibilities,
          email: formData.email,
          number: formData.mobile,
          password: formData.password,
          role: formData.role,
        });

        if (response.data.statusCode === 200) {
          setFormData({
            id: "",
            name: "",
            mobile: "",
            email: "",
            responsibilities: "",
            password: "",
            role: "sales",
          });
          setModalOpen(false);
          setAction(0)
          fetchEmployees()
        }
      }
     
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding the employee.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (employee = null ,status) => {
    if (employee) {
      if (status === 1) {
        setAction(1)
      }
     
      setFormData({
        id: employee.id,
        name: employee.name,
        mobile: employee.number,
        email: employee.email,
        responsibilities: employee.Responsibilities,
        password: employee.password,
        role: employee.role,
      });
    } else {
      setFormData({
        id: "",
        name: "",
        mobile: "",
        email: "",
        responsibilities: "",
        password: "",
        role: "sales",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null);
    setFormData({
      id: "",
      name: "",
      mobile: "",
      email: "",
      responsibilities: "",
      password: "",
      role: "sales",
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.id.toString().includes(searchTerm.toLowerCase()) ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResponsibilitiesChange = (content) => {
    setFormData((prev) => ({ ...prev, responsibilities: content }));
  };



  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/employees/${id}`);
      if (response.status === 200) {
        // Remove the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleToggleStatus = async (clientId, currentStatus) => {
    // Set the new status (0 for inactive, 1 for active)
    const newStatus = currentStatus === "0" ? "1" : "0";

    try {
      // Send the POST request to update the status
      const response = await fetch(`http://localhost:8080/api/update_EMP_status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: clientId, status: newStatus }), // Send id and new status in the body
      });

      // Check if the request was successful
      if (response.ok) {
        // Update the local state to reflect the change
        fetchEmployees()
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
        <h1 className="text-3xl font-bold text-purple-700">Employee Registration</h1>
        <button
          onClick={() => openModal(null,0)}
          className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID or Name"
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

      {/* Employee Table */}
      <div className="p-4 bg-white rounded-lg ">
        <table className="w-full text-left border-collapse border-purple-200">
          <thead className="bg-purple-100">
            <tr>
              {["ID", "Name", "Mobile", "Email", "Responsibilities", "Role", "Password", "Status", "Actions"].map(
                (header) => (
                  <th key={header} className="px-4 py-2 font-medium text-purple-700 border">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border border-purple-200">{employee.id}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.number}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.email}</td>
               
                  <td className="px-4 py-2 border border-purple-200">{employee.Responsibilities}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.role}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.password}</td>
                  <td className="px-4 py-2 border border-purple-200">
                    <label className="flex items-center">
                      <span className="mr-2">

                      </span>
                      <input
                        type="checkbox"
                        checked={employee.status !== "0"}
                        onChange={() => handleToggleStatus(employee.id, employee.status)}
                        className="hidden toggle-checkbox"
                      />
                      <div
                        className={`w-10 h-5 rounded-full cursor-pointer ${employee.status == 0 ? "bg-gray-400" : "bg-green-500"}`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${employee.status == 0 ? "translate-x-0" : "translate-x-5"
                            }`}
                        ></div>
                      </div>
                    </label>
                  </td>
                  <td className="px-4 py-2 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(employee,1)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => deleteEmployee(employee.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg h-[600px] overflow-auto">
            <h2 className="mb-4 text-xl font-semibold text-purple-700">Add/Edit Employee</h2>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {formData.name === "" && error && (
                  <p className="mt-1 text-sm text-red-500">Name is required</p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onInput={(e) => {
                    // Only allow numeric characters and prevent others
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  placeholder="Mobile Number"
                  maxLength={10} // Restrict input to 10 characters
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {formData.mobile === "" && error && (
                  <p className="mt-1 text-sm text-red-500">Mobile number is required</p>
                )}
                {formData.mobile !== "" && !/^\d{10}$/.test(formData.mobile) && error && (
                  <p className="mt-1 text-sm text-red-500">Mobile number must be exactly 10 digits</p>
                )}
              </div>


              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {formData.email === "" && error && (
                  <p className="mt-1 text-sm text-red-500">Email is required</p>
                )}
                {formData.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && error && (
                  <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
                )}
              </div>

              {/* Responsibilities Field */}
              <div>
                <JoditEditor
                  value={formData.responsibilities}
                  onChange={handleResponsibilitiesChange}
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                {formData.password === "" && error && (
                  <p className="mt-1 text-sm text-red-500">Password is required</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpRegistration;
