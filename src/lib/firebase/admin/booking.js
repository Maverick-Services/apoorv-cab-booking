import { db } from "../firebase-client";
import { collection } from 'firebase/firestore';


export async function createNewBooking(bookingData) {
    const bookingRef = await db.collection('bookings').add({
        ...bookingData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return bookingRef.id;
}