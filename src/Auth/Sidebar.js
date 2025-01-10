import {
    FaBoxes,
    FaFileAlt,
    FaFileInvoice,
    FaListAlt,
    FaPlus, FaThLarge,
    FaUserPlus
} from 'react-icons/fa'; // Importing icons
import { GiSofa } from 'react-icons/gi'; // Importing furniture icon
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear all session storage data
        sessionStorage.clear();

        // Redirect to login page (or root page)
        navigate('/');
        window.location.reload();
    };

    return (
        <aside className="flex flex-col w-64 h-screen text-purple-800 bg-white shadow-2xl">
            {/* Title Section */}
            <div className="p-6 text-4xl font-extrabold text-center text-purple-900 transform hover:scale-105">
                <span className="text-transparent text-gradient bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700">
                    Kardial
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 mt-8">
                <ul className="space-y-5">
                    {/* Dashboard */}
                    <li>
                        <Link
                            to="/dashboard"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <GiSofa className="mr-3" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {/* EMP Registration */}
                    <li>
                        <Link
                            to="/registration"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaUserPlus className="mr-3" />
                            <span>EMP Registration</span>
                        </Link>
                    </li>

                    {/* Add Client */}
                    <li>
                        <Link
                            to="/add-client"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaThLarge className="mr-3" />
                            <span>Add Client</span>
                        </Link>
                    </li>

                    {/* Add Aatricture */}
                    <li>
                        <Link
                            to="/add-Architect"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaFileAlt className="mr-3" />
                            <span>Add Aatricture</span>
                        </Link>
                    </li>

                    {/* Add Category */}
                    <li>
                        <Link
                            to="/add-category"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaListAlt className="mr-3" />
                            <span>Add Category</span>
                        </Link>
                    </li>

                    {/* Add Quality */}
                    <li>
                        <Link
                            to="/add-quality"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaPlus className="mr-3" />
                            <span>Add Quality</span>
                        </Link>
                    </li>

                    {/* Add Material / Product */}
                    <li>
                        <Link
                            to="/add-material-product"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaBoxes className="mr-3" />
                            <span>Add Material / Product</span>
                        </Link>
                    </li>

                    {/* Quotation */}
                    <li>
                        <Link
                            to="/Final_Client"
                            className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100">
                            <FaFileInvoice className="mr-3" />
                            <span>Process</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-6 mt-auto">
                <button className="w-full py-2 text-white transition-all duration-300 ease-in-out transform bg-purple-600 rounded-md hover:bg-purple-700 hover:scale-105" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
