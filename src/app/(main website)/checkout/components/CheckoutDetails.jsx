'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function CheckoutDetails() {
    const searchParams = useSearchParams();
    const bookingDataString = searchParams.get('bookingData');
    const bookingData = bookingDataString ? JSON.parse(bookingDataString) : null;

    if (!bookingData) return <p className="text-center mt-10">No booking data found.</p>;

    const isRoundTrip = bookingData.dropOffs && bookingData.dropOffs.length > 0;

    return (
        <div className="w-full h-full mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between items-stretch">
            <div className='grow h-full'>

                <Card>
                    <CardContent className="p-4 space-y-2">
                        <p><strong>Pickup City:</strong> {bookingData.pickupCity}</p>
                        {isRoundTrip ? (
                            <>
                                <p className="font-semibold">Drop Offs:</p>
                                <ul className="list-disc list-inside">
                                    {bookingData.dropOffs.map((city, idx) => (
                                        <li key={idx}>{city}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p><strong>Drop City:</strong> {bookingData.dropCity}</p>
                        )}
                        <p><strong>Total Distance:</strong> {bookingData.totalDistance} km</p>
                        <p><strong>Estimated Price:</strong> ₹{bookingData.price}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4 grow bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Enter Your Details</h3>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="1234567890" />
                </div>
                <Button className="w-full mt-4">Proceed to Payment</Button>
            </div>
        </div>
    );
}

export default CheckoutDetails;
