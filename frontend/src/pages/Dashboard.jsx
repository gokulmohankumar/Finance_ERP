import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

const ROLES = {
  ADMIN: 'Admin',
  FINANCE_MANAGER: 'Finance Manager',
  ACCOUNTANT: 'Accountant',
};

export default function DashboardLayout() {
    const [role, setRole] = useState(ROLES.ADMIN);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen h-[100%] bg-slate-100">
            <Sidebar role={role} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-600 md:hidden">
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h1 className="text-xl font-semibold text-slate-800">Dashboard Overview</h1>
                    
                    {/* Role Switcher for Demo */}
                    <div className="relative">
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="appearance-none bg-slate-200 text-slate-700 font-semibold py-2 pl-4 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value={ROLES.ADMIN}>Admin</option>
                            <option value={ROLES.FINANCE_MANAGER}>Finance Manager</option>
                            <option value={ROLES.ACCOUNTANT}>Accountant</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
                    <motion.div
                        key={role} // Re-trigger animation on role change
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="container mx-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Welcome, {role}!</h2>
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <p className="text-slate-600">
                                This is the main content area. The sidebar navigation on the left is dynamically rendered based on your selected role. 
                                Try switching roles using the dropdown in the header to see how the available options change.
                            </p>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
