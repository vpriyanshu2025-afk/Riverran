import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    signIn,
    signUp,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (authModalMode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name');
          setLoading(false);
          return;
        }
        const res = await signUp({ email, password, fullName });
        if (res.success) {
          setSuccessMsg('Welcome to RIVERRAN Atelier! Your account is active.');
          setTimeout(() => {
            closeAuthModal();
            setEmail('');
            setPassword('');
            setFullName('');
            setSuccessMsg('');
          }, 1500);
        }
      } else {
        const res = await signIn({ email, password });
        if (res.success) {
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            closeAuthModal();
            setEmail('');
            setPassword('');
            setSuccessMsg('');
          }, 1200);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-noir-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-champagne-300/40 z-10"
        >
          {/* Header Branding */}
          <div className="bg-noir-900 text-cream-50 p-6 sm:p-8 relative text-center space-y-2">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 text-cream-300 hover:text-white rounded-full bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/20 border border-champagne-400/30 text-champagne-300 text-[10px] font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3" />
              <span>Supabase Customer Auth</span>
            </div>

            <h2 className="font-heading text-2xl font-bold tracking-tight text-white">
              {authModalMode === 'login' ? 'Welcome Back to RIVERRAN' : 'Join RIVERRAN Privilege'}
            </h2>
            <p className="text-xs text-cream-300/80 max-w-xs mx-auto">
              {authModalMode === 'login'
                ? 'Sign in to access your saved orders, luxury recommendations & express checkout.'
                : 'Create your luxury profile for exclusive couture access & real-time order updates.'}
            </p>

            {/* Switch Tabs */}
            <div className="flex bg-noir-950/60 p-1 rounded-full border border-white/10 mt-4 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => { setAuthModalMode('login'); setErrorMsg(''); }}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                  authModalMode === 'login' ? 'bg-champagne-500 text-noir-950 shadow-sm' : 'text-cream-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthModalMode('signup'); setErrorMsg(''); }}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                  authModalMode === 'signup' ? 'bg-champagne-500 text-noir-950 shadow-sm' : 'text-cream-300 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 font-sans text-xs">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-center font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {authModalMode === 'signup' && (
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-noir-600">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="E.g. Priyanshu Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-champagne-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-champagne-500 text-noir-900"
                  />
                  <User className="w-4 h-4 text-noir-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-noir-600">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="yourname@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-champagne-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-champagne-500 text-noir-900"
                />
                <Mail className="w-4 h-4 text-noir-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-noir-600">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-champagne-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-champagne-500 text-noir-900"
                />
                <Lock className="w-4 h-4 text-noir-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-noir-900 hover:bg-champagne-600 text-cream-50 font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'Processing...' : authModalMode === 'login' ? 'Sign In to Account' : 'Register Privilege Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
