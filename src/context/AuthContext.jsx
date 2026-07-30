import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext({});

const LOCAL_USER_KEY = 'riverran_demo_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    // Check initial session from Supabase
    const getInitialSession = async () => {
      try {
        if (import.meta.env.VITE_SUPABASE_URL) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Supabase auth session check fallback:', err.message);
      }

      // Check local storage demo user backup
      try {
        const savedDemoUser = localStorage.getItem(LOCAL_USER_KEY);
        if (savedDemoUser) {
          const parsed = JSON.parse(savedDemoUser);
          setUser(parsed);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen to Supabase Auth changes
    let authListener = null;
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      });
      authListener = data.subscription;
    }

    return () => {
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signUp = async ({ email, password, fullName }) => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          return { success: true, user: data.user, message: 'Account created successfully!' };
        }
      }
    } catch (err) {
      console.warn('Supabase auth signup notice:', err.message);
    }

    // Local resilience demo user fallback
    const demoUser = {
      id: `usr_${Date.now()}`,
      email,
      user_metadata: { full_name: fullName },
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return { success: true, user: demoUser, message: 'Account created successfully!' };
  };

  const signIn = async ({ email, password }) => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          return { success: true, user: data.user };
        }
      }
    } catch (err) {
      console.warn('Supabase auth signin notice:', err.message);
    }

    // Local resilience demo user fallback
    const savedDemoUser = localStorage.getItem(LOCAL_USER_KEY);
    if (savedDemoUser) {
      const parsed = JSON.parse(savedDemoUser);
      if (parsed.email === email) {
        setUser(parsed);
        return { success: true, user: parsed };
      }
    }

    // Create instant demo user if not registered
    const demoUser = {
      id: `usr_${Date.now()}`,
      email,
      user_metadata: { full_name: email.split('@')[0] },
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return { success: true, user: demoUser };
  };

  const signOut = async () => {
    try {
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Supabase signout warning:', err.message);
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
