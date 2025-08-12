import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiUserCheck, FiUserX, FiMoreVertical } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- Helper component for displaying user status ---
const StatusBadge = ({ activeUser }) => {
    const isActive = activeUser === true || Number(activeUser) === 1;
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    return (
        <span className={`${baseClasses} ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            {isActive ? "Active" : "Inactive"}
        </span>
    );
};

// --- Main component for the User Management Page ---
export default function ListUserPageERP() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [actionUserId, setActionUserId] = useState(null);
    const actionMenuRef = useRef(null);
    const [actionMenuPos, setActionMenuPos] = useState({ top: 0, left: 0 });

    // --- Fetch users from the API on component mount ---
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:8080/api/users/allusers");
                // --- IMPORTANT: Filter out Admins from the initial data ---
                const nonAdminUsers = response.data.filter(user => user.role?.toLowerCase() !== 'admin');
                setUsers(nonAdminUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    // --- Memoized filtering for performance ---
    const filteredUsers = useMemo(() => {
        return users
            .filter(user => searchTerm === '' || user.username.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(user => roleFilter === 'All' || user.role === roleFilter)
            .filter(user => {
                const isActive = user.activeUser === true || Number(user.activeUser) === 1;
                return statusFilter === 'All' || (isActive && statusFilter === 'Active') || (!isActive && statusFilter === 'Inactive');
            });
    }, [users, searchTerm, roleFilter, statusFilter]);

    // --- Handle user actions (activate, deactivate, delete) ---
    // This function assumes 'users' and 'setUsers' are available from your component's state.
const handleAction = async (action, userId) => {
    // Find the full user object from state first. This is needed for the email.
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) {
        console.error("Could not find user to update.");
        alert("An error occurred: User not found.");
        return;
    }

    // Use a switch statement for cleaner, more scalable action handling.
    switch (action) {
        case 'activate':
            try {
                // Step 1: Activate the user in the database
                await axios.put(`http://localhost:8080/api/users/activate/${userId}`);
                
                // Update the UI immediately to show the user as active
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, activeUser: true } : u));
                console.log(`User ${userId} activated successfully.`);

                // Step 2: Attempt to send the welcome email
                try {
                    await axios.post('http://localhost:8080/api/email/send-welcome', {
                        to: userToUpdate.email,
                        username: userToUpdate.username,
                        role: userToUpdate.role
                    });
                    alert('User activated and welcome email sent!');
                } catch (emailError) {
                    // This error only triggers if the email fails, not the activation
                    console.error("Failed to send welcome email:", emailError);
                    alert('User was activated, but the welcome email could not be sent.');
                }
            } catch (activationError) {
                console.error("Failed to activate user:", activationError);
                alert('Failed to complete the activation process.');
            }
            break;

        case 'deactivate':
            try {
                await axios.put(`http://localhost:8080/api/users/deactivate/${userId}`);
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, activeUser: false } : u));

                 try {
                    await axios.post('http://localhost:8080/api/email/disabled', {
                        to: userToUpdate.email,
                        username: userToUpdate.username,
                        role: userToUpdate.role
                    });
                    alert('User activated and welcome email sent!');
            }catch(emailError) {
                    console.error("Failed to send welcome email:", emailError);
            }} catch (error) {
                alert('Failed to deactivate user.');
            }
            break;

        case 'delete':
            if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                try {
                    await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
                    setUsers(prev => prev.filter(u => u.id !== userId));
                } catch (error) {
                    alert('Failed to delete user.');
                }
            }
            break;

        case 'edit':
            // Placeholder for future implementation
            alert(`Edit functionality for user ID: ${userId} is not yet implemented.`);
            break;

        default:
            // Handles any unexpected action types
            console.warn(`Unknown action: ${action}`);
    }

    setActionUserId(null); // Close the action menu after any action is performed
};

    // --- Close action menu if clicked outside ---
    useEffect(() => {
        function handleClickOutside(event) {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setActionUserId(null);
            }
        }
        if (actionUserId !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [actionUserId]);

    // --- Helper to position the action menu ---
    const handleActionButtonClick = (userId, event) => {
        setActionUserId(actionUserId === userId ? null : userId);
        const rect = event.currentTarget.getBoundingClientRect();
        setActionMenuPos({
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX - 180, // Adjust to align right of button
        });
    };

    return (
        <div className="bg-slate-50 p-4 md:p-8 rounded-lg shadow-inner relative">
            {/* Header and Add User Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                <button className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-emerald-600 transition-all shadow-md flex items-center gap-2">
                    + Add New User
                </button>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <div>
                    <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="All">All Roles</option>
                        <option value="manager">Manager</option>
                        <option value="accountant">Accountant</option>
                    </select>
                </div>
                <div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto border relative">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th className="px-6 py-3">Username</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Phone Number</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{user.username}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                {/* Corrected property names like user.phoneNumber */}
                                <td className="px-6 py-4">{user.phoneNumber}</td>
                                <td className="px-6 py-4"><StatusBadge activeUser={user.activeUser} /></td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="p-2 rounded-full hover:bg-slate-200"
                                        onClick={e => handleActionButtonClick(user.id, e)}
                                    >
                                        <FiMoreVertical />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="text-center p-8 text-slate-500">No users found.</div>
                )}
            </div>
            
            {/* Floating Action Menu */}
            <AnimatePresence>
                {actionUserId && (
                    <motion.div
                        ref={actionMenuRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        style={{ top: actionMenuPos.top, left: actionMenuPos.left }}
                        className="fixed z-50 w-56 bg-white rounded-lg shadow-xl border"
                    >
                        <div className="py-2">
                            {users.find(u => u.id === actionUserId)?.activeUser ? (
                                <button onClick={() => handleAction('deactivate', actionUserId)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    <FiUserX /> Deactivate
                                </button>
                            ) : (
                                <button onClick={() => handleAction('activate', actionUserId)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50">
                                    <FiUserCheck /> Activate
                                </button>
                            )}
                            <button onClick={() => handleAction('edit', actionUserId)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                <FiEdit /> Edit User
                            </button>
                            <button onClick={() => handleAction('delete', actionUserId)} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <FiTrash2 /> Delete
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-slate-600">Showing {filteredUsers.length} of {users.length} users</span>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-semibold bg-white border rounded-lg hover:bg-slate-100 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-4 py-2 text-sm font-semibold bg-white border rounded-lg hover:bg-slate-100 disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    );
}