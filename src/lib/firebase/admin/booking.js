import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
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

export const getBookingDetails = async (id) => {
    return await getDoc(doc(db, `bookings/${id}`)).then((snap) => snap.data());
}
