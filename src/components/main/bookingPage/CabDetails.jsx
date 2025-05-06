"use client";

import { useSearchParams } from "next/navigation";
import { MdOutlineLuggage, MdAirlineSeatReclineExtra } from "react-icons/md";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { ArrowRight, Loader2, MapPin, CalendarDays, Clock, CalendarCheck, Compass, Pencil, Route, } from "lucide-react";
import BookingForm from "../home/BookingForm";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { Fragment, useEffect, useState } from "react";
import { getAllCabTypes } from "@/lib/firebase/admin/cabType";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import LoginDialogOuter from "../LoginDialogOuter";
import { TRIP_TYPES } from "@/lib/constants/constants";
import { LocalTripDetails } from "./LocalTripDetails";

export const CabDetails = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { userData } = useAuthStore()

    const tripDataString = searchParams.get("tripData");
    const tripData = tripDataString ? JSON.parse(tripDataString) : null;

    const [currentPickupCity, setCurrentPickupCity] = useState([]);
    const [cabTypes, setCabTypes] = useState([]);
    const [currentCab, setCurrentCab] = useState(null);
    const [editTrip, setEditTrip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

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


    const handleCabBooking = (cab) => {

        if (!userData) {
            setIsDialogOpen(true)
            return
        }

        const finalBookingPrice = (
            tripData?.totalDistance * (tripData?.tripType === "Round Trip"
                ? cab?.discountedPriceRoundTrip
                : cab?.discountedPriceOneWay)).toFixed(0)

        let bookingData = {
            tripType: tripData?.tripType,
            pickupCity: tripData?.pickupCity,
            dropCity: tripData?.dropCity,
            dropOffs: tripData?.dropOffs,
            cab: cab,
            pickupDate: tripData?.pickupDate,
            pickupTime: tripData?.pickupTime,
            totalDistance: tripData?.totalDistance,
            price: finalBookingPrice
        }
        // console.log(bookingData, tripData?.pickupDate);

        router.push(`/checkout?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    }

    if (loading || !currentPickupCity)
        return <div className="h-52 flex w-full items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10 mx-auto mt-20" />;
        </div>

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl space-y-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Trip Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Trip Header */}
                {tripData && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-6 lg:p-8 border border-indigo-100 transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
                            {/* Left Content */}
                            <div className="space-y-6 flex-1">
                                {/* Header */}
                                <div className="pb-5 border-b  flex w-full justify-between items-center">
                                    <h3 className="text-sm font-bold border-teal-100 text-teal-600 uppercase tracking-wider flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-teal-500" />
                                        <span className="bg-gradient-to-r from-teal-100 to-purple-100 px-4 py-2 rounded-full">Journey Overview</span>
                                    </h3>
                                    {/* Edit Button */}
                                    <Dialog isOpen={editTrip} onOpenChange={(isOpen) => setEditTrip(isOpen)}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 sm:self-start px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <Pencil className="w-5 h-5 text-teal-200" />
                                                <span className="text-base hidden sm:block">Modify Trip Plan</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl bg-indigo-50 border-teal-100">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-3 text-indigo-900">
                                                    <Pencil className="w-6 h-6 text-teal-500" />
                                                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                        Edit Travel Details
                                                    </span>
                                                </DialogTitle>
                                            </DialogHeader>
                                            <BookingForm editTrip={editTrip} setEditTrip={setEditTrip} />
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {/* Route Visualization */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-indigo-900 font-bold text-xl">
                                        {tripData.tripType === "Round Trip" && tripData.dropOffs?.length > 0 ? (
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 space-y-2">
                                                <span className="bg-gradient-to-br text-sm sm:text-lg from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                                <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                {tripData.dropOffs.map((dr, idx) => (
                                                    <Fragment key={idx}>
                                                        <span className="bg-white px-4 py-2 text-sm sm:text-lg rounded-full border-2 border-teal-200 shadow-md">{dr}</span>
                                                        <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                    </Fragment>
                                                ))}
                                                <span className="bg-gradient-to-br text-sm sm:text-lg from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <span className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">{tripData.pickupCity}</span>
                                                <ArrowRight className="w-6 h-6 text-teal-500 mx-2" />
                                                <span className="bg-white px-4 py-2 rounded-full border-2 border-teal-200 shadow-md">{tripData.dropCity}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5">
                                    {[
                                        { icon: CalendarDays, label: "Pickup Date", value: tripData.pickupDate, color: "text-teal-500" },
                                        { icon: Clock, label: "Pickup Time", value: tripData.pickupTime, color: "text-purple-500" },
                                        ...(tripData?.returnDate ? [{ icon: CalendarCheck, label: "Return Date", value: tripData.returnDate, color: "text-indigo-500" }] : []),
                                        { icon: Compass, label: "Trip Type", value: tripData.tripType, color: "text-teal-500" },
                                        ...(tripData?.totalDistance ? [{ icon: Route, label: "Total Distance", value: `${tripData.totalDistance} km`, color: "text-purple-500" }] : [])
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md">
                                            <item.icon className={`w-7 h-7 ${item.color}`} />
                                            <div>
                                                <p className="text-sm font-semibold text-indigo-600 mb-1">{item.label}</p>
                                                <p className="text-indigo-900 font-bold">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {/* Cab List */}
                {
                    tripData?.tripType === TRIP_TYPES.local || tripData?.tripType === TRIP_TYPES.airport
                        ? (
                            // Local or Airport Trips
                            <LocalTripDetails
                                router={router}
                                userData={userData}
                                tripData={tripData}
                                currentPickupCity={currentPickupCity}
                                currentCab={currentCab}
                                cabTypes={cabTypes}
                            />
                        )
                        : (
                            // One Way or Round Trips
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

                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto"
                                            onClick={() => handleCabBooking(cab)}
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )
                }

                <LoginDialogOuter open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            </div>
        </div>
    );
};