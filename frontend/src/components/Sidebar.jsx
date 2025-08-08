import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiHome, FiUsers, FiBriefcase, FiFileText, FiDollarSign, 
    FiTrendingUp, FiSettings, FiLogOut, FiChevronDown, FiMenu, FiX 
} from 'react-icons/fi';

// --- Role-based SVG Profile Icons ---
const AdminIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" className="fill-emerald-100" />
        <path d="M50 30 L65 45 L50 60 L35 45 Z" className="fill-emerald-400 stroke-emerald-600" strokeWidth="3"/>
        <path d="M50 60 V 75 M35 65 L25 75 M65 65 L75 75" className="stroke-emerald-500" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

const ManagerIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" className="fill-sky-100" />
        <rect x="30" y="30" width="40" height="40" rx="5" className="fill-sky-400 stroke-sky-600" strokeWidth="3"/>
        <path d="M40 50 H 60 M 50 40 V 60" className="stroke-white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

const AccountantIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" className="fill-amber-100" />
        <path d="M30 35 H 70 M 30 50 H 70 M 30 65 H 55" className="stroke-amber-500" strokeWidth="3" strokeLinecap="round"/>
        <rect x="25" y="25" width="50" height="50" rx="5" className="stroke-amber-600 fill-none" strokeWidth="3"/>
    </svg>
);

// --- Role Configuration ---
const ROLES = {
    ADMIN: 'Admin',
    FINANCE_MANAGER: 'Finance Manager',
    ACCOUNTANT: 'Accountant',
};

const USER_PROFILES = {
    [ROLES.ADMIN]: { name: 'Admin User', icon: <AdminIcon /> },
    [ROLES.FINANCE_MANAGER]: { name: 'Manager User', icon: <ManagerIcon /> },
    [ROLES.ACCOUNTANT]: { name: 'Accountant User', icon: <AccountantIcon /> },
};

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'users', label: 'Manage Users', icon: FiUsers, roles: [ROLES.ADMIN] },
    { id: 'customers', label: 'Customers/Vendors', icon: FiBriefcase, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'invoices', label: 'Invoices', icon: FiFileText, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'payments', label: 'Payments', icon: FiDollarSign, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.ACCOUNTANT] },
    { id: 'expenses', label: 'Expenses', icon: FiTrendingUp, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER] },
    { id: 'reports', label: 'Reports', icon: FiTrendingUp, roles: [ROLES.ADMIN, ROLES.FINANCE_MANAGER] },
];

// --- Sidebar Component ---
const Sidebar = ({ role, isSidebarOpen, setSidebarOpen }) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const userProfile = USER_PROFILES[role];

    const filteredNavItems = navItems.filter(item => item.roles.includes(role));

    return (
        <>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-full w-64 bg-slate-800 text-white flex flex-col z-50 md:relative md:translate-x-0"
                    >
                        {/* Logo and Profile */}
                        <div className="p-6 flex flex-col items-center border-b border-slate-700">
                             <div className="text-2xl font-bold text-white mb-4">
                                Financier<span className="text-emerald-400">ERP</span>
                            </div>
                            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-emerald-400 to-sky-500 mb-2">
                                {userProfile.icon}
                            </div>
                            <h3 className="font-semibold text-lg">{userProfile.name}</h3>
                            <p className="text-sm text-slate-400">{role}</p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {filteredNavItems.map(item => (
                                <a
                                    key={item.id}
                                    href="#"
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        if (window.innerWidth < 768) setSidebarOpen(false);
                                    }}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        activeItem === item.id 
                                        ? 'bg-emerald-500 text-white shadow-lg' 
                                        : 'text-slate-300 hover:bg-slate-700'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-700">
                             <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700">
                                <FiSettings className="w-5 h-5" />
                                <span>Settings</span>
                            </a>
                             <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700">
                                <FiLogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
             {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}
        </>
    );
};
export default Sidebar;

// --- Main Dashboard Layout ---
