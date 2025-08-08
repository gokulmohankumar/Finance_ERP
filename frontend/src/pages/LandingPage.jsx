import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiDollarSign, FiFileText, FiArrowRight, FiUsers, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';


// --- SVG Illustration Components ---
const HeroIllustration = () => (
  <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 10)">
      {/* Background shapes */}
      <motion.rect 
        x="50" y="50" width="400" height="300" rx="20" 
        className="fill-emerald-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle 
        cx="80" cy="80" r="20" className="fill-emerald-200"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
      />
       <motion.circle 
        cx="420" cy="320" r="30" className="fill-emerald-100"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
      />

      {/* Main chart element */}
      <motion.rect 
        x="100" y="100" width="300" height="200" rx="10" 
        className="fill-white shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      
      {/* Chart bars */}
      <motion.rect x="130" y="180" width="40" height="90" rx="5" className="fill-emerald-400" initial={{ height: 0 }} animate={{ height: 90 }} transition={{ delay: 0.8, type: 'spring' }} />
      <motion.rect x="190" y="150" width="40" height="120" rx="5" className="fill-emerald-500" initial={{ height: 0 }} animate={{ height: 120 }} transition={{ delay: 1.0, type: 'spring' }} />
      <motion.rect x="250" y="200" width="40" height="70" rx="5" className="fill-emerald-300" initial={{ height: 0 }} animate={{ height: 70 }} transition={{ delay: 1.2, type: 'spring' }} />
      <motion.rect x="310" y="170" width="40" height="100" rx="5" className="fill-emerald-400" initial={{ height: 0 }} animate={{ height: 100 }} transition={{ delay: 1.4, type: 'spring' }} />

      {/* Floating dollar sign icon */}
      <motion.g
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <circle cx="370" cy="140" r="25" className="fill-white shadow-xl" />
        <FiDollarSign className="text-emerald-500" size={30} x={355} y={125} />
      </motion.g>
    </g>
  </svg>
);


// --- Main Page Component ---
export default function FinanceErpLandingPage() {
  const [customerNumber, setCustomerNumber] = useState('');

  const handleFetchDetails = () => {
    if (customerNumber) {
      alert(`Fetching details for customer: ${customerNumber}`);
      // In a real app, you would make an API call here.
    } else {
      alert('Please enter a customer number.');
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const featureList = [
    {
      icon: <FiBarChart2 className="w-8 h-8 text-emerald-500" />,
      title: 'Real-Time Analytics',
      description: 'Gain instant insights into your financial performance with our interactive dashboards.',
    },
    {
      icon: <FiFileText className="w-8 h-8 text-emerald-500" />,
      title: 'Automated Invoicing',
      description: 'Save time and reduce errors by automating your entire invoicing and billing cycle.',
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-emerald-500" />,
      title: 'Expense Management',
      description: 'Effortlessly track, categorize, and manage company expenses from one central hub.',
    },
  ];

  const testimonials = [
    {
      quote: "FinancierERP has revolutionized our financial operations. The real-time analytics are a game-changer for our decision-making process.",
      name: "John Doe",
      title: "CFO, Tech Innovators Inc.",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=JD"
    },
    {
      quote: "The automated invoicing feature saved us over 20 hours per month. It's intuitive, powerful, and the support team is fantastic.",
      name: "Jane Smith",
      title: "Operations Manager, Creative Solutions",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=JS"
    },
    {
        quote: "As a small business, managing expenses was a nightmare. FinancierERP simplified everything. I can't imagine running my business without it.",
        name: "Samuel Green",
        title: "Owner, Green's Goods",
        avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=SG"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* --- Header / Navigation --- */}
      <motion.header 
        className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-emerald-600">
            Financier<span className="text-slate-700">ERP</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#about" className="font-semibold text-slate-600 hover:text-emerald-600 transition-colors">About Us</a>
            <a href="#testimonials" className="font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-emerald-600 transition-all shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.header>

      {/* --- Main Content --- */}
      <main>
        {/* --- Hero Section --- */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Side: Text Content */}
            <div className="space-y-6">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
                Modernize Your Finances, <span className="text-emerald-600">Effortlessly</span>.
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-slate-600">
                FinancierERP is the all-in-one platform to streamline your accounting, invoicing, and reporting. Take control of your financial future today.
              </motion.p>
              <motion.div variants={itemVariants}>
                <motion.button 
                  className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request a Demo <FiArrowRight />
                </motion.button>
              </motion.div>
              
              {/* Customer Details Fetch Section */}
              <motion.div 
                variants={itemVariants} 
                className="mt-12 pt-8 border-t border-slate-200"
              >
                <h3 className="font-semibold text-slate-700 mb-3">Already a customer?</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    placeholder="Enter your Customer Number"
                    className="flex-grow px-4 py-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                  <motion.button 
                    onClick={handleFetchDetails}
                    className="bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fetch Details
                  </motion.button>
                </div>
              </motion.div>

            </div>

            {/* Right Side: Illustration */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Power of a Unified Platform</h2>
              <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">
                Stop juggling multiple apps. Everything you need for financial clarity is right here.
              </p>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featureList.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all"
                >
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- About Us Section --- */}
        <section id="about" className="bg-slate-50 py-16 md:py-24">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="grid md:grid-cols-2 gap-12 items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                            <FiUsers className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Mission: Financial Clarity for All</h2>
                        <p className="text-lg text-slate-600 mb-4">
                            FinancierERP was founded by a team of finance and technology experts who were tired of overly complex and expensive enterprise software. Our goal is to empower businesses of all sizes with tools that are powerful, intuitive, and affordable.
                        </p>
                        <p className="text-lg text-slate-600">
                            We believe that every business deserves a clear view of its financial health. We're committed to building software that not only solves problems but also creates opportunities for growth.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg">
                        <div className="flex items-center mb-4">
                            <FiAward className="w-8 h-8 text-emerald-500 mr-4"/>
                            <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                        </div>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex items-start"><span className="text-emerald-500 font-bold mr-2">✓</span> <span><strong>Expert-Built:</strong> Designed by finance professionals for finance professionals.</span></li>
                            <li className="flex items-start"><span className="text-emerald-500 font-bold mr-2">✓</span> <span><strong>Customer-Centric:</strong> Your success is our top priority. We provide world-class support.</span></li>
                            <li className="flex items-start"><span className="text-emerald-500 font-bold mr-2">✓</span> <span><strong>Secure & Reliable:</strong> Your data is protected with enterprise-grade security protocols.</span></li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section id="testimonials" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Loved by Businesses Worldwide</h2>
                    <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our customers have to say.
                    </p>
                </motion.div>
                <motion.div 
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className="bg-slate-50 p-8 rounded-xl shadow-sm flex flex-col"
                        >
                            <p className="text-slate-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-emerald-200" />
                                <div>
                                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} FinancierERP. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
