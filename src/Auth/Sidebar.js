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
    const navItems = [
        { to: "/dashboard", icon: <GiSofa />, label: "Dashboard" },
        { to: "/registration", icon: <FaUserPlus />, label: "EMP Registration" },
        { to: "/add-client", icon: <FaThLarge />, label: "Add Client" },
        { to: "/add-architect", icon: <FaFileAlt />, label: "Add Architect" },
        { to: "/add-category", icon: <FaListAlt />, label: "Add Category" },
        { to: "/add-quality", icon: <FaPlus />, label: "Add Quality" },
        // { to: "/add-material-product", icon: <FaBoxes />, label: "Add Material / Product" },
        { to: "/Rate-Section", icon: <FaFileInvoice />, label: "Rate Section" },
        { to: "/create-process", icon: <FaFileInvoice />, label: "Process" },
    ];
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
                    Kordial
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 mt-8">
                <ul className="space-y-5">
                    {navItems.map(({ to, icon, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className="flex items-center px-5 py-3 text-purple-800 transition-all duration-300 ease-in-out transform bg-transparent rounded-lg hover:bg-purple-600 hover:text-white hover:scale-100"
                                onClick={() => setTimeout(() => window.location.reload(), 100)} // Adds slight delay before reload
                            >
                                <span className="mr-3">{icon}</span>
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
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
