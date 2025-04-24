'use client'

import { auth } from "@/lib/firebase/firebase-client";
import Navigate from "./Navigate";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Login from "@/components/main/Login";

export const PrivateRoute = ({ children }) => {

    const { userData } = useAuthStore()

    // if (!auth?.currentUser === null) {
    //     return <Navigate to='/' />;
    // }
    const router = useRouter()

    if (userData?.role !== 'admin') {
        return <Login />
    }

    return (
        <div>
            {children}
        </div>
    )
}
