import React, { useState } from 'react';
import { motion } from 'framer-motion';
import registerImg from '../assets/bg_home.jpg';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('manager');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username,
        mobilenumber,
        email,
        role,
        password,
      });
      if (response.data === 'registered') {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during registration. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen font-sans overflow-hidden">
      {/* Left Side: Full Background Image (Flipped) */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src={registerImg}
            alt="Register Illustration"
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        </motion.div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-0">
        <div className="w-full max-w-md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Welcome Text */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-gray-600">Create your account</h2>
              <h1 className="text-4xl font-bold text-gray-800">Finance ERP</h1>
              <p className="text-gray-500 mt-2">Register to get started!</p>
            </motion.div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Mobile Number Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobilenumber}
                  onChange={(e) => setMobilenumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Role Select */}
              <motion.div variants={itemVariants}>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                >
                  <option value="manager">Manager</option>
                  <option value="accountant">Accountant</option>
                </select>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div variants={itemVariants}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
                {!passwordMatch && (
                  <span className="text-red-500 text-sm">Passwords do not match.</span>
                )}
                {password && confirmPassword && passwordMatch && (
                  <span className="text-green-600 text-sm">Passwords match.</span>
                )}
              </motion.div>

              {/* Register Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-300 shadow-lg"
                >
                  Register
                </button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.p variants={itemVariants} className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-green-600 hover:underline">
                Login
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default RegisterPage;