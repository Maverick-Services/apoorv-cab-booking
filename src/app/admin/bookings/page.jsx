'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import BookingsList from './components/BookingsList'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

function page() {

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <p className='font-semibold text-primary'>Total Bookings: {8}</p>
                        <Link href={'/admin/bookings/new'}>
                            <Badge className="text-base font-bold cursor-pointer">
                                Add New Booking
                            </Badge>
                        </Link>
                    </div>
                    <div>
                        <BookingsList />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
