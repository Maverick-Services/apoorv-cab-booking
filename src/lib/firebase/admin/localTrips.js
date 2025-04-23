import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Pickup City
export const createNewLocalTrip = async ({ data }) => {

    try {
        const collectionRef = collection(db, "localTrips");

        // Proceed to add new pickup city
        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Local Trip Added Successfully." };
    } catch (error) {
        console.error("Error adding Local Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllLocalTrips = async () => {
    return await getDocs(collection(db, 'localTrips')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getLocalTripDetails = async (id) => {
    return await getDoc(doc(db, `localTrips/${id}`));
}

