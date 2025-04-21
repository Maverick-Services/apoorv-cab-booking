'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import BookingsList from './components/BookingsList'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BOOKINGS_LIST } from '@/lib/constants/constants'

function page() {
    const [timeFilter, setTimeFilter] = useState("all");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        let bookingArr = BOOKINGS_LIST;

        if (timeFilter !== "all") {
            bookingArr = bookingArr?.filter(bk =>
                timeFilter == "past" ? new Date(bk?.pickUpDate) < Date.now()
                    : timeFilter == "upcoming" ? new Date(bk?.pickUpDate) > Date.now() : new Date(bk?.pickUpDate) == Date.now()
            )
        }

        setBookings(bookingArr);
    }, [timeFilter])

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <div className='flex items-start gap-4'>
                            <p className='font-semibold text-primary'>Total Bookings: {8}</p>
                            <select name="timeFilter"
                                className='px-2 bg-white rounded-md border border-black'
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past</option>
                                <option value="today">Today</option>
                            </select>
                        </div>
                        <Link href={'/admin/bookings/new'}>
                            <Badge className="text-base font-bold cursor-pointer">
                                Add New Booking
                            </Badge>
                        </Link>
                    </div>
                    <div>
                        <BookingsList bookings={bookings} />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
