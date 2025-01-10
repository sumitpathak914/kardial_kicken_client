import React, { useState } from 'react';
import SidebarComponent from './Sidebar';
import Home from '../Dashboard/Home';





const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <SidebarComponent activeTab={activeTab} onTabClick={handleTabClick} />

            {/* Main Content */}
            <div className="flex-1 p-8 bg-white rounded-l-lg shadow-lg">
                <div className="mt-6">
                    {activeTab === 'Dashboard' && <Home />}
                    {/* {activeTab === 'Add Employee' && <Hr_AddEMP />} */}
                    {/* {activeTab === 'Attendance' && <Emp_Attendance />} */}
                    {/* {activeTab === 'Hr_Attendance' && <Hr_Attendance_EMP_List />} */}
                    {/* {activeTab === 'Work Report' && <div>Content for Work Report</div>} */}
                    {/* {activeTab === 'Leave Management' && <Emp_LeaveManagment />} */}
                    {/* {activeTab === 'Document' && <div>Content for Document</div>} */}
                    {/* {activeTab === 'Salary Management' && <div>Content for Salary Management</div>} */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
