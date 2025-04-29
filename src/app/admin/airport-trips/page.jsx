"use client"

import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { getAllAirportTrips } from '@/lib/firebase/admin/airportTrips';

function page() {
    const [loading, setLoading] = useState(false)
    const [airportTrips, setAirportTrips] = useState([])

    async function fetchAirportTrips() {
        setLoading(true)
        try {
            const res = await getAllAirportTrips()
            setAirportTrips(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAirportTrips()
    }, [])

    return (
        <div>
            <InnerLayout heading={"airport Trips"}>
                <ScrollArea className={'h-full md:pr-4'}>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex justify-between px-1'>
                            <p className='font-semibold text-primary'>Total airport Trips: {airportTrips?.length}</p>
                            <Link href={'/admin/airport-trips/form'}>
                                <Badge className="text-base font-bold cursor-pointer">
                                    Add new airport Trip
                                </Badge>
                            </Link>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {loading ? (
                                <div className="col-span-full flex justify-center py-10">
                                    <Loader2 className="animate-spin w-8 h-8 text-primary" />
                                </div>
                            ) : airportTrips.length === 0 ? (
                                <div className="col-span-full text-center text-muted-foreground py-10">
                                    No airport trips found.
                                </div>
                            ) : (
                                airportTrips.map((trip) => (
                                    <div key={trip.id} className="bg-white p-4 border rounded-lg shadow-sm flex flex-col gap-2">
                                        <h2 className="text-lg font-bold text-primary">{trip.cityName}</h2>
                                        <p className="text-sm text-muted-foreground">Distance: {trip.tripDistance} km</p>
                                        <p className="text-sm text-muted-foreground">Duration: {trip.tripHours} hours</p>
                                        <div className="mt-2 flex flex-col gap-2">
                                            {trip.variantList.map((variant, index) => (
                                                <div key={index} className="border p-2 rounded-md bg-muted">
                                                    <p className="font-semibold">{variant.cabType}</p>
                                                    <p className="text-sm">Actual Price: ₹{variant.variantAcutalPrice}</p>
                                                    <p className="text-sm">Discounted Price: ₹{variant.variantDiscountedPrice}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
