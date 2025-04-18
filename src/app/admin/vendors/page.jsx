import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

function page() {
    const VENDORS = [
        {
            name: "Vendor 1",
            contactNo: "87589665696",
            email: "vendor1@gmail.com",
            address: "ABC Colony, Delhi",
            cabs: [
                {
                    vehicleName: "Verna",
                    vehicleType: "Sedan",
                    driverName: "Harjeet Singh",
                    driverContact: "8965896589",
                    driverEmail: "harjeetsingh@gmail.com",
                },
                {
                    vehicleName: "Swift",
                    vehicleType: "Hatchback",
                    driverName: "Rajeev Kumar",
                    driverContact: "7865123456",
                    driverEmail: "rajeevk@gmail.com",
                },
            ],
        },
        {
            name: "Vendor 2",
            contactNo: "9856231458",
            email: "vendor2@gmail.com",
            address: "MG Road, Gurugram",
            cabs: [
                {
                    vehicleName: "Innova Crysta",
                    vehicleType: "SUV",
                    driverName: "Aman Tiwari",
                    driverContact: "9988776655",
                    driverEmail: "amant@gmail.com",
                },
                {
                    vehicleName: "Dzire",
                    vehicleType: "Sedan",
                    driverName: "Suresh Pal",
                    driverContact: "9876543210",
                    driverEmail: "sureshp@gmail.com",
                },
            ],
        },
        {
            name: "Vendor 3",
            contactNo: "7896541230",
            email: "vendor3@gmail.com",
            address: "Rajendra Nagar, Ghaziabad",
            cabs: [
                {
                    vehicleName: "XUV500",
                    vehicleType: "SUV",
                    driverName: "Vinod Mehra",
                    driverContact: "9801234567",
                    driverEmail: "vinodm@gmail.com",
                },
                {
                    vehicleName: "Etios",
                    vehicleType: "Sedan",
                    driverName: "Naresh Kumar",
                    driverContact: "9874501236",
                    driverEmail: "nareshk@gmail.com",
                },
            ],
        },
        {
            name: "Vendor 4",
            contactNo: "8076543210",
            email: "vendor4@gmail.com",
            address: "Sector 22, Noida",
            cabs: [
                {
                    vehicleName: "Ertiga",
                    vehicleType: "MUV",
                    driverName: "Deepak Yadav",
                    driverContact: "9123456789",
                    driverEmail: "deepaky@gmail.com",
                },
                {
                    vehicleName: "Brezza",
                    vehicleType: "SUV",
                    driverName: "Ravi Shankar",
                    driverContact: "9090909090",
                    driverEmail: "ravis@gmail.com",
                },
            ],
        },
        {
            name: "Vendor 5",
            contactNo: "8123456789",
            email: "vendor5@gmail.com",
            address: "Vikas Puri, Delhi",
            cabs: [
                {
                    vehicleName: "Ciaz",
                    vehicleType: "Sedan",
                    driverName: "Pankaj Sharma",
                    driverContact: "8787878787",
                    driverEmail: "pankajs@gmail.com",
                },
                {
                    vehicleName: "Alto",
                    vehicleType: "Hatchback",
                    driverName: "Ramesh Kumar",
                    driverContact: "8585858585",
                    driverEmail: "rameshk@gmail.com",
                },
            ],
        },
        {
            name: "Vendor 6",
            contactNo: "7012345678",
            email: "vendor6@gmail.com",
            address: "Laxmi Nagar, Delhi",
            cabs: [
                {
                    vehicleName: "Scorpio",
                    vehicleType: "SUV",
                    driverName: "Manoj Verma",
                    driverContact: "7878787878",
                    driverEmail: "manojv@gmail.com",
                },
                {
                    vehicleName: "WagonR",
                    vehicleType: "Hatchback",
                    driverName: "Ashok Rana",
                    driverContact: "7676767676",
                    driverEmail: "ashokr@gmail.com",
                },
            ],
        },
    ];

    return (
        <div>
            <InnerLayout heading={"Vendors"}>
                <ScrollArea className={'h-full md:pr-4'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {VENDORS.map((vendor, idx) => (
                            <Card key={idx}>
                                <CardContent className="p-4 space-y-2">
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
                </ScrollArea>
            </InnerLayout>
        </div>
    )
}

export default page
