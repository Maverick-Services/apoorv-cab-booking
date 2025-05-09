"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import useAuthStore from '@/store/useAuthStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaCar, FaUser, FaWallet, FaReceipt, FaMapMarkerAlt } from 'react-icons/fa'
import Script from 'next/script';
import toast from 'react-hot-toast'
import axios from 'axios'
import { TRIP_TYPES } from '@/lib/constants/constants'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import UserLogin from '@/components/auth/userLogin/UserLogin'

export default function CheckoutDetails() {
    const router = useRouter();
    const { userData } = useAuthStore()
    const searchParams = useSearchParams();
    const bookingDataString = searchParams.get("bookingData")
    const bookingData = bookingDataString ? JSON.parse(bookingDataString) : null

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        exactPickup: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                ...formData,
                name: userData?.name ? userData?.name : "",
                email: userData?.email ? userData?.email : "",
            })
        }

    }, [userData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center text-lg text-gray-600 animate-pulse">
                    Loading booking details...
                </p>
            </div>
        )
    }
    // console.log(userData)
    // Price calculations
    const basePrice = parseFloat(bookingData.price)
    const driverAllowance = bookingData?.tripType === TRIP_TYPES.roundTrip
        ? parseFloat(bookingData?.cab?.driverAllowance) : 0;

    const priceWithAllowance = useMemo(() => parseFloat((basePrice + driverAllowance).toFixed(2)), [basePrice, driverAllowance]);
    const gstAmount = useMemo(() => parseFloat((priceWithAllowance * 0.05).toFixed(2)), [priceWithAllowance])
    const totalAmount = useMemo(() => parseFloat((priceWithAllowance + gstAmount).toFixed(2)), [priceWithAllowance, gstAmount])
    const bookingAmount = useMemo(() => parseFloat((totalAmount * 0.2).toFixed(2)), [totalAmount])
    const isRoundTrip = bookingData.tripType === 'Round Trip' && bookingData.dropOffs?.length > 0

    // console.log(driverAllowance, gstAmount, totalAmount)

    // function handleBookingSuccess() {
    //     router.push(`/booking-success?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`);
    // }

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    async function initiatePayment(isFullPayment) {

        if (!userData) {
            return setIsDialogOpen(true)
        }

        if (!formData.name || !formData.email || !formData.exactPickup || !userData.phoneNo)
            return toast.error('Please fill all the details');

        // if (!userData) {
        //     return await handleUserDetails(name, email, phoneNo);
        // }

        const ok = await loadRazorpay()
        if (!ok || !window.Razorpay) {
            toast.error("Could not load Razorpay SDK. Please try again later.")
            return
        }
        try {
            const amount = isFullPayment ? totalAmount : bookingAmount;
            // Create order
            const { data: orderData } = await axios.post(
                '/api/create-razorpay-order',
                { amount: amount },
                { headers: { 'Content-Type': 'application/json' } }
            )

            // 2) If server returned an error payload instead of orderData.id, bail
            if (!orderData.id || !orderData.amount) {
                console.error("Bad order response:", orderData)
                toast.error("Unable to create payment order. Try again.")
                return
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "Taps Cabs",
                description: "Cab Booking Payment",
                order_id: orderData.id,
                handler: async (response) => {
                    // console.log(response, bookingData);
                    try {
                        const { data: verificationData } = await axios.post(
                            '/api/verify-payment',
                            {
                                ...response,
                                bookingData: {
                                    ...bookingData,
                                    basePrice,
                                    gstAmount,
                                    totalAmount,
                                    driverAllowance,
                                    priceWithAllowance,
                                    bookingAmount,
                                    userData: {
                                        phoneNo: userData.phoneNo,
                                        ...formData
                                    },
                                    userId: userData.id
                                },
                                isFullPayment
                            },
                            {
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );

                        if (verificationData.success) {
                            router.push(`/booking-success?bookingId=${verificationData.bookingId}`);
                        } else {
                            toast.error("Payment verification failed");
                        }
                    } catch (err) {
                        console.error("Verification error:", err.response?.data || err.message);
                        toast.error("Could not verify payment. Please contact support.");
                    }
                },
                prefill: {
                    name: userData.name,
                    email: formData.email,
                    contact: userData.phoneNo
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error("✖️ initiatePayment error:", err.response?.data || err.message)
            toast.error(
                err.response?.data?.error ||
                "Payment failed. Please try again."
            )
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-4 xl:px-8 py-4 sm:py-3">
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => router.back()} className={'cursor-pointer'}>Trip Details</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Checkout</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="bg-white rounded-sm sm:rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FaCar className="text-white" />
                        Confirm Your Booking
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Cab Details */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-blue-50">
                            <div className="flex items-center gap-4 mb-6">
                                <FaCar className="text-blue-600 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Cab Details</h2>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image
                                    src={'/car1.png'}
                                    width={350}
                                    height={150}
                                    alt="Car Image"
                                    className="w-full max-w-xs h-48 object-contain mb-6"
                                />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {bookingData.cab.name}
                                </h3>
                            </div>
                        </div>

                        {/* Trip Details */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-blue-50">
                            <div className="flex items-center gap-4 mb-6">
                                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Trip Details</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-600">Trip Type:</span>
                                    <span className="font-medium text-gray-800">{bookingData.tripType}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-600">Pickup City:</span>
                                    <span className="font-medium text-gray-800">{bookingData.pickupCity}</span>
                                </div>

                                {isRoundTrip ? (
                                    <div>
                                        <p className="text-gray-600 mb-2">Route:</p>
                                        <ul className="space-y-2">
                                            {bookingData.dropOffs.map((city, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-gray-700">
                                                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                        {idx + 1}
                                                    </span>
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : bookingData?.tripType === TRIP_TYPES.oneWay && (
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <span className="text-gray-600">Drop City:</span>
                                        <span className="font-medium text-gray-800">{bookingData.dropCity}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Distance:</span>
                                    <span className="font-medium text-blue-600">{bookingData.totalDistance} kms</span>
                                </div>
                                {
                                    bookingData?.totalHours &&
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Hours:</span>
                                        <span className="font-medium text-blue-600">{bookingData.totalHours} Hrs</span>
                                    </div>
                                }

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pickup Date:</span>
                                    <span className="font-medium text-blue-600">{bookingData.pickupDate}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pickup Time:</span>
                                    <span className="font-medium text-blue-600">{bookingData.pickupTime}</span>
                                </div>
                                {
                                    isRoundTrip && bookingData?.returnDate &&
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Return Date:</span>
                                        <span className="font-medium text-blue-600">{bookingData.returnDate}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Passenger Info */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-blue-50">
                            <div className="flex items-center gap-4 mb-2">
                                <FaUser className="text-blue-600 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Passenger Information</h2>
                            </div>

                            <div className='w-full space-y-2 bg-white p-3 rounded-xl outline'>
                                <label className="flex gap-2 pb-2 border-gray-200">
                                    <p className="text-gray-600">Name:</p>
                                    <input
                                        className="w-full font-medium text-gray-800 outline rounded-xs px-1"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="flex gap-2 pb-2 border-gray-200">
                                    <p className="text-gray-600">Email:</p>
                                    <input
                                        className="w-full font-medium text-gray-800 outline rounded-xs px-1"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 pb-2 border-gray-200">
                                    <p className="text-gray-600">Exact Pickup Location:</p>
                                    <input
                                        className="w-full font-medium text-gray-800 outline rounded-xs px-1"
                                        name="exactPickup"
                                        value={formData.exactPickup}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>

                            {/* <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-600">Name:</span>
                                    <span className="font-medium text-gray-800">{userData?.name}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium text-gray-800">{userData?.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Phone:</span>
                                    <span className="font-medium text-gray-800">{userData?.phoneNo}</span>
                                </div>
                            </div> */}
                        </div>

                        {/* Price Details */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-blue-50">
                            <div className="flex items-center gap-4 mb-6">
                                <FaReceipt className="text-blue-600 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Price Breakdown</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Base Fare:</span>
                                    <span className="font-medium text-gray-800">₹{basePrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Driver Allowance:</span>
                                    <span className="font-medium text-gray-800">₹{driverAllowance.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">GST (5%):</span>
                                    <span className="font-medium text-gray-800">₹{gstAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                                        <span className="text-xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="space-y-4">
                            <button
                                // onClick={handleBookingSuccess}
                                onClick={() => initiatePayment(false)}
                                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-md transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    <FaWallet className="text-xl" />
                                    Pay Advance (20%)
                                </span>
                                <span className="font-medium">₹{bookingAmount.toFixed(2)}</span>
                            </button>

                            <button
                                // onClick={handleBookingSuccess}
                                onClick={() => initiatePayment(true)}
                                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-md transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    <FaWallet className="text-xl" />
                                    Pay Full Amount
                                </span>
                                <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserLogin open={isDialogOpen} onOpenChange={setIsDialogOpen} />

        </div>
    )
}