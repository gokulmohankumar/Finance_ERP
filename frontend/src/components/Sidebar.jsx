import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

// --- 1. ADD SVG ICON COMPONENTS ---
// These are simple components that render your custom profile pictures.

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

// --- 2. ADD ROLE MAPPING OBJECT ---
// This object connects the role string to the correct icon component.
const USER_PROFILES = {
    'Admin': { icon: <AdminIcon /> },
    'manager': { icon: <ManagerIcon /> },
    'accountant': { icon: <AccountantIcon /> },
};


export default function Sidebar({ user, navItems, isSidebarOpen, setSidebarOpen, activePage, setActivePage }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Safely get the profile icon, with a fallback for unknown roles
    const userProfile = USER_PROFILES[user?.role] || { icon: <FiSettings /> };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-screen w-64 bg-slate-800 text-white flex flex-col z-50 md:sticky md:translate-x-0"
                    >
                        {/* Header Section */}
                        <div className="p-6 flex flex-col items-center border-b border-slate-700 flex-shrink-0">
                            <div className="text-2xl font-bold text-white mb-4">
                                Financier<span className="text-emerald-400">ERP</span>
                            </div>

                            {/* --- 3. ADD JSX TO RENDER THE PROFILE PICTURE --- */}
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-emerald-400 to-sky-500 mb-2">
                                {userProfile.icon}
                            </div>

                            {user && (
                                <>
                                    <h3 className="font-semibold text-lg">{user.username}</h3>
                                    <p className="text-sm text-slate-400">{user.role}</p>
                                </>
                            )}
                        </div>

                        {/* Navigation Section - This part is already correct */}
                        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            {navItems.map(item => {
                                const IconComponent = item.icon;
                                return (
                                    <a
                                        key={item.id}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActivePage(item.label);
                                            if (window.innerWidth < 768) setSidebarOpen(false);
                                        }}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            activePage === item.label
                                                ? 'bg-emerald-500 text-white shadow-lg' 
                                                : 'text-slate-300 hover:bg-slate-700'
                                        }`}
                                    >
                                        {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
                                        <span>{item.label}</span>
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Footer Section - This part is already correct */}
                        <div className="p-4 border-t border-slate-700 mt-auto flex-shrink-0">
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700">
                                <FiSettings className="w-5 h-5" />
                                <span>Settings</span>
                            </a>
                            <a href="#" onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700">
                                <FiLogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </a>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
            {/* Mobile overlay */}
            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}
        </>
    );
}