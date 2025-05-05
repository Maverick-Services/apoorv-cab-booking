'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BOOKINGS_LIST } from '@/lib/constants/constants'
import { getAllBookings } from '@/lib/firebase/admin/booking'
import BookingList from './components/BookingList'

function page() {
    const [timeFilter, setTimeFilter] = useState("all");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false)

    async function fetchAllBookings() {
        setLoading(true)
        try {
            const res = await getAllBookings()
            setBookings(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllBookings()
    }, [])

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
                        <BookingList bookings={bookings} />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default page
