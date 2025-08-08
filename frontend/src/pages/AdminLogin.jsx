// src/App.js

import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Icon for password visibility
import { motion } from 'framer-motion'; // For animations

// IMPORTANT: Make sure to place your illustration in the src/assets folder
// and update the import path if necessary.


// A custom reusable component for the animated toggle switch
const ToggleSwitch = ({ checked, onChange }) => {
  const switchVariants = {
    checked: { backgroundColor: '#22c55e' /* green-500 */ },
    unchecked: { backgroundColor: '#d1d5db' /* gray-300 */ },
  };

  const handleVariants = {
    checked: { x: 22 },
    unchecked: { x: 0 },
  };

  return (
    <motion.div
      className="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer"
      variants={switchVariants}
      animate={checked ? 'checked' : 'unchecked'}
      transition={{ duration: 0.2 }}
      onClick={onChange}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md"
        variants={handleVariants}
        animate={checked ? 'checked' : 'unchecked'}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

function LoginPage() {
  // State management for form inputs and toggles
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      email,
      password,
      rememberMe,
    });
    alert('Login form submitted! Check the console for data.');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      
      {/* Left Side: Illustration and Gradient Background */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-400 to-green-700 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Ensure the path to your illustration is correct */}

        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-8 md:p-16">
        <div className="w-full max-w-md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Welcome Text */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-gray-600">Welcome back!</h2>
              <h1 className="text-4xl font-bold text-gray-800">Bangla Market</h1>
              <p className="text-gray-500 mt-2">Nice to see you again!</p>
            </motion.div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants} className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-green-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ToggleSwitch
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </div>
                <a href="#" className="text-sm text-green-600 hover:underline">
                  Forgot password?
                </a>
              </motion.div>

              {/* Login Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-300 shadow-lg"
                >
                  Login
                </button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <motion.p variants={itemVariants} className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-green-600 hover:underline">
                Get Started
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;