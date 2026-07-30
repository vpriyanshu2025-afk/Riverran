import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase Configuration (Uses Vite Environment variables if set, with fallback)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyRiverranAtelier2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "riverran-atelier.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "riverran-atelier",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "riverran-atelier.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:a1b2c3d4e5f6g7h8i9"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

// LocalStorage Fallback Helper for offline resilience
const LOCAL_ORDERS_KEY = 'riverran_firestore_orders_backup';

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
 * Save order document to Firestore 'orders' collection
 * @param {Object} orderData
 */
export const saveOrderToFirestore = async (orderData) => {
  const payload = {
    ...orderData,
    status: orderData.status || 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Always save to local storage backup
  saveLocalBackupOrder(payload);

  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...payload,
      firestoreTimestamp: serverTimestamp(),
    });
    console.log('Order successfully saved to Firestore with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn('Firestore sync note (Offline / Demo fallback active):', error.message);
    return { success: true, isLocalFallback: true };
  }
};

/**
 * Fetch all orders from Firestore (or Local Backup fallback)
 */
export const getOrdersFromFirestore = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('firestoreTimestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const firestoreOrders = [];
    querySnapshot.forEach((doc) => {
      firestoreOrders.push({ id: doc.id, ...doc.data() });
    });

    if (firestoreOrders.length > 0) {
      return firestoreOrders;
    }
    return getLocalBackupOrders();
  } catch (error) {
    console.warn('Fetching orders from local storage backup:', error.message);
    return getLocalBackupOrders();
  }
};

/**
 * Update order status in Firestore
 * @param {string} orderRef
 * @param {string} newStatus
 */
export const updateOrderStatusInFirestore = async (orderRef, newStatus) => {
  // Update local backup
  const localOrders = getLocalBackupOrders();
  const updatedLocal = localOrders.map((o) =>
    o.orderRef === orderRef || o.id === orderRef ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
  );
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));

  try {
    const q = query(collection(db, 'orders'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      const data = docSnapshot.data();
      if (data.orderRef === orderRef || docSnapshot.id === orderRef) {
        await updateDoc(doc(db, 'orders', docSnapshot.id), {
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }
    });
    return { success: true };
  } catch (error) {
    console.warn('Updated order status in local storage backup:', error.message);
    return { success: true, isLocalFallback: true };
  }
};
