import axios from "axios";
import toast from "react-hot-toast";

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
