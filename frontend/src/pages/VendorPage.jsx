import axios from 'axios';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

// Reusable UI Components
const Header = ({ title, onAddClick }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
    <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    <button
      onClick={onAddClick}
      className="flex items-center text-sm px-3 py-1.5 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add
    </button>
  </div>
);

const Section = ({ title, children, onAddClick }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <Header title={title} onAddClick={onAddClick} />
    <div className="overflow-x-auto">
      {children}
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
      <p className="text-gray-700 mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

const CustomerForm = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState(customer || { name: '', email: '', phone: '', address: '', creditLimit: '', outstandingPayments: '', remarks: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Credit Limit</label>
          <input type="text" name="creditLimit" value={formData.creditLimit} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Outstanding Payments</label>
          <input type="text" name="outstandingPayments" value={formData.outstandingPayments} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Remarks</label>
        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
};

const OrderForm = ({ order, onSave, onCancel }) => {
  console.log("Form data",order.customer.name);
  
  const [formData, setFormData] = useState(order || { customerName: order.customer.name, orderDate: '', status: 'Pending', total: '', paymentStatus: 'Unpaid' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input type="text" name="customerName" value={formData.customer.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Order Date</label>
        <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Total Value</label>
        <input type="text" name="total" value={formData.total} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
        <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option>Paid</option>
          <option>Unpaid</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
};

const InventoryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState(item || { productName: '', category: '', stockQuantity: 0, reorderLevel: 0, pricePerUnit: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reorder Level</label>
        <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
        <input type="text" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
};


const VendorPage = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', component: null });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ id: null, type: null });

  // Base URL for the backend API
  const BASE_URL = 'http://localhost:8080/api';

  // Fetch data from the backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customersRes = await axios.get(`${BASE_URL}/customers`);
      setCustomers(customersRes.data);
      const ordersRes = await axios.get(`${BASE_URL}/orders`);
      setOrders(ordersRes.data);
      const inventoryRes = await axios.get(`${BASE_URL}/inventories`);
      setInventory(inventoryRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Fallback or error state handling
    }
  };

  const handleExportExcel = () => {
    let data = [];
    let title = '';

    switch (activeTab) {
      case 'customers':
        title = 'Customers';
        data = customers;
        break;
      case 'orders':
        title = 'Orders';
        data = orders;
        break;
      case 'inventory':
        title = 'Inventory Management';
        data = inventory;
        break;
      default:
        return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  // Customer Operations
  const handleAddCustomer = async (newCustomer) => {
    try {
      await axios.post(`${BASE_URL}/customers`, newCustomer);
      fetchData(); // Refresh data after a successful operation
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const handleEditCustomer = async (updatedCustomer) => {
    try {
      await axios.put(`${BASE_URL}/customers/${updatedCustomer.id}`, updatedCustomer);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/customers/${id}`);
      fetchData();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  // Order Operations
  const handleAddOrder = async (newOrder) => {
    try {
      await axios.post(`${BASE_URL}/orders`, newOrder);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  const handleEditOrder = async (updatedOrder) => {
    try {
      await axios.put(`${BASE_URL}/orders/${updatedOrder.id}`, updatedOrder);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/orders/${id}`);
      fetchData();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  // Inventory Operations
  const handleAddInventoryItem = async (newItem) => {
    try {
      await axios.post(`${BASE_URL}/inventories`, newItem);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add inventory item:", error);
    }
  };

  const handleEditInventoryItem = async (updatedItem) => {
    try {
      await axios.put(`${BASE_URL}/inventories/${updatedItem.id}`, updatedItem);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update inventory item:", error);
    }
  };

  const handleDeleteInventoryItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/inventories/${id}`);
      fetchData();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Failed to delete inventory item:", error);
    }
  };

  const handleConfirmDelete = () => {
    const { id, type } = confirmAction;
    if (type === 'customer') {
      handleDeleteCustomer(id);
    } else if (type === 'order') {
      handleDeleteOrder(id);
    } else if (type === 'inventory') {
      handleDeleteInventoryItem(id);
    }
    setIsConfirmModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return (
          <Section title="Customer Details" onAddClick={() => {
            setModalContent({ title: 'Add New Customer', component: <CustomerForm onSave={handleAddCustomer} onCancel={() => setIsModalOpen(false)} /> });
            setIsModalOpen(true);
          }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Payments</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">{customer.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{customer.contactInfo}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">${customer.creditLimit}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">${customer.outstandingPayments}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 truncate max-w-xs">{customer.remarks}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => {
                          setModalContent({ title: 'Edit Customer', component: <CustomerForm customer={customer} onSave={handleEditCustomer} onCancel={() => setIsModalOpen(false)} /> });
                          setIsModalOpen(true);
                        }} className="text-blue-600 hover:text-blue-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h.586l.293.293L8.146 11.5l.5.5.5-.5 3.5-3.5a1 1 0 00-1.414-1.414L7 9.586V10a1 1 0 001 1h.414l.293.293z" /><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L7.828 15.657a4 4 0 01-1.724.84l-4.75-.95a1 1 0 01-1.11-1.11l-.95-4.75a4 4 0 01.84-1.724L12.586 4.586zM9 13a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                        </button>
                        <button onClick={() => {
                          setIsConfirmModalOpen(true);
                          setConfirmAction({ id: customer.id, type: 'customer' });
                        }} className="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        );
      case 'orders':
        return (
          <Section title="Orders" onAddClick={() => {
            setModalContent({ title: 'Add New Order', component: <OrderForm onSave={handleAddOrder} onCancel={() => setIsModalOpen(false)} /> });
            setIsModalOpen(true);
          }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{order.customer?.name ||"not a verified customer"}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{order.inventory?.productName ||"product not available"}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => {
                          setModalContent({ title: 'Edit Order', component: <OrderForm order={order} onSave={handleEditOrder} onCancel={() => setIsModalOpen(false)} /> });
                          setIsModalOpen(true);
                        }} className="text-blue-600 hover:text-blue-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h.586l.293.293L8.146 11.5l.5.5.5-.5 3.5-3.5a1 1 0 00-1.414-1.414L7 9.586V10a1 1 0 001 1h.414l.293.293z" /><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L7.828 15.657a4 4 0 01-1.724.84l-4.75-.95a1 1 0 01-1.11-1.11l-.95-4.75a4 4 0 01.84-1.724L12.586 4.586zM9 13a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                        </button>
                        <button onClick={() => {
                          setIsConfirmModalOpen(true);
                          setConfirmAction({ id: order.id, type: 'order' });
                        }} className="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        );
      case 'inventory':
        return (
          <Section title="Inventory Management" onAddClick={() => {
            setModalContent({ title: 'Add New Product', component: <InventoryForm onSave={handleAddInventoryItem} onCancel={() => setIsModalOpen(false)} /> });
            setIsModalOpen(true);
          }}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Quantity</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Unit</th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-semibold ${item.stockQuantity <= item.reorderLevel ? 'text-red-500' : 'text-gray-900'}`}>
                        {item.stockQuantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{item.reorderLevel}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">${item.pricePerUnit}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => {
                          setModalContent({ title: 'Edit Product', component: <InventoryForm item={item} onSave={handleEditInventoryItem} onCancel={() => setIsModalOpen(false)} /> });
                          setIsModalOpen(true);
                        }} className="text-blue-600 hover:text-blue-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h.586l.293.293L8.146 11.5l.5.5.5-.5 3.5-3.5a1 1 0 00-1.414-1.414L7 9.586V10a1 1 0 001 1h.414l.293.293z" /><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L7.828 15.657a4 4 0 01-1.724.84l-4.75-.95a1 1 0 01-1.11-1.11l-.95-4.75a4 4 0 01.84-1.724L12.586 4.586zM9 13a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                        </button>
                        <button onClick={() => {
                          setIsConfirmModalOpen(true);
                          setConfirmAction({ id: item.id, type: 'inventory' });
                        }} className="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="flex items-center justify-between p-4 flex-wrap gap-4">
          <div className="flex items-center space-x-2 flex-grow max-w-lg border border-gray-300 rounded-md px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow border-0 focus:ring-0 text-gray-700 placeholder:text-gray-400 p-0"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-500 text-sm px-3 py-1.5 border border-gray-300 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              <span>Filters</span>
            </button>
            <button onClick={handleExportExcel} className="flex items-center text-gray-600 hover:text-green-500 text-sm px-3 py-1.5 border border-gray-300 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Export</span>
            </button>

          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700">Customers</h4>
            <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
          </div>
          <p className="text-sm text-gray-500">Total customers managed</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700">Orders</h4>
            <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
          </div>
          <p className="text-sm text-gray-500">Total orders processed</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-700">Inventory Items</h4>
            <div className="text-2xl font-bold text-gray-900">{inventory.length}</div>
          </div>
          <p className="text-sm text-gray-500">Total products in stock</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-2 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === 'customers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === 'inventory' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inventory
          </button>
        </div>
        {renderContent()}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        {modalContent.component}
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this ${confirmAction.type}? If there are existing dependencies, it cannot be deleted. This action cannot be undone.`}
      />
    </div>
  );
};

export default VendorPage;