import { addDoc, collection, doc, getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase-client";

export const createNewBooking = async ({ data }) => {
    try {
        const collectionRef = collection(db, "bookings");

        // Add document
        const docRef = await addDoc(collectionRef, {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });

        // Update document with its ID
        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Booking Added Successfully.", data: docRef.id };
    } catch (error) {
        console.error("Error adding Booking:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// get one booking all details
export const getBookingDetails = async (id) => {
    return await getDoc(doc(db, `bookings/${id}`)).then((snap) => snap.data());
}

// get all bookings
export const getAllBookings = async () => {
    return await getDocs(collection(db, 'bookings')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// update booking
export const updateBooking = async (data) => {
    try {
        const bookingRef = doc(db, 'bookings', data.id);
        await updateDoc(bookingRef, data);
        return { success: true, message: 'Booking updated successfully.' };
    } catch (error) {
        console.error('Error updating booking:', error);
        throw new Error(error.message || 'Something went wrong.');
    }
};