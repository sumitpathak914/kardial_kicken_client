import React, { useState } from "react"; 
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const EmpRegistration = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    status: "",
    responsibilities: "",
    password: "",
    role: "sales",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setEmployees((prev) => [...prev, formData]);
    setFormData({
      id: "",
      name: "",
      mobile: "",
      email: "",
      status: "",
      responsibilities: "",
      password: "",
      role: "sales",
    });
    setModalOpen(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.id.toLowerCase().includes(searchTerm) ||
      employee.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Employee Registration</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Employee ID or Name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-72" // shorter width
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-purple-600 rounded-r-lg text-white hover:bg-purple-700"
        >
          <FaSearch />
        </button>
      </div>

      {/* Employee Table */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse  border-purple-200">
          <thead className="bg-purple-100">
            <tr>
              {[
                "ID",
                "Name",
                "Mobile",
                "Email",
                "Status",
                "Responsibilities",
                "Role",
                "Password",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border text-purple-700 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="px-4 py-2 border border-purple-200">{employee.id}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.name}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.mobile}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.email}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.status}</td>
                  <td className="px-4 py-2 border border-purple-200">
                    {employee.responsibilities}
                  </td>
                  <td className="px-4 py-2 border border-purple-200">{employee.role}</td>
                  <td className="px-4 py-2 border border-purple-200">{employee.password}</td>
                  <td className="px-4 py-2 border border-purple-200">
                    <div className="flex items-center gap-2">
                      <button className="text-purple-600 hover:text-purple-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
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
          <div className="w-[30rem] p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-purple-700">Add Employee</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Employee ID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              {[
                { name: "name", placeholder: "Name" },
                { name: "mobile", placeholder: "Mobile Number" },
                { name: "email", placeholder: "Email" },
                { name: "status", placeholder: "Status" },
                { name: "responsibilities", placeholder: "Responsibilities" },
                { name: "password", placeholder: "Password", type: "password" },
              ].map((input) => (
                <input
                  key={input.name}
                  type={input.type || "text"}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              ))}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="sales">Sales</option>
                <option value="designer">Designer</option>
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 mr-2 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-100"
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

export default EmpRegistration;
