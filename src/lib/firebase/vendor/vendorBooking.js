
import { db } from '../firebase-client';
import { collection, getDocs, query, where } from 'firebase/firestore';

// fetch vendor all bookings
export const getVendorAllBookings = async (vendorId) => {
    const q = query(collection(db, 'bookings'), where('status.vendor', '==', vendorId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
};
