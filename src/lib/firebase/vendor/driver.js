import { db } from "../firebase-client";
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, deleteDoc } from "firebase/firestore";

// create new Driver
export const createNewDriver = async ({ data }) => {
    try {
        const collectionRef = collection(db, "drivers");

        // Check if a driver with the same name already exists (case-insensitive match)
        const q = query(collectionRef, where("name_lower", "==", data.name.trim().toLowerCase()));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            throw new Error("Driver with this name already exists.");
        }

        // Proceed to add new cab type
        const docRef = await addDoc(collectionRef, {
            ...data,
            name_lower: data.name.trim().toLowerCase(),
            timestamp: Timestamp.now(),
        });

        await updateDoc(docRef, { id: docRef.id });

        return { success: true, message: "Driver Added Successfully." };
    } catch (error) {
        console.error("Error adding new driver:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};

// fetch list of all drivers
export const getAllDrivers = async () => {
    return await getDocs(collection(db, 'drivers')).then((snaps) => snaps.docs.map((d) => d.data()))
}

// fetch one driver details
export const getDriverDetails = async (id) => {
    return await getDoc(doc(db, `drivers/${id}`));
}

// fetch details of drivers related to vendor
export const getVendorAllDrivers = async (vendorId) => {
    const q = query(collection(db, 'drivers'), where('vendor', '==', vendorId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
};

// delete driver
export const deleteDriver = async (id) => {
    if (!id) {
        throw new Error("Id is required");
    }
    await deleteDoc(doc(db, `drivers/${id}`));
}

// Update Driver
export const updateDriver = async ({ data }) => {
    try {
        const collectionRef = doc(db, `drivers/${data?.id}`);
        await updateDoc(collectionRef, data);
        return { success: true, message: "Driver Updated Successfully." };
    } catch (error) {
        console.error("Error updating Cab Type:", error);
        throw new Error(error.message || "Something went wrong.");
    }
};
