'use client'
import InnerLayout from '@/components/dashboard/layout/InnerLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react'

const packageData = [
    {
        pickUp: "Delhi",
        dropOff: "Nainital",
        Tax: true,
        cabs: [
            {
                vehicleType: "Hatchback",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "Sedan",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "SUV (Economy)",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "SUV (Premium)",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
        ]
    },

    {
        pickUp: "Delhi",
        dropOff: "Nainital",
        Tax: true,
        cabs: [
            {
                vehicleType: "Hatchback",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "Sedan",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "SUV (Economy)",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
            {
                vehicleType: "SUV (Premium)",
                minKm: 100,
                trips: [
                    {
                        tripType: "One Way Trip",
                        price: 2500
                    },
                    {
                        tripType: "Round Trip",
                        price: 4500
                    },
                    {
                        tripType: "Local Trip",
                        price: 1000
                    }
                ]
            },
        ]
    }
]

export const PackageList = () => {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPackageData = () => {
        setLoading(true);
        setPackages(packageData);
        setLoading(false);
    }

    useEffect(() => {
        fetchPackageData();
    }, []);

    return (
        <div>
            <ScrollArea className={'h-full md:pr-4'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map((pkg, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-4 py-0 space-y-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-700">Package {idx + 1}</h3>
                                    {/* <p className="text-sm text-muted-foreground">{pkg.address}</p> */}
                                </div>

                                <div className="text-sm">
                                    <p><strong>Pick Up:</strong> {pkg.pickUp}</p>
                                    <p><strong>Drop Off:</strong> {pkg.dropOff}</p>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Cabs:</p>
                                    {pkg.cabs.map((cab, cabIndex) => (
                                        <div key={cabIndex} className="border rounded-md p-2 bg-muted/30">
                                            <div className="flex flex-wrap justify-between items-center mb-1">
                                                <span className="font-semibold">Cab {cabIndex + 1}</span>
                                                <Badge className="text-xs">
                                                    {cab.vehicleType}
                                                </Badge>
                                            </div>
                                            <p className="text-sm">Minimum Travel: {cab.minKm}Kms</p>
                                            {
                                                cab?.trips && cab?.trips?.map((tr, idx) => (
                                                    <p className="text-sm" key={idx}>{tr?.tripType}: {tr.price}</p>
                                                ))
                                            }
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
