'use client'

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import EnquiriesList from './components/EnquiryList'
import { getAllEnquiries } from '@/lib/firebase/admin/enquiry'
import { Loader2 } from 'lucide-react'

function page() {
    const [timeFilter, setTimeFilter] = useState("all");
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllEnquiries() {
        setLoading(true)
        try {
            const res = await getAllEnquiries()
            setEnquiries(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAllEnquiries()
    }, [])

    // console.log("enquiries", enquiries);
    useEffect(() => {
        let enquiryArr = enquiries;

        if (timeFilter !== "all") {
            enquiryArr = enquiryArr?.filter(eq =>
                timeFilter == "past" ? new Date(eq?.timestamp) < Date.now()
                    : timeFilter == "upcoming" ? new Date(eq?.timestamp) > Date.now() : new Date(eq?.timestamp) == Date.now()
            )
        }

        setEnquiries(enquiryArr);
    }, [timeFilter])

    return (
        <div>
            <InnerLayout heading={"Enquiries"}>
                {
                    loading || !enquiries ? <Loader2 className='animate-spin text-primary w-10 h-10 mx-auto mt-20' /> :
                        <div className='pb-3'>
                            <div className='w-full flex justify-between px-1 mb-3'>
                                <div className='flex items-start gap-4'>
                                    <p className='font-semibold text-primary'>Total Enquiries: {enquiries?.length}</p>
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
                            </div>
                            <div>
                                {

                                    enquiries?.length > 0 ? <EnquiriesList enquiries={enquiries} fetchAllEnquiries={fetchAllEnquiries} /> : <p className='text-center text-lg font-semibold'>No Enquiries Found</p>
                                }
                            </div>
                        </div>
                }
            </InnerLayout>
        </div>
    )
}

export default page
