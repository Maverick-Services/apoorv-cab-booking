import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Pickup City
export const createNewAirportTrip = async ({ data }) => {

    try {
        const collectionRef = collection(db, "airportTrips");

        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "airport Trip Added Successfully." };
    } catch (error) {
        console.error("Error adding airport Trip:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllAirportTrips = async () => {
    return await getDocs(collection(db, 'airportTrips')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getAirportTripDetails = async (id) => {
    return await getDoc(doc(db, `airportTrips/${id}`));
}

