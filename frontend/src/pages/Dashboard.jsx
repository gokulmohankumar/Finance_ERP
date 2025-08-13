import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { 
    FiHome, 
    FiUsers, 
    FiFileText, 
    FiDollarSign, 
    FiBriefcase, 
    FiTrendingUp, 
    FiCreditCard 
} from 'react-icons/fi';

import { useAuth } from '../context/AuthProvider';
import Sidebar from '../components/Sidebar';
import ManageUsersPage from '../components/ManageUser';
import ExpenseTracker from './ExpenseTracker';
import VendorPage from './VendorPage';
import Analytics from './Analytics';
// Define roles to EXACTLY match the strings from your backend API
const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant'
};

// This list defines all possible navigation items and their required roles
const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, roles: [ROLES.ADMIN, ROLES.MANAGER] },
    { id: 'users', label: 'Manage Users', icon: FiUsers, roles: [ROLES.ADMIN] },
    { id: 'customers', label: 'Customers/Vendors', icon: FiBriefcase, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT] },
    { id: 'invoices', label: 'Invoices', icon: FiFileText, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT] },
    { id: 'payments', label: 'Payments', icon: FiDollarSign, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT] },
    { id: 'expenses', label: 'Expenses', icon: FiCreditCard, roles: [ROLES.ADMIN, ROLES.MANAGER,ROLES.ACCOUNTANT] },
    { id: 'reports', label: 'Reports', icon: FiTrendingUp, roles: [ROLES.ADMIN, ROLES.MANAGER] },
];

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const role = user?.role || 'Guest';

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('Dashboard');

    // --- MODIFIED FILTERING LOGIC ---
    // This now correctly implements the "Admin sees all" rule.
    const accessibleNavItems = allNavItems.filter(
        item => role === ROLES.ADMIN || item.roles.includes(role)
    );

    useEffect(() => {
        const isPageAccessible = accessibleNavItems.some(item => item.label === activePage);
        if (!isPageAccessible) {
            setActivePage('Dashboard');
        }
    }, [role, activePage, accessibleNavItems]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderPageContent = () => {
        switch (activePage) {
            case 'Dashboard':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username || 'User'}!</h2>
                        <Analytics/>
                    </>
                );
            
            case 'Manage Users':
                if (role === ROLES.ADMIN) {
                    return <ManageUsersPage />;
                } else {
                    return <p className="text-red-500 font-semibold">Access Denied. You do not have permission to view this page.</p>;
                }
            
            case 'Expenses':
                if (role === ROLES.ADMIN || role === ROLES.MANAGER || role === ROLES.ACCOUNTANT) {
                    return <ExpenseTracker/>
                } else {
                    return <p className="text-red-500 font-semibold">Access Denied. You do not have permission to view this page.</p>;
                };
             case 'Customers/Vendors':
                if (role === ROLES.ADMIN || role === ROLES.MANAGER || role === ROLES.ACCOUNTANT) {
                    return <VendorPage/>
                } else {
                    return <p className="text-red-500 font-semibold">Access Denied. You do not have permission to view this page.</p>;
                };
            
            default:
                return <p>Content for the {activePage} page goes here.</p>;
        }
    };
    
    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar 
                user={user}
                navItems={accessibleNavItems} 
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
                   <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-semibold transition-colors duration-200">
                        <FiLogOut size={20} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </header>

                <main className="flex-1 p-6">
                    <motion.div
                        key={activePage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="container mx-auto"
                    >
                        <div className="bg-white p-8 rounded-xl shadow-md min-h-[300px]">
                           {renderPageContent()}
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}