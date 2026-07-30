import { createClient } from '@supabase/supabase-js';

// Supabase environment configuration with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzplaceholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MDA0MDAsImV4cCI6MTk5MzE3NjQwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LOCAL_ORDERS_KEY = 'riverran_supabase_orders_backup';

const getLocalBackupOrders = () => {
  try {
    const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalBackupOrder = (orderData) => {
  try {
    const existing = getLocalBackupOrders();
    const updated = [orderData, ...existing.filter((o) => o.orderRef !== orderData.orderRef)];
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed local order backup:', e);
  }
};

/**
 * Save order to Supabase 'orders' table
 * @param {Object} orderData 
 */
export const saveOrderToSupabase = async (orderData) => {
  const payload = {
    ...orderData,
    status: orderData.status || 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Always save to local backup for offline / demo resilience
  saveLocalBackupOrder(payload);

  try {
    // If using placeholder credentials, skip real network request and return fallback
    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.warn('Supabase URL not set in .env - Order saved to local resilience storage.');
      return { success: true, isLocalFallback: true };
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          order_ref: payload.orderRef,
          user_id: payload.userId || null,
          customer_name: payload.customer?.fullName || '',
          customer_phone: payload.customer?.phone || '',
          customer_email: payload.customer?.email || '',
          customer_city: payload.customer?.city || '',
          customer_state: payload.customer?.state || '',
          customer_address: payload.customer?.address || '',
          customer_pincode: payload.customer?.pinCode || '',
          order_notes: payload.customer?.orderNotes || '',
          products: payload.products || [],
          pricing: payload.pricing || {},
          grand_total: payload.pricing?.grandTotal || 0,
          status: payload.status,
          raw_data: payload,
          created_at: payload.createdAt,
        },
      ])
      .select();

    if (error) {
      console.warn('Supabase insert warning:', error.message);
      return { success: true, isLocalFallback: true };
    }

    console.log('Order successfully saved to Supabase:', data);
    return { success: true, data: data[0] };
  } catch (err) {
    console.warn('Error saving to Supabase:', err.message);
    return { success: true, isLocalFallback: true };
  }
};

/**
 * Fetch all orders from Supabase (or Local Backup fallback)
 */
export const getOrdersFromSupabase = async () => {
  try {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return getLocalBackupOrders();
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getLocalBackupOrders();
    }

    // Map DB fields to standard application structure
    return data.map((row) => ({
      id: row.id,
      orderRef: row.order_ref || `RR-${row.id}`,
      userId: row.user_id,
      status: row.status,
      createdAt: row.created_at,
      customer: {
        fullName: row.customer_name,
        phone: row.customer_phone,
        email: row.customer_email,
        city: row.customer_city,
        state: row.customer_state,
        address: row.customer_address,
        pinCode: row.customer_pincode,
        orderNotes: row.order_notes,
      },
      products: row.products || [],
      pricing: row.pricing || { grandTotal: row.grand_total },
      ...(row.raw_data || {}),
    }));
  } catch (err) {
    console.warn('Error fetching orders from Supabase:', err.message);
    return getLocalBackupOrders();
  }
};

/**
 * Update order status in Supabase
 * @param {string} orderRef 
 * @param {string} newStatus 
 */
export const updateOrderStatusInSupabase = async (orderRef, newStatus) => {
  // Update local backup
  const localOrders = getLocalBackupOrders();
  const updatedLocal = localOrders.map((o) =>
    o.orderRef === orderRef || o.id === orderRef ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
  );
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));

  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .or(`order_ref.eq.${orderRef},id.eq.${orderRef}`);

      if (error) {
        console.warn('Supabase update status note:', error.message);
      }
    }
    return { success: true };
  } catch (err) {
    console.warn('Updated order status locally:', err.message);
    return { success: true, isLocalFallback: true };
  }
};

/**
 * Get customer orders for a specific user ID
 * @param {string} userId 
 */
export const getCustomerOrdersFromSupabase = async (userId) => {
  if (!userId) return [];
  
  const allOrders = await getOrdersFromSupabase();
  return allOrders.filter((o) => o.userId === userId || o.raw_data?.userId === userId);
};
