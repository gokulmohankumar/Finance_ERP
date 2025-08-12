import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiUploadCloud, FiPaperclip, FiXCircle, FiDollarSign, FiCalendar, FiFileText } from 'react-icons/fi';

// --- Helper Components ---

// A custom animated input field for a consistent look and feel
const AnimatedInput = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
        </div>
        <motion.input
            whileFocus={{
                borderColor: 'rgb(16 185 129)',
                boxShadow: '0 0 0 2px rgb(16 185 129 / 20%)',
            }}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none transition-shadow"
            {...props}
        />
    </div>
);

// --- Main Component ---

export default function SubmitExpensePage() {
    // State for form fields
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [receiptFile, setReceiptFile] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState('');
    
    // State for UI feedback
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

    // Mock categories - in a real app, fetch these from your API
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Simulating API call to fetch categories
        const fetchedCategories = [
            { id: 1, name: 'Travel' },
            { id: 2, name: 'Meals' },
            { id: 3, name: 'Software' },
            { id: 4, name: 'Office Supplies' },
            { id: 5, name: 'Marketing' },
        ];
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
            setCategory(fetchedCategories[0].id); // Set default category
        }
    }, []);
    
    // Handle file selection and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReceiptFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeReceipt = () => {
        setReceiptFile(null);
        setReceiptPreview('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: '' });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('expenseDate', expenseDate);
        formData.append('categoryId', category);
        formData.append('description', description);
        if (receiptFile) {
            formData.append('receipt', receiptFile);
        }
        // You would also append the submitting user's ID here
        // formData.append('submittedByUserId', loggedInUser.id);

        try {
            // Replace with your actual API endpoint
            const response = await axios.post('http://localhost:8080/api/expenses/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}` // Add auth token
                },
            });

            setSubmitStatus({ success: true, message: 'Expense submitted successfully for approval!' });
            // Reset form
            setTitle('');
            setAmount('');
            setExpenseDate('');
            setDescription('');
            removeReceipt();

        } catch (error) {
            console.error("Expense submission failed:", error);
            setSubmitStatus({ success: false, message: 'Submission failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants for Framer Motion
    const formContainerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const formItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="bg-slate-50 p-4 md:p-8 rounded-lg shadow-inner">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Submit New Expense</h1>
                    <p className="text-slate-500">Fill out the details below to submit an expense for approval.</p>
                </div>

                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Left Column: Form Fields */}
                        <div className="space-y-6">
                            <motion.div variants={formItemVariants}>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Expense Title</label>
                                <AnimatedInput icon={<FiFileText />} type="text" placeholder="e.g., Client Dinner in New York" value={title} onChange={e => setTitle(e.target.value)} required />
                            </motion.div>

                            <motion.div variants={formItemVariants} className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Amount (USD)</label>
                                    <AnimatedInput icon={<FiDollarSign />} type="number" placeholder="150.00" value={amount} onChange={e => setAmount(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Date of Expense</label>
                                    <AnimatedInput icon={<FiCalendar />} type="date" value={expenseDate} onChange={e => setExpenseDate(e.target.value)} required />
                                </div>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </motion.div>

                            <motion.div variants={formItemVariants}>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Description</label>
                                <textarea
                                    placeholder="Provide a brief description of the expense..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    rows="4"
                                ></textarea>
                            </motion.div>
                        </div>

                        {/* Right Column: File Upload */}
                        <motion.div variants={formItemVariants}>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">Upload Receipt</label>
                            <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center h-full flex flex-col justify-center items-center hover:border-emerald-500 transition-colors">
                                {receiptPreview ? (
                                    <div className="relative w-full">
                                        <img src={receiptPreview} alt="Receipt Preview" className="max-h-64 mx-auto rounded-lg object-contain" />
                                        <button onClick={removeReceipt} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600">
                                            <FiXCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <FiUploadCloud className="w-12 h-12 mx-auto text-slate-400" />
                                        <p className="mt-2 text-slate-500">Drag & drop your file here or <span className="font-semibold text-emerald-600">browse</span></p>
                                        <input type="file" onChange={handleFileChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,application/pdf" />
                                    </>
                                )}
                            </div>
                            {receiptFile && !receiptPreview && (
                                <div className="mt-4 flex items-center justify-between bg-slate-100 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FiPaperclip className="text-slate-500"/>
                                        <span className="text-sm text-slate-700">{receiptFile.name}</span>
                                    </div>
                                    <button onClick={removeReceipt} className="text-red-500 hover:text-red-700">
                                        <FiXCircle />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Submission Button and Status */}
                    <motion.div className="mt-10 text-right" variants={formItemVariants}>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-all shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                        </button>
                    </motion.div>
                    
                    {submitStatus.message && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-4 rounded-lg text-center ${submitStatus.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
                        >
                            {submitStatus.message}
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
}
