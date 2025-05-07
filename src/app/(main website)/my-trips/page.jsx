"use client"
import React, { useEffect } from 'react'
import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/navbar/Navbar';
import { getBookingsByUser } from '@/lib/firebase/admin/booking';
import useAuthStore from '@/store/useAuthStore';

function page() {
    const { userData } = useAuthStore()
    console.log(userData)

    async function fetchBookingsOfUser() {
        const res = await getBookingsByUser(userData?.id)
        console.log(res)
    }

    useEffect(() => {
        fetchBookingsOfUser()
    }, [userData])


    if (!userData) {
        return <div>No Bookings Yet</div>
    }

    return (
        <div>
            <div className='bg-gray-100'>
                <div className='sticky top-0'>
                    <Navbar />
                </div>
                <div className='text-black min-h-[50vh] pb-10 pt-5 w-11/12 flex flex-col justify-between max-w-6xl mx-auto'>
                    <h1>My Bookings</h1>

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default page
