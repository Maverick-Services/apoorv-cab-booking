"use client"

import { createNewLocalTrip } from "@/lib/firebase/admin/localTrips";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const LocalTripFormContext = createContext();

export default function LocalTripFormContextProvider({ children }) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [variantList, setVariantList] = useState([])
    const [otherError, setOtherError] = useState(null);

    const [selectedCity, setSelectedCity] = useState({})

    // while fetching the data
    const [isLoading, setIsLoading] = useState(false);

    // while adding or updating
    const [creating, setCreating] = useState(false);

    // while deleting
    const [deleting, setDeleting] = useState(false);

    const [variant, setVariant] = useState({
        cabType: '',
        variantAcutalPrice: '',
        variantDiscountedPrice: ''
    })

    function handleVariant(key, value) {
        setVariant(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleData = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    // fetch data
    const fetchData = async (id) => {
        setOtherError(null)
        setIsLoading(true)
        try {
            // const res = await getCabTypeDetails(id);
            // if (res.exists()) {
            //     return res.data();
            // } else {
            //     throw new Error(`No Cab Type found with id ${id}`);
            // }
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error fetching cab type');
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    // create new cab type
    const handleCreate = async (data) => {
        setOtherError(null)
        setCreating(true)
        try {
            await createNewLocalTrip({ data });
            toast.success('Local Trip Added Successfully!');
            // router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error adding cab type');
        }
        setCreating(false)
    }

    // update cab type
    const handleUpdate = async (data) => {
        setOtherError(null)
        setCreating(true)
        try {
            // await updateCabType({ data });
            // toast.success('Cab Type Updated Successfully!');
            // router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error updating cab type');
        }
        setCreating(false)
    }

    // delete cab type
    const handleDelete = async (id) => {
        setOtherError(null)
        setDeleting(true)
        try {
            // await deleteCabType(id);
            // toast.success('Cab Type Deleted Successfully!');
            // router.push('/admin/cab-types');
        } catch (error) {
            setOtherError(error?.message);
            toast.error(error?.message || 'Error deleting cab type');
        }
        setDeleting(false)
    }

    return <LocalTripFormContext.Provider
        value={{
            otherError,
            isLoading,
            creating,
            deleting,
            fetchData,
            handleCreate,
            handleUpdate,
            handleDelete,
            data, setData, handleData,
            selectedCity, setSelectedCity,
            handleVariant, variant, setVariant, variantList, setVariantList,
        }}
    >{children}</LocalTripFormContext.Provider>
}

export const useLocalTripFromForm = () => useContext(LocalTripFormContext);
