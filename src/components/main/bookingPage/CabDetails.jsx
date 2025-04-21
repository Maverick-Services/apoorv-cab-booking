"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import BookingForm from "../home/BookingForm";

const cabOptions = [
    {
        type: "Hatchback",
        models: "WagonR, Celerio or similar",
        image: "/images/hatchback.png",
        oldPrice: "₹14,895",
        newPrice: "₹10,398",
        savings: "Save ₹4,497",
        distance: "1179 km",
        facilities: ["4 Seater", "1 Bag", "AC"],
    },
    {
        type: "Sedan",
        models: "Dzire, Etios or similar",
        image: "/images/sedan.png",
        oldPrice: "₹15,400",
        newPrice: "₹11,100",
        savings: "Save ₹4,300",
        distance: "1179 km",
        facilities: ["4 Seater", "2 Bags", "AC"],
    },
    {
        type: "SUV",
        models: "Ertiga, Xylo or similar",
        image: "/images/suv.png",
        oldPrice: "₹18,200",
        newPrice: "₹13,800",
        savings: "Save ₹4,400",
        distance: "1179 km",
        facilities: ["6 Seater", "3 Bags", "AC"],
    },
];

export const CabDetails = () => {
    const searchParams = useSearchParams();
    const tripDataString = searchParams.get("tripData");
    const tripData = tripDataString ? JSON.parse(tripDataString) : null;

    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="w-full flex justify-center p-4">
            <div className="w-full max-w-5xl space-y-6">

                {/* Trip Header */}
                {tripData && (
                    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            {/* Route & Trip Info */}
                            <div className="space-y-2">
                                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                                    Trip Details
                                </p>

                                {tripData.tripType === "Round Trip" && tripData.dropOffs?.length > 0 ? (
                                    <div className="flex flex-wrap items-center gap-2 text-blue-800 font-medium">
                                        <span className="flex items-center gap-1">
                                            {tripData.pickupCity} <ArrowRightCircle size={18} />
                                        </span>
                                        {tripData.dropOffs.map((dr, idx) => (
                                            <span key={idx} className="flex items-center gap-1">
                                                {dr} <ArrowRightCircle size={18} />
                                            </span>
                                        ))}
                                        <span>{tripData.pickupCity}</span>
                                    </div>
                                ) : (
                                    <div className="text-blue-800 font-medium">
                                        {tripData.pickupCity} <ArrowRightCircle className="inline ml-1" size={18} /> {tripData.dropCity}
                                    </div>
                                )}

                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Type:</span> {tripData.tripType}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Pickup date and time:</span> {tripData.pickupTime}
                                </div>
                                {
                                    tripData?.returnDate &&
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Return date:</span> {tripData.returnDate}
                                    </div>
                                }
                            </div>

                            {/* Edit Button */}
                            <Dialog open={openForm} onOpenChange={setOpenForm}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm"
                                    >
                                        Edit Trip
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Edit Trip Details</DialogTitle>
                                    </DialogHeader>
                                    <BookingForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )}

                {/* Cab List */}
                <div className="bg-white rounded-2xl shadow-md p-4 space-y-6">
                    {cabOptions.map((cab, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 pb-4"
                        >
                            <img
                                src={cab.image}
                                alt={cab.type}
                                className="w-20 h-14 object-contain"
                            />

                            {/* Cab Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#1E1B4B]">{cab.type}</h3>
                                <p className="text-sm text-gray-500">{cab.models}</p>
                                <Dialog>
                                    <DialogTrigger className="text-xs text-blue-600 underline hover:text-blue-800 mt-1">
                                        View Details
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl rounded-xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl">{cab.type} – Details</DialogTitle>
                                        </DialogHeader>

                                        <Tabs defaultValue="inclusions" className="w-full mt-4">
                                            <TabsList className="grid grid-cols-4 bg-gray-100 rounded-lg p-1 mb-4">
                                                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                                                <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                                                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                                                <TabsTrigger value="tnc">T&C</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="inclusions">
                                                <div className="space-y-2 text-sm">
                                                    <div>⛽ <strong>Lowest Base Fare</strong></div>
                                                    <div>🧑‍✈️ <strong>Driver Allowance</strong></div>
                                                    <div>📜 <strong>GST (5%)</strong></div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="exclusions">
                                                <div className="space-y-2 text-sm">
                                                    <div>🛣️ Pay ₹11/km after <strong>{cab.distance}</strong></div>
                                                    <div>🧾 Toll/State Tax (<strong>₹500–₹600</strong>)</div>
                                                    <div>🅿️ Parking</div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="facilities">
                                                <div className="space-y-2 text-sm">
                                                    {cab.facilities.map((item, idx) => (
                                                        <div key={idx}>✅ {item}</div>
                                                    ))}
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="tnc">
                                                <ul className="list-disc list-inside text-sm space-y-1">
                                                    <li>Trip has a KM and Hour limit (if applicable).</li>
                                                    <li>Airport entry charge not included.</li>
                                                    <li>All toll, parking, and state taxes to be paid separately.</li>
                                                    <li>Additional charges apply for night travel (9:45 PM – 6:00 AM).</li>
                                                    <li>Plan itinerary in advance. Last-minute changes may not be possible.</li>
                                                    <li>AC might be off during hill climbs.</li>
                                                </ul>
                                            </TabsContent>
                                        </Tabs>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Distance */}
                            <div className="text-lg text-gray-700 text-right sm:text-center">
                                <p className="font-bold">Includes {cab.distance}</p>
                            </div>

                            {/* Pricing */}
                            <div className="text-right space-y-0.5">
                                <div className="line-through text-sm text-gray-400">{cab.oldPrice}</div>
                                <div className="text-blue-700 text-xl font-bold">{cab.newPrice}</div>
                                <div className="text-red-500 text-xs">{cab.savings}</div>
                                <div className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-sm inline-block">
                                    GUARANTEED
                                </div>
                            </div>

                            {/* CTA */}
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto">
                                Book Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
