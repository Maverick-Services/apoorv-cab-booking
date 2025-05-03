'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { getAirpotTripsByCity } from '@/lib/firebase/admin/airportTrips'
import { getLocalTripsByCity } from '@/lib/firebase/admin/localTrips'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { MdAirlineSeatReclineExtra, MdOutlineLuggage } from 'react-icons/md'

export const LocalTripDetails = ({ router, userData, tripData, currentPickupCity, currentCab, cabTypes }) => {

    // console.log(tripData)
    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);
    const [tripFilter, setTripFilter] = useState(null);

    const fetchTrips = async () => {
        setLoading(true)
        try {
            const res = await (
                tripData?.tripType === TRIP_TYPES.local ? getLocalTripsByCity(tripData?.pickupCity)
                    : getAirpotTripsByCity(tripData?.pickupCity)
            );

            let updatedResult = [];
            if (res)
                updatedResult = res.map(trip => ({
                    pickupCity: trip.cityName,
                    totalDistance: trip.tripDistance,
                    tripHours: trip.tripHours,
                    variantList: trip.variantList.map(variant => ({
                        name: variant.cabType,
                        totalDistance: trip.tripDistance,
                        tripHours: trip.tripHours,
                        price: variant.variantAcutalPrice,
                        discountedPrice: variant.variantDiscountedPrice
                    }))
                }))
            setTrips(updatedResult);
            setTripFilter(updatedResult?.map(lc => (
                {
                    totalDistance: lc?.totalDistance,
                    tripHours: lc?.tripHours,
                }
            )));

        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (tripData?.tripType === TRIP_TYPES.local || tripData?.tripType === TRIP_TYPES.airport)
            fetchTrips();
    }, [tripData]);

    const handleCabBooking = (cab) => {

        // console.log(cab)
        if (!userData) {
            setIsDialogOpen(true)
            return;
        }

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            cab: {
                ...cab,
                actualPriceOneWay: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.actualPriceOneWay
            },
            pickupDate: tripData?.pickupDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: cab?.totalDistance,
            totalHours: cab?.tripHours,
            price: cab?.price,

        }
        // console.log(bookingData, tripData?.pickupDate);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !trips || !tripFilter)
        return <Loader2 />

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 space-y-6">
            <Tabs defaultValue={tripFilter && tripFilter[0]} >
                <TabsList className="w-full justify-start mb-4">
                    {
                        tripFilter?.map((tr, idx) =>
                            <TabsTrigger key={idx} value={tr}>{tr?.totalDistance}Kms {tr?.tripHours}Hrs</TabsTrigger>
                        )
                    }
                </TabsList>

                {
                    tripFilter?.map(tr => (
                        {
                            label: tr,
                            data: trips?.filter(lt =>
                                lt?.totalDistance === tr?.totalDistance && lt?.tripHours === tr?.tripHours
                            )
                        }
                    ))?.map(({ label, data }, idx) => (
                        <TabsContent value={label} key={idx}>
                            {
                                data?.map(lt =>
                                    lt?.variantList?.map((cab, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 pb-4"
                                        >
                                            <img
                                                src={MAIN_WEBSITE.car1}
                                                alt={cab?.name}
                                                className="w-20 h-14 object-contain"
                                            />

                                            <div className="text-lg text-gray-700">
                                                <p className="font-bold">{cab?.name}</p>
                                            </div>

                                            <div className="text-lg text-gray-700 self-center flex justify-start items-center gap-2">
                                                <p className="font-bold">{cab?.totalDistance} Kms</p>
                                                <p className="font-bold">For {cab?.tripHours} Hours</p>
                                            </div>

                                            <div className="text-right space-y-0.5">
                                                <div className="line-through text-sm text-gray-400">
                                                    ₹{cab?.price}
                                                </div>
                                                <div className="text-blue-700 text-xl font-bold">
                                                    ₹{cab?.discountedPrice}
                                                </div>
                                                <div className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-sm inline-block">
                                                    GUARANTEED
                                                </div>
                                            </div>

                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto"
                                                onClick={() => handleCabBooking(cab)}
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    ))
                                )}
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>
    )
}
