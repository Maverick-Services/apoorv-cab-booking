import { db } from "../firebase-client";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";

// Add Pickup City
export const addPickupCity = async ({ data }) => {

    if (data?.pickupCity) throw new Error("City is undefined!");
    if (data?.pricePerKm) throw new Error("Price Per Kilometer is undefined!");

    try {
        const collectionRef = collection(db, "pickupCities");

        const docRef = await addDoc(collectionRef, {
            ...data,
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });
        console.log("City added successfully:", docRef.id);

    } catch (error) {
        console.error("Error adding city:", error);
        throw error;
    }
};
