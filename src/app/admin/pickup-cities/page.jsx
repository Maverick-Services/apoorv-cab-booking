import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import PickupCityForm from './components/PickupCityForm'

function page() {
    return (
        <div>
            <InnerLayout heading={"Pickup Cities"}>
                <PickupCityForm />
            </InnerLayout>
        </div>
    )
}

export default page
