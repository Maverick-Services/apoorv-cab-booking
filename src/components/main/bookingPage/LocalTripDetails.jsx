'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { getLocalTripsByCity } from '@/lib/firebase/admin/localTrips'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAirportTripsByCity } from '@/lib/firebase/admin/airportTrips';

export const LocalTripDetails = ({ router, userData, tripData, currentPickupCity, currentCab, cabTypes, noOfDays }) => {

    // console.log(tripData)
    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);
    const [tripFilter, setTripFilter] = useState(null);

    const fetchTrips = async () => {
        setLoading(true)
        try {
            const res = await (
                tripData?.tripType === TRIP_TYPES.local
                    ? getLocalTripsByCity(tripData?.pickupCity)
                    : getAirportTripsByCity(tripData?.pickupCity)
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

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            cab: {
                ...cab,
                actualPriceOneWay: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.actualPriceOneWay,
                driverAllowance: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
            },
            pickupDate: tripData?.pickupDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: cab?.totalDistance,
            totalHours: cab?.tripHours,
            price: cab?.discountedPrice,

        }
        // console.log(bookingData, tripData?.pickupDate);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !trips || !tripFilter || !currentPickupCity)
        return <Loader2 />

    return (
        <div className="lg:w-11/12 mx-auto bg-white rounded-2xl shadow-md p-4 space-y-6">
            <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Regular Trips</h1>
            <Tabs defaultValue={tripFilter && tripFilter[0]} >
                <TabsList className="w-full justify-start mb-4 ">
                    {
                        tripFilter?.map((tr, idx) =>
                            <TabsTrigger
                                key={idx} value={tr}>{tr?.tripHours}Hrs | {tr?.totalDistance}Kms</TabsTrigger>
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
                                            <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                <p className="font-bold">{cab?.name}</p>
                                            </div>
                                            <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent self-center flex justify-start items-center gap-2">
                                                <p className="font-bold">{cab?.totalDistance} Kms</p>
                                                <p className="font-bold">For {cab?.tripHours} Hours</p>
                                            </div>
                                            <div className="text-right space-y-0.5">
                                                <div className="line-through text-sm text-gray-400">
                                                    ₹{
                                                        +cab?.price + +(
                                                            currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
                                                        )
                                                    }
                                                </div>
                                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl font-bold">
                                                    ₹{
                                                        +cab?.discountedPrice + +(
                                                            currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
                                                        )
                                                    }
                                                </div>
                                                <div className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-sm inline-block">
                                                    GUARANTEED
                                                </div>
                                            </div>
                                            <Button
                                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto"
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
