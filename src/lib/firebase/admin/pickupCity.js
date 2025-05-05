import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// Add Pickup City
export const createNewPickupCity = async ({ data }) => {

    try {
        const collectionRef = collection(db, "pickupCities");

        // Check if a cabType with the same name already exists (case-insensitive match)
        const q = query(collectionRef, where("name_lower", "==", data.name.trim().toLowerCase()));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            throw new Error("Pickup City with this name already exists.");
        }

        // Proceed to add new pickup city
        const docRef = await addDoc(collectionRef, {
            ...data,
            name_lower: data.name.trim().toLowerCase(),
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Cab Type Added Successfully." };
    } catch (error) {
        console.error("Error adding Pickup City:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};


// fetch details of all pickup cities
export const getAllPickupCities = async () => {
    return await getDocs(collection(db, 'pickupCities')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch the pickup city
export const getPickupCityDetails = async (id) => {
    return await getDoc(doc(db, `pickupCities/${id}`));
}

// fetch the pickup city by city name
export const getPickupCityDetailsbyCityName = async (cityName) => {
    return await getDocs(
        query(collection(db, 'pickupCities'), where('name', '==', cityName))
    ).then((snaps) => snaps.docs.map((d) => d.data())[0]);
}

