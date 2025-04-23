import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/navbar/Navbar';
import React, { Suspense } from 'react';

export const dynamic = "force-dynamic";

function page() {
    return (
        <div className='bg-gray-100'>
            <Navbar />
            <div className='text-black py-10 w-11/12 mx-auto flex justify-between'>
                <Suspense fallback={<div>Loading...</div>}>
                    {/* <CabDetails /> */}
                </Suspense>
            </div>
            <Footer />
        </div>
    )
}

export default page
