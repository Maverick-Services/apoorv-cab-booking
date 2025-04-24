"use client"

import React, { useMemo } from 'react'
import Image from 'next/image'
import useAuthStore from '@/store/useAuthStore'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CheckoutDetails() {
    const router = useRouter();
    const { userData } = useAuthStore()

    const searchParams = useSearchParams();

    const bookingDataString = searchParams.get("bookingData")
    const bookingData = bookingDataString ? JSON.parse(bookingDataString) : null

    if (!bookingData) {
        return (
            <p className="text-center mt-10 text-gray-500">
                No booking data found.
            </p>
        )
    }

    // Price calculations
    const basePrice = parseFloat(bookingData.price)
    const gstAmount = useMemo(() => parseFloat((basePrice * 0.05).toFixed(2)), [basePrice])
    const totalAmount = useMemo(
        () => parseFloat((basePrice + gstAmount).toFixed(2)),
        [basePrice, gstAmount]
    )
    const bookingAmount = useMemo(
        () => parseFloat((totalAmount * 0.2).toFixed(2)),
        [totalAmount]
    )

    const isRoundTrip = bookingData.tripType === 'Round Trip' && bookingData.dropOffs?.length > 0


    function handleBookingSuccess() {
        router.push(`/booking-success?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Cab Details */}
                <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center text-center">
                    <Image
                        src={'/car1.png'}
                        width={400}
                        height={100}
                        alt="Car Image"
                        className="h-24 w-auto rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                        Cab Type: {bookingData.cab.name}
                    </h3>
                    <p className="text-gray-700">
                        Price per km: ₹{bookingData.cab.actualPriceOneWay}
                    </p>
                </div>

                {/* Passenger Info */}
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Passenger Info</h3>
                    <p>
                        <span className="font-medium">Name:</span> {userData?.name}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {userData?.email}
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span> {userData?.phoneNo}
                    </p>
                </div>

                {/* Trip Details */}
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Trip Details</h3>
                    <p>
                        <span className="font-medium">Pickup City:</span>{' '}
                        {bookingData.pickupCity}
                    </p>
                    {isRoundTrip ? (
                        <>
                            <p className="font-medium mt-2">Drop Offs:</p>
                            <ul className="list-disc list-inside ml-4">
                                {bookingData.dropOffs.map((city, idx) => (
                                    <li key={idx}>{city}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>
                            <span className="font-medium">Drop City:</span>{' '}
                            {bookingData.dropCity}
                        </p>
                    )}
                    <p className="mt-2">
                        <span className="font-medium">Distance:</span>{' '}
                        {bookingData.totalDistance} km
                    </p>
                    <p>
                        <span className="font-medium">Trip Type:</span>{' '}
                        {bookingData.tripType}
                    </p>
                </div>

                {/* Price Calculation */}
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Price Calculation</h3>
                    <p>
                        <span className="font-medium">Base Price:</span> ₹
                        {basePrice.toFixed(2)}
                    </p>
                    <p>
                        <span className="font-medium">GST (5%):</span> ₹
                        {gstAmount.toFixed(2)}
                    </p>
                    <p className="font-medium text-lg mt-2">Total Amount:</p>
                    <p className="text-2xl font-bold mb-4">₹{totalAmount.toFixed(2)}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleBookingSuccess} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                            Pay Booking (20%): ₹{bookingAmount.toFixed(2)}
                        </button>
                        <button onClick={handleBookingSuccess} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
                            Pay Full Amount: ₹{totalAmount.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
