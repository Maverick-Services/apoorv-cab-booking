'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllBookings, getBookingsByDate } from '@/lib/firebase/admin/booking'
import BookingList from './components/BookingList'
import { Loader2 } from 'lucide-react'
import { CSVLink } from 'react-csv'

// Helper function to flatten nested objects
const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? `${prefix}_` : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
};

function Page() {
    const [timeFilter, setTimeFilter] = useState("today");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false)

    async function fetchAllBookings() {
        setLoading(true)
        try {
            const res = await (timeFilter === "all" ? getAllBookings() : getBookingsByDate(timeFilter));
            console.log(res)
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

    const flattenedBookings = bookings.map(flattenObject);

    return (
        <div>
            <InnerLayout heading={"Bookings"}>
                <div className='pb-3'>
                    <div className='w-full flex justify-between px-1 mb-3'>
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center gap-4">
                                <p className='font-semibold text-primary flex gap-2 items-center'>
                                    Total Bookings: {
                                        loading || !bookings ? <Loader2 size={15} className="animate-spin" /> : bookings.length
                                    }
                                </p>

                                {!loading && bookings.length > 0 && (
                                    <CSVLink
                                        data={flattenedBookings}
                                        filename={`bookings-${timeFilter}.csv`}
                                        className="bg-primary text-white px-4 py-1 rounded-md text-sm font-medium hover:opacity-90 transition"
                                    >
                                        Export CSV
                                    </CSVLink>
                                )}
                            </div>

                            <select name="timeFilter"
                                className='px-2 py-1 bg-white rounded-md border border-black w-fit'
                                onChange={(e) => setTimeFilter(e.target.value)}
                                defaultValue={timeFilter}
                            >
                                <option value="today">Today</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="last7days">Past 7 days</option>
                                <option value="lastMonth">Past 1 Month</option>
                                <option value="lastYear">Past 1 Year</option>
                                <option value="all">All</option>
                            </select>
                        </div>

                        <Link href={'/admin/bookings/new'}>
                            <Badge className="text-base font-bold cursor-pointer">
                                Add New Booking
                            </Badge>
                        </Link>
                    </div>

                    <div>
                        <BookingList loading={loading} bookings={bookings} />
                    </div>
                </div>
            </InnerLayout>
        </div>
    )
}

export default Page
