import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';// Assuming Sidebar.js is in the same directory or a components folder
import ManageUsersPage from '../components/ManageUser';

// --- Main Dashboard Layout ---

// You would typically define ROLES and navItems in a shared config file
// and import them here and in Sidebar.js to avoid duplication.
const ROLES = {
    ADMIN: 'Admin',
    FINANCE_MANAGER: 'Finance Manager',
    ACCOUNTANT: 'Accountant',
};

const navItems = [
    { id: 'dashboard', label: 'Dashboard', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'users', label: 'Manage Users', roles: [ROLES.ADMIN] },
    { id: 'customers', label: 'Customers/Vendors', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'invoices', label: 'Invoices', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'payments', label: 'Payments', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'expenses', label: 'Expenses', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER] },
    { id: 'reports', label: 'Reports', roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER] },
];

export default function DashboardLayout() {
    const [role, setRole] = useState(ROLES.ADMIN);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('Dashboard');

    // When role changes, reset active page if the new role doesn't have access
    React.useEffect(() => {
        const availablePages = navItems.filter(item => item.roles.includes(role)).map(item => item.label);
        if (!availablePages.includes(activePage)) {
            setActivePage('Dashboard');
        }
    }, [role, activePage]);

    return (
        <div className="flex min-h-screen ">
            <Sidebar 
                role={role} 
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
            />
            
            <div className="flex-1 flex flex-col bg-slate-100">
                <header className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm p-4 flex justify-between items-center z-20">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-600 md:hidden">
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h1 className="text-xl font-semibold text-slate-800">{activePage}</h1>
                    
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

                <main className="flex-1 p-6 ">
                    <motion.div
                        key={activePage} // Re-trigger animation on page change
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="container mx-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Welcome to the {activePage} Page</h2>
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <p className="text-slate-600">
                                Content for the {activePage} page goes here. This area will update when you select a different item from the sidebar. Your current role is <strong>{role}</strong>.
                            </p>
                        </div>
                    </motion.div>

                    <ManageUsersPage/>
                </main>
            </div>
        </div>
    );
}
