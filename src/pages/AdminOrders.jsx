import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrdersFromFirestore, updateOrderStatusInFirestore } from '../utils/firebase';
import { getOrdersFromSupabase, updateOrderStatusInSupabase } from '../utils/supabase';
import { formatCurrency } from '../utils/formatCurrency';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  PackageCheck,
  Truck,
  CheckCheck,
  XCircle,
  Phone,
  MapPin,
  RefreshCw,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Database,
  DollarSign,
  ShoppingBag,
  Sparkles,
  Lock,
  User,
  LogOut,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const AdminOrders = () => {
  // Admin Security State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('riverran_admin_auth') === 'true';
  });
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  const statusOptions = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

  // Allowed Credentials (configurable via env vars or default)
  const EXPECTED_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const EXPECTED_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'riverran2026#admin';

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (
      inputUsername.trim().toLowerCase() === EXPECTED_USERNAME.toLowerCase() &&
      inputPassword === EXPECTED_PASSWORD
    ) {
      sessionStorage.setItem('riverran_admin_auth', 'true');
      setIsAdminAuthenticated(true);
      setInputUsername('');
      setInputPassword('');
    } else {
      setLoginError('Invalid Admin Username or Password. Please check credentials.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('riverran_admin_auth');
    setIsAdminAuthenticated(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const fetchedSupabase = await getOrdersFromSupabase();
    if (fetchedSupabase && fetchedSupabase.length > 0) {
      setOrders(fetchedSupabase);
    } else {
      const fetchedFirestore = await getOrdersFromFirestore();
      setOrders(fetchedFirestore || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchOrders();
    }
  }, [isAdminAuthenticated]);

  const handleStatusChange = async (orderRef, newStatus) => {
    // Update local state first for instant UI response
    setOrders((prev) =>
      prev.map((o) =>
        o.orderRef === orderRef || o.id === orderRef ? { ...o, status: newStatus } : o
      )
    );

    await Promise.all([
      updateOrderStatusInSupabase(orderRef, newStatus),
      updateOrderStatusInFirestore(orderRef, newStatus),
    ]);

    setStatusUpdateMessage(`Order ${orderRef} status updated to "${newStatus}"`);
    setTimeout(() => setStatusUpdateMessage(''), 3000);
  };

  // Status Badge Helper Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Packed':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-cream-100 text-noir-800 border-champagne-300';
    }
  };

  // Unauthenticated Admin Passcode Screen
  if (!isAdminAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto px-6 py-20"
      >
        <div className="bg-noir-900 text-cream-50 rounded-3xl p-8 sm:p-10 border border-champagne-400/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <Lock className="w-48 h-48 text-champagne-400" />
          </div>

          <div className="text-center space-y-3 relative z-10">
            <div className="w-14 h-14 bg-champagne-500/20 text-champagne-300 rounded-full flex items-center justify-center mx-auto border border-champagne-400/40">
              <Lock className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400 block">
              RIVERRAN ATELIER SECURITY
            </span>
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
              Admin Portal Login
            </h2>
            <p className="text-xs text-cream-300/80 max-w-xs mx-auto">
              Authorized access only. Enter administrator credentials to manage cloud orders.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 font-sans text-xs relative z-10">
            {loginError && (
              <div className="p-3 bg-rose-900/80 border border-rose-500/50 text-rose-100 rounded-2xl text-center font-medium flex items-center justify-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-cream-300">Admin Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. admin"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-noir-950/80 border border-champagne-400/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-champagne-500"
                />
                <User className="w-4 h-4 text-champagne-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-cream-300">Admin Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-noir-950/80 border border-champagne-400/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-champagne-500"
                />
                <Lock className="w-4 h-4 text-champagne-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-champagne-500 hover:bg-champagne-600 text-noir-950 font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <span>Authenticate Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-[10px] text-cream-300/60 border-t border-white/10 relative z-10">
            <span>Default Admin: Username: <code className="text-champagne-300 font-mono">admin</code> | Password: <code className="text-champagne-300 font-mono">riverran2026#admin</code></span>
          </div>

        </div>
      </motion.div>
    );
  }

  // Filtering & Search
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatusTab === 'All' || order.status === selectedStatusTab;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (order.orderRef && order.orderRef.toLowerCase().includes(query)) ||
      (order.customer?.fullName && order.customer.fullName.toLowerCase().includes(query)) ||
      (order.customer?.phone && order.customer.phone.toLowerCase().includes(query)) ||
      (order.customer?.city && order.customer.city.toLowerCase().includes(query)) ||
      (order.status && order.status.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + (o.pricing?.grandTotal || 0), 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-10"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-champagne-300/40">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-600 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-champagne-600" />
            <span>Authenticated Supabase & Firestore Portal</span>
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-noir-900 tracking-tight mt-1">
            Admin Orders Portal
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="px-5 py-2.5 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh DB'}</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="px-5 py-2.5 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
            title="Lock Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusUpdateMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusUpdateMessage}</span>
        </motion.div>
      )}

      {/* Executive Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-champagne-300/40 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-noir-400">Total Orders</span>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-noir-900">{orders.length}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-champagne-300/40 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">Pending Orders</span>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-amber-600">{pendingCount}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-champagne-300/40 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Delivered Orders</span>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-emerald-600">{deliveredCount}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-champagne-300/40 shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne-600">Total Revenue</span>
          <p className="font-heading text-2xl sm:text-3xl font-bold text-noir-900">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {/* Search & Status Filter Tabs */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by Order ID, Name, Phone, City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-champagne-300 rounded-full focus:outline-none focus:ring-2 focus:ring-champagne-500 font-sans tracking-wide shadow-sm"
          />
          <Search className="w-4 h-4 text-champagne-600 absolute left-3.5 top-3.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {['All', ...statusOptions].map((tab) => {
            const count =
              tab === 'All'
                ? orders.length
                : orders.filter((o) => o.status === tab).length;
            const isSelected = selectedStatusTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  isSelected
                    ? 'bg-noir-900 text-cream-50 shadow-md'
                    : 'bg-white text-noir-600 border border-champagne-300/60 hover:bg-cream-100'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-champagne-500 text-noir-950 font-extrabold' : 'bg-cream-200 text-noir-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Orders List Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-noir-500 text-sm font-sans space-y-3">
            <RefreshCw className="w-8 h-8 text-champagne-600 animate-spin mx-auto" />
            <p>Loading Cloud Database Orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-champagne-300/40 shadow-sm max-w-lg mx-auto space-y-3">
            <ShoppingBag className="w-10 h-10 text-champagne-600 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-noir-900">No Orders Found</h3>
            <p className="text-xs text-noir-500">No orders match your search query or selected status filter tab.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === (order.id || order.orderRef);
            const customer = order.customer || {};
            const pricing = order.pricing || {};
            const cleanPhone = (customer.phone || '').replace(/[^0-9]/g, '');

            return (
              <div
                key={order.id || order.orderRef}
                className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm overflow-hidden transition-all hover:shadow-card-hover"
              >
                {/* Order Header Bar */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cream-100">
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-base font-bold text-noir-900">
                        {order.orderRef || order.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs text-noir-500 font-sans">
                      Placed by <strong className="text-noir-900">{customer.fullName}</strong> • {customer.city}, {customer.state}
                    </p>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-3">
                    
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-noir-400 hidden sm:inline">Status:</label>
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusChange(order.orderRef || order.id, e.target.value)}
                        className="px-3 py-2 bg-cream-50 border border-champagne-300 rounded-xl text-xs font-bold text-noir-900 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* WhatsApp Direct Reply */}
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors shadow-sm"
                        title="Contact Customer on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}

                    {/* Expand Details Toggle */}
                    <button
                      onClick={() => setExpandedOrderId(isExpanded ? null : (order.id || order.orderRef))}
                      className="p-2.5 bg-cream-100 hover:bg-cream-200 text-noir-900 rounded-xl transition-colors"
                      aria-label="Toggle Order Details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Collapsible Order Details */}
                {isExpanded && (
                  <div className="p-6 bg-cream-50/50 space-y-6 text-xs font-sans border-t border-cream-200">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Customer Details */}
                      <div className="bg-white p-5 rounded-2xl border border-champagne-200/60 space-y-2">
                        <h4 className="font-heading font-bold text-noir-900 text-sm pb-2 border-b border-cream-100 flex items-center justify-between">
                          <span>Customer Shipping Info</span>
                          <MapPin className="w-4 h-4 text-champagne-600" />
                        </h4>
                        <p><strong>Name:</strong> {customer.fullName}</p>
                        <p><strong>Phone:</strong> {customer.phone}</p>
                        {customer.email && <p><strong>Email:</strong> {customer.email}</p>}
                        <p><strong>Address:</strong> {customer.address}</p>
                        <p><strong>City/State:</strong> {customer.city}, {customer.state} - {customer.pinCode}</p>
                        {customer.orderNotes && (
                          <div className="pt-2 border-t border-cream-100 text-amber-900 font-medium italic">
                            "Notes: {customer.orderNotes}"
                          </div>
                        )}
                      </div>

                      {/* Order Totals & Meta */}
                      <div className="bg-white p-5 rounded-2xl border border-champagne-200/60 space-y-2">
                        <h4 className="font-heading font-bold text-noir-900 text-sm pb-2 border-b border-cream-100 flex items-center justify-between">
                          <span>Payment & Timestamp</span>
                          <Clock className="w-4 h-4 text-champagne-600" />
                        </h4>
                        <p><strong>Order Time:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
                        <p><strong>Subtotal:</strong> {formatCurrency(pricing.subtotal || 0)}</p>
                        <p><strong>Shipping:</strong> {formatCurrency(pricing.shippingFee || 0)}</p>
                        <p><strong>Tax:</strong> {formatCurrency(pricing.estimatedTax || 0)}</p>
                        <p className="text-sm font-bold text-champagne-600 pt-1 border-t border-cream-100 font-heading">
                          Grand Total: {formatCurrency(pricing.grandTotal || 0)}
                        </p>
                      </div>

                    </div>

                    {/* Products Table */}
                    <div className="bg-white p-5 rounded-2xl border border-champagne-200/60 space-y-3">
                      <h4 className="font-heading font-bold text-noir-900 text-sm pb-2 border-b border-cream-100">
                        Itemized Products ({order.products?.length || 0})
                      </h4>

                      <div className="space-y-2">
                        {order.products?.map((prod, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              {prod.image && (
                                <img src={prod.image} alt={prod.name} className="w-10 h-12 object-cover rounded-lg bg-white" />
                              )}
                              <div>
                                <h5 className="font-heading font-bold text-noir-900">{prod.name}</h5>
                                <p className="text-[11px] text-noir-500">Color: {prod.color} • Size: {prod.size}</p>
                              </div>
                            </div>

                            <div className="text-right font-sans">
                              <p className="font-bold text-noir-900">{formatCurrency(prod.price * prod.quantity)}</p>
                              <p className="text-[10px] text-noir-400">{prod.quantity} x {formatCurrency(prod.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </motion.div>
  );
};
