import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function ManageUsersPage() {
    // Mock data - in a real app, this would come from an API
    const [userRequests, setUserRequests] = useState([
        { id: 1, name: 'Alice Johnson', role: 'Accountant', status: 'Pending' },
        { id: 2, name: 'Bob Williams', role: 'Finance Manager', status: 'Pending' },
    ]);

    const [activeUsers, setActiveUsers] = useState([
        { id: 3, name: 'Charlie Brown', role: 'Accountant', status: 'Active' },
        { id: 4, name: 'Diana Miller', role: 'Admin', status: 'Active' },
    ]);

    /**
     * Handles approving or denying a user request.
     * @param {number} id - The ID of the user request to handle.
     * @param {string} newStatus - The new status ('Active' or 'Denied').
     */
    const handleRequest = (id, newStatus) => {
        const request = userRequests.find(req => req.id === id);
        if (!request) return;

        // Remove the request from the pending list
        setUserRequests(userRequests.filter(req => req.id !== id));

        // If approved, add the user to the active list
        if (newStatus === 'Active') {
            setActiveUsers([...activeUsers, { ...request, status: 'Active' }]);
        }
        // If denied, the user is simply removed from the pending list and no further action is taken.
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">User Management</h2>

            {/* Pending Requests Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-slate-700">Pending Access Requests</h3>
                <div className="space-y-4">
                    {userRequests.length > 0 ? userRequests.map(request => (
                        <div key={request.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                                <p className="font-bold text-slate-800">{request.name}</p>
                                <p className="text-sm text-slate-500">{request.role}</p>
                            </div>
                            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                                <button 
                                    onClick={() => handleRequest(request.id, 'Active')}
                                    className="flex items-center gap-2 bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <FiCheckCircle />
                                    Approve
                                </button>
                                <button 
                                     onClick={() => handleRequest(request.id, 'Denied')}
                                    className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <FiXCircle />
                                    Deny
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-500 italic">No pending user requests.</p>
                    )}
                </div>
            </div>

            {/* Active Users Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-slate-700">Active Users</h3>
                <div className="space-y-2">
                    {activeUsers.map(user => (
                         <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                                <p className="font-bold text-slate-800">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.role}</p>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                                <FiCheckCircle />
                                <span>Active</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
