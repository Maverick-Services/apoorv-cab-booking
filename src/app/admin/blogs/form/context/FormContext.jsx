"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export default function FormContextProvider({ children }) {
    const router = useRouter();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null)
        setIsLoading(true)
        // try {
        //     await createNewPost({ data: data, image: image });
        //     setIsDone(true)
        // } catch (error) {
        //     setError(error?.message)
        // }
        setIsLoading(false)
        router.push('/blogs');
    }

    const handleUpdate = async () => {
        setError(null)
        setIsLoading(true)
        // try {
        //     await updatePost({ data: data, image: image });
        //     setIsDone(true)
        // } catch (error) {
        //     setError(error?.message)
        // }
        setIsLoading(false)
        // router.push('/blogs');
    }

    const handleDelete = async (id) => {
        setError(null)
        setIsLoading(true)
        // try {
        //     await deletePost(id);
        //     setIsDone(true);
        // } catch (error) {
        //     setError(error?.message)
        // }
        setIsLoading(false)
        // router.push('/blogs');
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        try {
            // const res = await getPost(id);
            // if (res.exists()) {
            //     setData(res.data());
            // } else {
            //     throw new Error(`No Post found from id ${id}`)
            // }

        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }


    return <FormContext.Provider
        value={{
            data,
            isLoading,
            error,
            handleData,
            handleCreate,
            handleUpdate,
            handleDelete,
            fetchData,
        }}
    >{children}</FormContext.Provider>
}

export const useFormC = () => useContext(FormContext);