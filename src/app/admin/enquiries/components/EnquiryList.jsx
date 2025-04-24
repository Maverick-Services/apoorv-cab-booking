'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBigRightDashIcon } from 'lucide-react';

function EnquiriesList({ enquiries }) {

    return (
        <div>
            <ScrollArea className="h-full sm:pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    {enquiries && enquiries?.map((enquiry, index) => {
                        // console.log(enquiry);
                        return <Dialog key={index}>
                            <DialogTrigger asChild>
                                <div
                                    // onClick={() => setSelectedBooking(booking)}
                                    className="p-4 cursor-pointer hover:shadow-lg transition duration-200 bg-white rounded-xl shadow-md space-y-2"
                                >
                                    <div className="text-lg font-semibold text-purple-700">{enquiry?.tripType}</div>
                                    {
                                        enquiry?.tripType !== "Round Trip" &&
                                        <div key={index} className="flex items-center gap-1 text-sm">
                                            <span className="p-1 px-2 rounded-2xl bg-yellow-300">{enquiry?.pickupCity}</span>
                                            {
                                                enquiry?.dropCity &&
                                                <div className='flex items-center gap-1'>
                                                    <ArrowBigRightDashIcon />
                                                    <span className="p-1 px-2 rounded-2xl bg-yellow-300">
                                                        {enquiry?.dropCity}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {
                                        enquiry?.tripType === 'Round Trip' && enquiry?.dropOffs?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-2 items-stretch">
                                                <div className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                    <span>{enquiry?.pickupCity}</span>
                                                    <ArrowBigRightDashIcon />
                                                </div>
                                                {
                                                    enquiry?.dropOffs?.map((city, index) => (
                                                        <div key={index} className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                            <span>{city}</span>
                                                            <ArrowBigRightDashIcon />
                                                        </div>
                                                    ))}
                                                <span className="text-sm flex items-center bg-yellow-300 p-1 px-2 rounded-2xl">
                                                    {enquiry?.pickupCity}
                                                </span>
                                            </div>
                                        )}
                                    <div className="text-sm text-gray-600">
                                        Estimated Distance: {enquiry?.totalDistance} kms
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Pick-up: {enquiry?.pickupTime}
                                    </div>
                                    {
                                        enquiry?.returnDate &&
                                        <div className="text-sm text-gray-500">Return: {enquiry?.returnDate}</div>
                                    }
                                    <div className="text-sm">Customer Phone No: {enquiry?.mobileNumber}</div>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Enquiry Details</DialogTitle>
                                    <DialogDescription>
                                        {/* Full trip information for <strong>{booking.customer.name}</strong> */}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-2">
                                    {
                                        enquiry?.tripType !== "Round Trip" &&
                                        <div key={index} className="flex items-center gap-1 text-sm">
                                            <span className="p-1 px-2 rounded-2xl bg-yellow-300">{enquiry?.pickupCity}</span>
                                            {
                                                enquiry?.dropCity &&
                                                <div className='flex items-center gap-1'>
                                                    <ArrowBigRightDashIcon />
                                                    <span className="p-1 px-2 rounded-2xl bg-yellow-300">
                                                        {enquiry?.dropCity}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {
                                        enquiry?.tripType === 'Round Trip' && enquiry?.dropOffs?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-2 items-stretch">
                                                <div className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                    <span>{enquiry?.pickupCity}</span>
                                                    <ArrowBigRightDashIcon />
                                                </div>
                                                {
                                                    enquiry?.dropOffs?.map((city, index) => (
                                                        <div key={index} className="flex items-center gap-1 text-sm p-1 px-2 rounded-2xl bg-yellow-300">
                                                            <span>{city}</span>
                                                            <ArrowBigRightDashIcon />
                                                        </div>
                                                    ))}
                                                <span className="text-sm flex items-center bg-yellow-300 p-1 px-2 rounded-2xl">
                                                    {enquiry?.pickupCity}
                                                </span>
                                            </div>
                                        )}
                                    <p><strong>Trip Type:</strong> {enquiry?.tripType}</p>
                                    <p><strong>Estimated Distance:</strong> {enquiry?.totalDistance} kms</p>
                                    <p><strong>Pick-up Date & Time:</strong> {enquiry?.pickupTime}</p>
                                    {
                                        enquiry?.returnDate && <p><strong>Return:</strong> {enquiry?.returnDate}</p>
                                    }
                                    <p><strong>Phone:</strong> {enquiry?.mobileNumber}</p>
                                    {/* <hr /> */}
                                    {/* <p><strong>Customer Name:</strong> {booking.customer.name}</p>
                                    <p><strong>Email:</strong> {booking.customer.email}</p> */}
                                </div>
                            </DialogContent>
                        </Dialog>
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}

export default EnquiriesList
