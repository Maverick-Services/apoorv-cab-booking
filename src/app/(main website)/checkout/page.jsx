import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/navbar/Navbar';
import React, { Suspense } from 'react';
import CheckoutDetails from './components/CheckoutDetails';

export const dynamic = "force-dynamic";

function page() {
    return (
        <div className='bg-gray-100'>
            <Navbar />
            <div className='text-black py-10 w-11/12 mx-auto flex flex-col justify-between'>
                <Suspense fallback={<div>Loading...</div>}>
                    <h2 className="text-2xl font-bold text-center">Trip Summary</h2>
                    <CheckoutDetails />
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default page
