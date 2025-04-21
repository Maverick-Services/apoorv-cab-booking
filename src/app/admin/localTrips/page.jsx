import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { VENDORS } from '@/lib/constants/constants';

function page() {
    return (
        <div>
            <InnerLayout heading={"Local Trips"}>
                <ScrollArea className={'h-full md:pr-4'}>

                    {/* Vendor Count and new Vendor Button */}
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex justify-between px-1'>
                            <p className='font-semibold text-primary'>Total Local Trips: {6}</p>
                            <Link href={'/admin/vendors/new'}>
                                <Badge className="text-base font-bold cursor-pointer">
                                    Add new Local Trip
                                </Badge>
                            </Link>
                        </div>

                        {/* Vendor List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {VENDORS.map((vendor, idx) => (
                                <Card key={idx}>
                                    <CardContent className="p-4 py-0 space-y-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-purple-700">{vendor.name}</h3>
                                            <p className="text-sm text-muted-foreground">{vendor.address}</p>
                                        </div>

                                        <div className="text-sm">
                                            <p><strong>Contact:</strong> {vendor.contactNo}</p>
                                            <p><strong>Email:</strong> {vendor.email}</p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Cabs:</p>
                                            {vendor.cabs.map((cab, cabIndex) => (
                                                <div key={cabIndex} className="border rounded-md p-2 bg-muted/30">
                                                    <div className="flex flex-wrap justify-between items-center mb-1">
                                                        <span className="font-semibold">{cab.vehicleName}</span>
                                                        <Badge className="text-xs">
                                                            {cab.vehicleType}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm">Driver: {cab.driverName}</p>
                                                    <p className="text-sm">Contact: {cab.driverContact}</p>
                                                    <p className="text-sm">Email: {cab.driverEmail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
