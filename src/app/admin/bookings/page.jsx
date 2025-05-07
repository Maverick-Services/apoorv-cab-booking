'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BOOKINGS_LIST } from '@/lib/constants/constants'
import { getAllBookings, getBookingsByDate } from '@/lib/firebase/admin/booking'
import BookingList from './components/BookingList'
import { Loader2 } from 'lucide-react'

function page() {
    const [timeFilter, setTimeFilter] = useState("today");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false)

    async function fetchAllBookings() {
        setLoading(true)
        try {
            const res = await (timeFilter === "all" ? getAllBookings() : getBookingsByDate(timeFilter));
            setBookings(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (timeFilter)
            fetchAllBookings()
    }, [timeFilter])

    if (loading)
        return <Loader2 />

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <div className='flex items-start gap-4'>
                            <p className='font-semibold text-primary'>Total Bookings: {bookings?.length}</p>
                            <select name="timeFilter"
                                className='px-2 bg-white rounded-md border border-black'
                                onChange={(e) => setTimeFilter(e.target.value)}
                                defaultValue={timeFilter}
                            >
                                {/* <option value="all">All</option> */}
                                <option value="today">Today</option>
                                {/* <option value="tomorrow">Tommorow</option> */}
                                <option value="yesterday">Yesterday</option>
                                <option value="last7days">Last 7 days</option>
                                <option value="lastMonth">Last Month</option>
                                <option value="lastYear">Last Year</option>
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
