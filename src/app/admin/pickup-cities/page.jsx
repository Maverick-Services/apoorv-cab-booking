"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PickupCityCards from './components/PickupCityCards';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity'

function page() {

    const [loading, setLoading] = useState(false)
    const [pickupCities, setPickupCities] = useState([])

    async function fetchPickupCities() {
        setLoading(true)
        try {
            const res = await getAllPickupCities()
            setPickupCities(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPickupCities()
    }, [])

    console.log(pickupCities)
    return (
        <div>
            <InnerLayout heading={"Pickup Cities"}>
                <div className='flex justify-between items-center w-full mb-6'>
                    <div className="text-lg font-medium text-muted-foreground">
                        Total Cities: {20}
                    </div>
                    <Link href={'/admin/pickup-cities/form'}>
                        <Button className="cursor-pointer">Add New</Button>
                    </Link>
                </div>
                <PickupCityCards />
            </InnerLayout>
        </div>
    )
}

export default page
