import { db } from "../firebase-client";
import {
    collection,
    addDoc,
    updateDoc,
    Timestamp,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc,
} from "firebase/firestore";

// Add Enquiry
export const createNewEnquiry = async ({ data }) => {
    try {
        const collectionRef = collection(db, "enquiries");

        // Add document
        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        // Update document with its ID
        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Enquiry Added Successfully." };
    } catch (error) {
        console.error("Error adding Enquiry:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// Fetch all enquiries sorted by timestamp (latest first)
export const getAllEnquiries = async () => {
    try {
        const q = query(collection(db, "enquiries"), orderBy("timestamp", "desc"));
        const snaps = await getDocs(q);
        return snaps.docs.map((doc) => doc.data());
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        throw new Error("Failed to fetch enquiries.");
    }
};

// Delete enquiry by ID
export const deleteEnquiry = async (id) => {
    try {
        const docRef = doc(db, "enquiries", id);
        await deleteDoc(docRef);
        return { success: true, message: "Enquiry deleted successfully." };
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        throw new Error("Failed to delete enquiry.");
    }
};
