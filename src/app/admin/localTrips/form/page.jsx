import React, { Suspense } from 'react'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import LocalTripForm from './components/LocalTripForm';

export const dynamic = "force-dynamic";

export default function page() {

    return (
        <div>
            <InnerLayout heading={"Add New Local Trip"}>
                <div className='flex justify-center w-full pb-6'>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <LocalTripForm />
                    </Suspense>
                </div>
            </InnerLayout>
        </div>
    )
}