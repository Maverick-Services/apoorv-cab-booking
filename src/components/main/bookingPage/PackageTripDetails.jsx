'use client'

import { Button } from '@/components/ui/button'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
import { TRIP_TYPES } from '@/lib/constants/constants'
import { getPackageTripsByTripType } from '@/lib/firebase/admin/tripPackage'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const PackageTripDetails = ({ router, tripData, currentPickupCity }) => {

    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        setLoading(true)
        try {
            const res = await getPackageTripsByTripType(tripData?.tripType);

            let updatedResult = [...res];
            if (res)
                updatedResult = res.map(trip => ({
                    tripType: trip.tripType,
                    pickupCity: trip.pickupCity,
                    dropCity: trip.dropCity,
                    dropOffs: trip.dropOffs,
                    totalDistance: tripData.totalDistance,
                    // tripHours: trip.tripHours,
                    variantList: trip.variantList.map(variant => ({
                        name: variant.cabType,
                        totalDistance: tripData.totalDistance,
                        // tripHours: trip.tripHours,
                        price: variant.variantAcutalPrice,
                        discountedPrice: variant.variantDiscountedPrice
                    }))
                }))


            // Strict order array comparison
            function arraysEqual(a = [], b = []) {
                if (a.length !== b.length) return false;
                return a.every((val, index) => val === b[index]);
            }

            if (tripData?.tripType === TRIP_TYPES.oneWay) {
                updatedResult = updatedResult?.filter(pc =>
                    pc?.pickupCity === tripData?.pickupCity &&
                    pc?.dropCity === tripData?.dropCity
                );
            } else if (tripData?.tripType === TRIP_TYPES.roundTrip) {
                updatedResult = updatedResult?.filter(pc =>
                    pc?.pickupCity === tripData?.pickupCity &&
                    arraysEqual(pc?.dropOffs, tripData?.dropOffs)
                );
            }

            setTrips(updatedResult);

        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTrips();
    }, [tripData]);

    const handleCabBooking = (cab) => {

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            dropCity: tripData?.dropCity ? tripData?.dropCity : "",
            dropOffs: (tripData?.dropOffs && tripData?.dropOffs) ? tripData?.dropOffs : [],
            cab: {
                ...cab,
                actualPriceOneWay: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.actualPriceOneWay,
                driverAllowance: currentPickupCity?.variantList?.filter(cb => cb?.name === cab?.name)[0]?.driverAllowance
            },
            pickupDate: tripData?.pickupDate,
            returnDate: tripData?.returnDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: cab?.totalDistance,
            totalHours: cab?.tripHours,
            price: cab?.discountedPrice,

        }
        // console.log(bookingData);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !trips || !currentPickupCity)
        return <Loader2 />

    if (trips?.length <= 0)
        return null;

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-md p-4 lg:p-6 space-y-6">
            <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Special Packages Just for You</h1>
            {
                trips?.map(lt =>
                    lt?.variantList?.map((cab, index) => (
                        <div
                            key={index}
                            className="bg-white grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 p-4 rounded-2xl shadow-sm"
                        >
                            <img
                                src={MAIN_WEBSITE.car1}
                                alt={cab?.name}
                                className="w-20 h-14 object-contain"
                            />

                            <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                <p className="font-bold">{cab?.name}</p>
                            </div>

                            {/* <div className="text-lg text-gray-700 self-center flex justify-start items-center gap-2">
                            <p className="font-bold">{cab?.totalDistance} Kms</p>
                            <p className="font-bold">For {cab?.tripHours} Hours</p>
                        </div> */}

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
        </div>
    )
}
