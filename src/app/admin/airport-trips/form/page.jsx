import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import AirportTripForm from './components/AirportTripForm';

export const dynamic = "force-dynamic";

export default function page() {

    return (
        <div>
            <InnerLayout heading={"Add New Airport Trip"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <AirportTripForm />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}