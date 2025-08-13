import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { RefreshCcw, Calendar, MoreHorizontal, User, ShoppingBag, Truck, DollarSign, Package } from 'lucide-react';

// --- Data Fetching and Processing ---

const fetchDashboardData = async () => {
  const [users, customers, orders, inventories] = await Promise.all([
    fetch('http://localhost:8080/api/users').then(res => res.json()),
    fetch('http://localhost:8080/api/customers').then(res => res.json()),
    fetch('http://localhost:8080/api/orders').then(res => res.json()),
    fetch('http://localhost:8080/api/inventories').then(res => res.json()),
  ]);

  // Process fetched data to fit the dashboard components
  const today = new Date().getDate();
  const todaysSales = orders
    .filter(order => {
      // Assuming orderDate is in a parsable format like "YYYY-MM-DD"
      const orderDay = new Date(order.orderDate).getDate();
      return orderDay === today;
    })
    .reduce((sum, order) => sum + order.total, 0);

  const categories = [...new Set(inventories.map(item => item.category))];
  const lowStockItemsCount = inventories.filter(item => item.stockQuantity < 200).length;

  const orderStatusData = orders.reduce((acc, order) => {
    const status = order.status;
    const existing = acc.find(item => item.name === status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, []);

  const monthlySalesData = orders.reduce((acc, order) => {
    const date = new Date(order.orderDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    if (existing) {
      existing.sales += order.total;
    } else {
      acc.push({ name: month, sales: order.total });
    }
    return acc;
  }, []);

  const totalSalesThisMonth = monthlySalesData.reduce((sum, item) => sum + item.sales, 0);

  return {
    todaysSales: todaysSales.toFixed(2),
    availableCategories: categories.length,
    lowStockItems: lowStockItemsCount,
    systemUsers: users.length,
    orderStatusData,
    monthlySalesData,
    totalSalesThisMonth: totalSalesThisMonth.toFixed(2),
  };
};

// --- Reusable Dashboard Components (unchanged from previous version) ---

const MetricCard = ({ title, value, icon, bgColor, textColor, trend = '' }) => (
  <div className={`p-6 rounded-xl shadow-lg flex flex-col justify-between h-40 ${bgColor} text-white`}>
    <div className="flex justify-between items-center">
      <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      <div className={`p-2 rounded-full ${textColor === 'text-white' ? 'bg-white/20' : 'bg-white/40'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-4xl font-bold">{value}</p>
      {trend && <p className={`text-sm mt-1 ${textColor}`}>{trend}</p>}
    </div>
  </div>
);

const ChartCard = ({ title, children, showMore = false }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {showMore && (
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal size={24} />
        </button>
      )}
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

// --- Main App Component ---

const Analytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const processedData = await fetchDashboardData();
        setDashboardData(processedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch dashboard data. Please check your API endpoints.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  // Define colors for the charts
  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md text-gray-700 hover:bg-gray-50 transition-colors">
              <Calendar size={18} />
              <span className="text-sm">This Month</span>
            </button>
            <button className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => { setLoading(true); window.location.reload(); }}>
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>

        {/* Metric Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Today's Sales"
            value={`$${dashboardData.todaysSales}`}
            icon={<DollarSign size={24} />}
            bgColor="bg-gradient-to-br from-green-400 to-green-600"
            textColor="text-white"
            trend="+2.5% This Month"
          />
          <MetricCard
            title="Categories"
            value={dashboardData.availableCategories}
            icon={<Package size={24} />}
            bgColor="bg-gradient-to-br from-blue-400 to-blue-600"
            textColor="text-white"
            trend="+2.5% This Month"
          />
          <MetricCard
            title="Low Stock Items"
            value={dashboardData.lowStockItems}
            icon={<ShoppingBag size={24} />}
            bgColor="bg-gradient-to-br from-red-400 to-red-600"
            textColor="text-white"
            trend="+2.5% This Month"
          />
          <MetricCard
            title="System Users"
            value={dashboardData.systemUsers}
            icon={<User size={24} />}
            bgColor="bg-gradient-to-br from-purple-400 to-purple-600"
            textColor="text-white"
            trend="+2.5% This Month"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <ChartCard title="Order Status Report" showMore>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {dashboardData.orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bar Chart */}
          <ChartCard title="Total Sales Overview" showMore>
            <div className="flex items-center justify-end mb-4">
                <p className="font-bold text-lg px-4 py-2 rounded-md bg-gray-200 text-gray-800">
                    {`$${dashboardData.totalSalesThisMonth}`}
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
