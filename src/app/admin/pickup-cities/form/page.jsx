import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import PickupCityForm from './components/PickupCityForm';

export const dynamic = "force-dynamic";

export default function page() {

    return (
        <div>
            <InnerLayout heading={"Add New Pickup City"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <PickupCityForm />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}