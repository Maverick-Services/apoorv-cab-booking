import axios from "axios";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase-client";

// Add Pickup City
export const createVendor = async (data) => {
    const toastId = toast.loading("Creating Vendor...");
    try {
        const response = await axios.post("/api/createVendor", data);
        if (!response?.data?.success)
            throw new Error(response?.data?.message);

        toast.dismiss(toastId);
        // console.log("CREATE VENDOR RESPONSE", response?.data?.data);
        toast.success("Vendor Created Successfully.");
        return response?.data?.data;

    } catch (error) {
        toast.dismiss(toastId);
        // console.log("CREATE VENDOR ERROR", error);
        toast.success(error?.response?.data?.message || error?.message);
        return null;
    }
};

// get details of all vendors
export const getAllVendors = async () => {
    const q = query(collection(db, 'Users'), where('role', '==', 'vendor'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
};

// get details of one vendor
export const getVendorDetails = async (id) => {
    return await getDoc(doc(db, `Users/${id}`)).then((snap) => snap.data());
}