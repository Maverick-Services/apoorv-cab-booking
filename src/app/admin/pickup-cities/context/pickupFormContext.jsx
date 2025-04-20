"use client"

import { getProduct } from "@/lib/firebase/products/read";
import { createNewProduct, deleteProduct, updateProduct } from "@/lib/firebase/products/write";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const PickupFormContext = createContext();

export default function PickupFormContextProvider({ children }) {
    const router = useRouter();

    const [data, setData] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const [variants, setVariants] = useState([])
    const [variant, setVariant] = useState({})

    const updateVariant = (index, updatedVariant) => {
        setVariants(prev =>
            prev.map((variant, i) =>
                i === index ? { ...updatedVariant } : variant
            )
        );
    };

    const deleteVariant = (index) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        // setIsDone(false)
        try {
            const res = await getProduct(id);
            if (res.exists()) {
                setData(res.data());
            } else {
                throw new Error(`No Product found with id ${id}`)
            }

        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleData = (key, value) => {
        setIsDone(false)
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    const handleCreate = async () => {
        setError(null)
        setCreating(true)
        setIsDone(false)
        const finalData = {
            ...data,
            variants: variants
        }

        try {
            await createNewProduct({ data: finalData, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
        router.push('/products');
    }

    const handleUpdate = async () => {
        setError(null)
        setCreating(true)
        setIsDone(false)
        const finalData = {
            ...data,
            variants: variants
        }
        try {
            await updateProduct({ data: finalData, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setCreating(false)
        router.push('/products');
    }

    const handleDelete = async (id) => {
        setError(null)
        setDeleting(true)
        setIsDone(false)
        try {
            await deleteProduct(id);
            setIsDone(true);
        } catch (error) {
            setError(error?.message)
        }
        setDeleting(false)
        router.push('/products');
    }


    return <PickupFormContext.Provider
        value={{
            data,
            isLoading,
            error,
            isDone,
            fetchData,
            handleData,
            handleCreate,
            handleUpdate,
            handleDelete,
            image, setImage,
            variants, setVariants,
            variant, setVariant,
            creating, setCreating,
            deleting,
            updateVariant, deleteVariant
        }}
    >{children}</PickupFormContext.Provider>
}

export const usePickupForm = () => useContext(PickupFormContext);