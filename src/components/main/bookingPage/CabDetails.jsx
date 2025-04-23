"use client";

import { useSearchParams } from "next/navigation";
import { MdOutlineLuggage, MdAirlineSeatReclineExtra } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import BookingForm from "../home/BookingForm";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { useEffect, useState } from "react";
import { getAllCabTypes } from "@/lib/firebase/admin/cabType";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import LoginDialog from "./LoginDialog";

export const CabDetails = () => {
    const searchParams = useSearchParams();
    const tripDataString = searchParams.get("tripData");
    const tripData = tripDataString ? JSON.parse(tripDataString) : null;
    const [currentPickupCity, setCurrentPickupCity] = useState([]);
    const [cabTypes, setCabTypes] = useState([]);
    const [currentCab, setCurrentCab] = useState(null);
    const [editTrip, setEditTrip] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchPickupCities() {
        setLoading(true);
        try {
            let res = await getAllPickupCities();
            if (res) {
                setCurrentPickupCity(res.filter((item) => item.name === tripData?.pickupCity)[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function fetchAllCabTypes() {
        setLoading(true);
        try {
            let res = await getAllCabTypes();
            if (res) setCabTypes(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchPickupCities();
        fetchAllCabTypes();
    }, []);

    // console.log(editTrip)

    if (loading || !currentPickupCity)
        return <Loader2 className="animate-spin text-blue-600 w-10 h-10 mx-auto mt-20" />;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl space-y-6">

                {/* Trip Header */}
                {tripData && (
                    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
                                {tripData?.returnDate && (
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Return date:</span> {tripData.returnDate}
                                    </div>
                                )}
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Distance:</span> {tripData?.totalDistance} kms
                                </div>
                            </div>

                            <Dialog isOpen={editTrip} onOpenChange={(isOpen) => setEditTrip(isOpen)}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm"
                                    >
                                        Edit Trip
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl h-full overflow-x-hidden overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Edit Trip Details</DialogTitle>
                                    </DialogHeader>
                                    <BookingForm editTrip={editTrip} setEditTrip={setEditTrip} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                )}

                {/* Cab List */}
                <div className="bg-white rounded-2xl shadow-md p-4 space-y-6">
                    {currentPickupCity?.variantList?.map((cab, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 border-b last:border-b-0 pb-4"
                        >
                            <img
                                src={MAIN_WEBSITE.car1}
                                alt={cab?.name}
                                className="w-20 h-14 object-contain"
                            />

                            <div>
                                <h3 className="text-lg font-semibold text-[#1E1B4B]">{cab?.name}</h3>
                                <Dialog
                                    onOpenChange={(isOpen) => {
                                        if (!isOpen) setCurrentCab(null);
                                    }}
                                >
                                    {tripData?.tripType === "Round Trip" && (
                                        <DialogTrigger
                                            className="text-xs text-blue-600 underline hover:text-blue-800 mt-1"
                                            onClick={() =>
                                                setCurrentCab(
                                                    cabTypes.find(
                                                        (cb) =>
                                                            cb?.name_lower === cab?.name?.toLowerCase()
                                                    )
                                                )
                                            }
                                        >
                                            View Details
                                        </DialogTrigger>
                                    )}
                                    <DialogContent className="max-w-3xl rounded-xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl">
                                                {cab?.name} – Details
                                            </DialogTitle>
                                        </DialogHeader>

                                        <Tabs defaultValue="inclusions" className="w-full mt-4">
                                            <TabsList className="w-full grid grid-cols-4 bg-gray-100 rounded-lg p-1 mb-4">
                                                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                                                <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                                                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                                                <TabsTrigger value="tnc">T&C</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="inclusions">
                                                <div className="space-y-2 text-sm">
                                                    <div>⛽ <strong>Lowest Base Fare: ₹{
                                                        tripData?.tripType === "Round Trip"
                                                            ? cab?.discountedPriceRoundTrip
                                                            : cab?.discountedPriceOneWay
                                                    }/Km</strong></div>
                                                    <div>🧑‍✈️ <strong>Driver Allowance: ₹{cab?.driverAllowance}</strong></div>
                                                    <div>📜 <strong>GST (5%)</strong></div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="exclusions">
                                                <div className="space-y-2 text-sm">
                                                    <div>🧾 Toll/State Tax (<strong>₹500–₹600</strong>)</div>
                                                    <div>🅿️ Parking</div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="facilities">
                                                {currentCab ? (
                                                    <div className="flex justify-evenly">
                                                        <div className="flex items-center text-lg">
                                                            <MdOutlineLuggage />
                                                            <p>{currentCab?.luggageCapacity}</p>
                                                        </div>
                                                        <div className="flex items-center text-lg">
                                                            <MdAirlineSeatReclineExtra />
                                                            <p>{currentCab?.seatingCapacity}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>No Facilities Yet</div>
                                                )}
                                            </TabsContent>

                                            <TabsContent value="tnc">
                                                <ul className="list-disc list-inside text-sm space-y-1">
                                                    {currentPickupCity?.terms?.length ? (
                                                        currentPickupCity.terms.map((tc, idx) => (
                                                            <li key={idx}>{tc}</li>
                                                        ))
                                                    ) : (
                                                        <li>No T&C yet</li>
                                                    )}
                                                </ul>
                                            </TabsContent>
                                        </Tabs>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="text-lg text-gray-700 text-right sm:text-center">
                                <p className="font-bold">Includes {tripData?.totalDistance} Kms</p>
                            </div>

                            <div className="text-right space-y-0.5">
                                <div className="line-through text-sm text-gray-400">
                                    ₹{(
                                        tripData?.totalDistance *
                                        (tripData?.tripType === "Round Trip"
                                            ? cab?.actualPriceRoundTrip
                                            : cab?.actualPriceOneWay)
                                    ).toFixed(0)}
                                </div>
                                <div className="text-blue-700 text-xl font-bold">
                                    ₹{(
                                        tripData?.totalDistance *
                                        (tripData?.tripType === "Round Trip"
                                            ? cab?.discountedPriceRoundTrip
                                            : cab?.discountedPriceOneWay)
                                    ).toFixed(0)}
                                </div>
                                <div className="text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-sm inline-block">
                                    GUARANTEED
                                </div>
                            </div>

                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto">
                                Book Now
                            </Button>
                        </div>
                    ))}
                </div>

                <LoginDialog
                    open={loginDialog}
                    onOpenChange={setLoginDialoog}
                    onSave={handleLogin}
                />
            </div>
        </div>
    );
};
