import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PickupCityCards from './components/PickupCityCards';

function page() {


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
