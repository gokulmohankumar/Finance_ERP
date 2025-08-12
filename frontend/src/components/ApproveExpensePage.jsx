import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiUser, FiCalendar, FiDollarSign, FiFileText, FiTag, FiCheck, FiX, FiEye, FiPaperclip, FiMessageSquare, FiSend } from 'react-icons/fi';

// --- Image Modal Component ---
const ImageViewer = ({ imageUrl, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
        <motion.img
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            src={imageUrl}
            alt="Full-size receipt"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
        />
    </motion.div>
);

// --- Denial Reason Modal Component ---
const DenialModal = ({ onSubmit, onCancel }) => {
    const [reason, setReason] = useState('');
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
                <h2 className="text-xl font-bold text-slate-800 mb-4">Reason for Denial</h2>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a clear reason for denying this expense..."
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="4"
                />
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onCancel} className="font-semibold text-slate-600 hover:text-slate-800">Cancel</button>
                    <button 
                        onClick={() => onSubmit(reason)}
                        disabled={!reason}
                        className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 disabled:bg-slate-400"
                    >
                        Deny Expense
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Comment Section Component ---
const CommentSection = ({ expense, onCommentSubmit }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        onCommentSubmit(expense.id, newComment);
        setNewComment('');
    };

    return (
        <div className="bg-slate-100 p-6 border-t border-slate-200">
            <h4 className="font-bold text-slate-700 mb-4">Comments</h4>
            <div className="space-y-4 max-h-48 overflow-y-auto mb-4 pr-2">
                {expense.comments?.length > 0 ? (
                    expense.comments.map(comment => (
                        <div key={comment.id} className="text-sm">
                            <p className="font-semibold text-slate-800">{comment.author?.username}</p>
                            <p className="text-slate-600">{comment.commentText}</p>
                            <p className="text-xs text-slate-400 mt-1">{new Date(comment.commentedAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500 italic">No comments yet.</p>
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or leave a note..."
                    className="flex-grow p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button type="submit" className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600">
                    <FiSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};


// --- Main Approval Page Component ---
export default function ApproveExpensePage() {
    const [pendingExpenses, setPendingExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [denialInfo, setDenialInfo] = useState({ showModal: false, expenseId: null });
    const [expandedExpenseId, setExpandedExpenseId] = useState(null);

    useEffect(() => {
        const fetchPendingExpenses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/expenses/pending');
                if (Array.isArray(response.data)) {
                    setPendingExpenses(response.data);
                } else {
                    setPendingExpenses([]);
                }
            } catch (error) {
                console.error("Failed to fetch pending expenses:", error);
                setPendingExpenses([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPendingExpenses();
    }, []);

    const handleAction = async (expenseId, action, reason = '') => {
        try {
            // In a real app, you'd get the accountant's user ID from auth context
            const accountantId = 2; // Mock accountant ID
            const payload = { accountantId, denialReason: reason };
            
            // Call the appropriate backend endpoint
            await axios.put(`http://localhost:8080/api/expenses/${action}/${expenseId}`, payload);

            // Remove the expense from the list for immediate UI feedback
            setPendingExpenses(prev => prev.filter(exp => exp.id !== expenseId));

        } catch (error) {
            console.error(`Failed to ${action} expense:`, error);
            alert(`Could not ${action} the expense. Please try again.`);
        }
        // Close the denial modal if it was open
        if (denialInfo.showModal) {
            setDenialInfo({ showModal: false, expenseId: null });
        }
    };

    const handleCommentSubmit = async (expenseId, commentText) => {
        try {
            // In a real app, get the current user's ID from auth context
            const authorId = 2; // Mock accountant ID
            const payload = { authorId, commentText };

            // Call the new backend endpoint to post a comment
            const response = await axios.post(`http://localhost:8080/api/expenses/${expenseId}/comments`, payload);
            const newComment = response.data;

            // Optimistically update the UI with the new comment
            setPendingExpenses(prevExpenses =>
                prevExpenses.map(expense => {
                    if (expense.id === expenseId) {
                        // Ensure comments array exists before spreading
                        const existingComments = expense.comments || [];
                        return { ...expense, comments: [...existingComments, newComment] };
                    }
                    return expense;
                })
            );
        } catch (error) {
            console.error("Failed to post comment:", error);
            alert("Could not submit your comment. Please try again.");
        }
    };
    
    if (isLoading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div className="bg-slate-50 p-4 md:p-8 rounded-lg shadow-inner">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Expense Approval Queue</h1>
            
            {pendingExpenses.length > 0 ? (
                <div className="space-y-6">
                    {pendingExpenses.map(expense => (
                        <motion.div
                            key={expense.id}
                            layout
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="md:col-span-2 p-6">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-4">{expense.title}</h2>
                                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                        <div className="flex items-center gap-2 text-slate-600"><FiUser /> <strong>Submitted By:</strong> {expense.submittedBy?.username || 'N/A'}</div>
                                        <div className="flex items-center gap-2 text-slate-600"><FiCalendar /> <strong>Expense Date:</strong> {expense.expenseDate}</div>
                                        <div className="flex items-center gap-2 text-slate-600"><FiDollarSign /> <strong>Amount:</strong> ${expense.amount?.toFixed(2)}</div>
                                        <div className="flex items-center gap-2 text-slate-600"><FiTag /> <strong>Category:</strong> {expense.category?.name || 'N/A'}</div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-slate-700">Description:</h4>
                                        <p className="text-slate-600 whitespace-pre-wrap">{expense.description || 'No description provided.'}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-100 p-6 flex flex-col justify-center items-center">
                                    {expense.receipt?.fileUrl ? (
                                        <div className="text-center">
                                            <img 
                                                src={`http://localhost:8080${expense.receipt.fileUrl}`} 
                                                alt="Receipt" 
                                                className="max-h-40 rounded-md border-2 border-slate-200"
                                            />
                                            <button onClick={() => setSelectedImage(`http://localhost:8080${expense.receipt.fileUrl}`)} className="mt-4 text-sm font-semibold text-emerald-600 flex items-center gap-2 mx-auto">
                                                <FiEye /> View Full Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-500">
                                            <FiPaperclip className="mx-auto w-8 h-8 mb-2"/>
                                            No receipt attached.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 flex justify-between items-center">
                                <button 
                                    onClick={() => setExpandedExpenseId(expandedExpenseId === expense.id ? null : expense.id)}
                                    className="text-sm font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-2"
                                >
                                    <FiMessageSquare />
                                    <span>Comments ({expense.comments?.length || 0})</span>
                                </button>
                                <div className="flex gap-4">
                                    <button onClick={() => setDenialInfo({ showModal: true, expenseId: expense.id })} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600"><FiX /> Deny</button>
                                    <button onClick={() => handleAction(expense.id, 'approve')} className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-600"><FiCheck /> Approve</button>
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedExpenseId === expense.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <CommentSection expense={expense} onCommentSubmit={handleCommentSubmit} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            ) : (
                 <div className="text-center p-12 bg-white rounded-lg shadow-sm">
                    <p className="text-slate-500">There are no pending expenses to review.</p>
                </div>
            )}

            {/* Modals */}
            <AnimatePresence>
                {selectedImage && <ImageViewer imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
                {denialInfo.showModal && (
                    <DenialModal 
                        onCancel={() => setDenialInfo({ showModal: false, expenseId: null })}
                        onSubmit={(reason) => handleAction(denialInfo.expenseId, 'deny', reason)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
