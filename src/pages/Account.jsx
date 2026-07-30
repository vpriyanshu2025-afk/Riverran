import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getCustomerOrdersFromSupabase } from '../utils/supabase';
import { formatCurrency } from '../utils/formatCurrency';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  LogOut,
  ShoppingBag,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const Account = () => {
  const { user, signOut, openAuthModal } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyOrders = async () => {
      setLoading(true);
      const data = await getCustomerOrdersFromSupabase(user.id);
      setOrders(data || []);
      setLoading(false);
    };

    fetchMyOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto text-champagne-600 border border-champagne-300">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-noir-900">Account Access Required</h2>
        <p className="text-sm text-noir-600 max-w-md mx-auto">
          Please sign in to view your profile, manage orders, and track live couture shipments.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => openAuthModal('login')}
            className="px-8 py-3.5 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-md"
          >
            Sign In Now
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className="px-8 py-3.5 bg-white border border-champagne-400 text-noir-900 hover:bg-cream-100 font-bold uppercase tracking-widest text-xs rounded-full transition-all"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

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

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Privilege Client';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 sm:px-8 py-10 space-y-10"
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-noir-950 via-noir-900 to-noir-950 text-cream-50 p-8 sm:p-10 rounded-3xl border border-champagne-400/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Sparkles className="w-96 h-96 text-champagne-400" />
        </div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-champagne-500 text-noir-950 rounded-full flex items-center justify-center font-heading text-2xl sm:text-3xl font-bold shadow-lg border-2 border-white">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Supabase Privilege Member</span>
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {displayName}
            </h1>
            <p className="text-xs text-cream-300/80 font-sans">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            signOut();
            navigate('/');
          }}
          className="px-6 py-3 bg-white/10 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all border border-white/20 inline-flex items-center justify-center gap-2 self-start md:self-auto backdrop-blur-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Orders Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-champagne-300/40 pb-4">
          <h2 className="font-heading text-2xl font-bold text-noir-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-champagne-600" />
            <span>My Order History</span>
          </h2>
          <span className="text-xs font-bold text-noir-500 uppercase tracking-widest">
            {orders.length} Order{orders.length === 1 ? '' : 's'} Placed
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-noir-500 text-xs font-sans">
            Loading your Supabase order history...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-champagne-300/40 shadow-sm max-w-md mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-champagne-600 mx-auto opacity-70" />
            <h3 className="font-heading text-xl font-bold text-noir-900">No Orders Yet</h3>
            <p className="text-xs text-noir-500 max-w-xs mx-auto">
              Your order history is empty. Explore our luxury collection to place your first couture order!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-noir-900 text-cream-50 hover:bg-champagne-600 font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md"
            >
              <span>Explore Atelier Shop</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const customer = order.customer || {};
              const pricing = order.pricing || {};

              return (
                <div
                  key={order.id || order.orderRef}
                  className="bg-white rounded-3xl border border-champagne-300/40 shadow-sm overflow-hidden p-6 space-y-6 transition-all hover:shadow-card-hover"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-lg font-bold text-noir-900">
                          Order #{order.orderRef || order.id}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(order.status)}`}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-noir-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-champagne-600" />
                        <span>Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}</span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-sans">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-noir-400 block">Total Amount</span>
                      <span className="font-heading text-xl font-bold text-champagne-600">
                        {formatCurrency(pricing.grandTotal || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-noir-700">
                      Ordered Products ({order.products?.length || 0})
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {order.products?.map((prod, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-cream-50 rounded-2xl">
                          {prod.image && (
                            <img src={prod.image} alt={prod.name} className="w-12 h-14 object-cover rounded-xl bg-white" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-heading font-bold text-noir-900 text-xs truncate">{prod.name}</h5>
                            <p className="text-[11px] text-noir-500">Color: {prod.color} • Size: {prod.size}</p>
                            <p className="text-[11px] font-bold text-noir-900 font-sans mt-0.5">
                              {prod.quantity} x {formatCurrency(prod.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {customer.address && (
                    <div className="bg-cream-50/60 p-4 rounded-2xl text-xs text-noir-700 space-y-1 border border-cream-200">
                      <p className="font-bold flex items-center gap-1 text-noir-900">
                        <MapPin className="w-3.5 h-3.5 text-champagne-600" />
                        <span>Shipping Address</span>
                      </p>
                      <p>{customer.fullName} • {customer.phone}</p>
                      <p>{customer.address}, {customer.city}, {customer.state} - {customer.pinCode}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
