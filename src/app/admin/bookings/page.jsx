'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllBookings, getBookingsByDate, getBookingsByCustomRange } from '@/lib/firebase/admin/booking'
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
    const [customRange, setCustomRange] = useState({ start: '', end: '' });

    async function fetchAllBookings() {
        setLoading(true);
        try {
            let res;
            if (timeFilter === "all") {
                res = await getAllBookings();
            } else if (timeFilter === "custom" && customRange.start && customRange.end) {
                res = await getBookingsByCustomRange(customRange.start, customRange.end);
            } else {
                res = await getBookingsByDate(timeFilter);
            }
            setBookings(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (timeFilter !== "custom" || (customRange.start && customRange.end)) {
            fetchAllBookings();
        }
    }, [timeFilter, customRange]);

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

                            <div className='flex items-center gap-4'>
                                <select
                                    name="timeFilter"
                                    className='px-2 py-1 bg-white rounded-md border border-black w-fit'
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    defaultValue={timeFilter}
                                >
                                    <option value="today">Scheduled Today</option>
                                    <option value="upcoming">Scheduled Upcoming</option>
                                    <option value="yesterday">Scheduled Yesterday</option>
                                    <option value="last7days">Scheduled Past 7 days</option>
                                    <option value="lastMonth">Scheduled Past 1 Month</option>
                                    <option value="lastYear">Scheduled Past 1 Year</option>
                                    <option value="custom">Custom Date Range</option>
                                    <option value="all">All</option>
                                </select>
                                {timeFilter === 'custom' && (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="date"
                                            value={customRange.start}
                                            onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                                            className='border px-2 py-1 rounded bg-white'
                                        />
                                        <span className='font-semibold'>to</span>
                                        <input
                                            type="date"
                                            value={customRange.end}
                                            onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                                            className='border px-2 py-1 rounded bg-white'
                                        />
                                    </div>
                                )}
                            </div>
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
