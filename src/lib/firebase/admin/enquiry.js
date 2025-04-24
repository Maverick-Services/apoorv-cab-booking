import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";

// Add Enquiry
export const createNewEnquiry = async ({ data }) => {

    try {
        const collectionRef = collection(db, "enquiries");

        // Proceed to add new pickup city
        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Enquiry Added Successfully." };
    } catch (error) {
        console.error("Error adding Enquiry:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

