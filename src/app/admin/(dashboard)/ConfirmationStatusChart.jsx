'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const BOOKINGS_LIST = [
    {
        tripType: 'Round Trip',
        vehicleType: 'Sedan',
        pickUpLocation: "Delhi",
        dropLocation: 'Meerut',
        pickUpDate: '20 Apr 2025',
        pickUpTime: '12:30 AM',
        returnDate: "22 Apr 2025",
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Raghav",
            mobileNo: 9844587856,
            email: 'raghav@gmail.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Sedan',
        pickUpLocation: "Delhi",
        dropLocation: 'Meerut',
        pickUpDate: '20 Apr 2025',
        pickUpTime: '12:30 AM',
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Anju",
            mobileNo: 9856987856,
            email: 'anju@gmail.com'
        },
        assignedVendor: "PtkcL4WAoSWLFUxAN8sHwGAkNY73"
    },
    {
        tripType: 'One Way',
        vehicleType: 'SUV',
        pickUpLocation: "Noida",
        dropLocation: 'Agra',
        pickUpDate: '21 Apr 2025',
        pickUpTime: '9:00 AM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Scheduled',
        customer: {
            name: "Sohail",
            mobileNo: 9876543210,
            email: 'sohail@gmail.com'
        },
        assignedVendor: "AbcdEfGh123456"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'Hatchback',
        pickUpLocation: "Gurgaon",
        dropLocation: 'Jaipur',
        pickUpDate: '22 Apr 2025',
        pickUpTime: '7:30 AM',
        returnDate: "24 Apr 2025",
        confirmationStatus: "Rejected",
        tripStatus: 'Cancelled',
        customer: {
            name: "Pooja",
            mobileNo: 9123456789,
            email: 'pooja@yahoo.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Sedan',
        pickUpLocation: "Chandigarh",
        dropLocation: 'Delhi',
        pickUpDate: '23 Apr 2025',
        pickUpTime: '4:00 PM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Completed',
        customer: {
            name: "Vikram",
            mobileNo: 9988776655,
            email: 'vikram@outlook.com'
        },
        assignedVendor: "VendorUID09876"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'SUV',
        pickUpLocation: "Lucknow",
        dropLocation: 'Varanasi',
        pickUpDate: '25 Apr 2025',
        pickUpTime: '10:00 AM',
        returnDate: "28 Apr 2025",
        confirmationStatus: "Pending",
        tripStatus: 'Pending',
        customer: {
            name: "Neha",
            mobileNo: 9001122334,
            email: 'neha@rediffmail.com'
        },
        assignedVendor: null
    },
    {
        tripType: 'One Way',
        vehicleType: 'Hatchback',
        pickUpLocation: "Pune",
        dropLocation: 'Mumbai',
        pickUpDate: '26 Apr 2025',
        pickUpTime: '6:45 AM',
        confirmationStatus: "Confirmed",
        tripStatus: 'Ongoing',
        customer: {
            name: "Arjun",
            mobileNo: 8899776655,
            email: 'arjun@gmail.com'
        },
        assignedVendor: "VendorXyz789"
    },
    {
        tripType: 'Round Trip',
        vehicleType: 'Sedan',
        pickUpLocation: "Hyderabad",
        dropLocation: 'Vizag',
        pickUpDate: '27 Apr 2025',
        pickUpTime: '3:15 PM',
        returnDate: "29 Apr 2025",
        confirmationStatus: "Confirmed",
        tripStatus: 'Scheduled',
        customer: {
            name: "Sneha",
            mobileNo: 9876547890,
            email: 'sneha@gmail.com'
        },
        assignedVendor: "VendorUID12345"
    }
];

const ConfirmationStatusChart = () => {
    const pendingCount = BOOKINGS_LIST.filter(item => item.confirmationStatus === 'Pending').length;
    const confirmedCount = BOOKINGS_LIST.filter(item => item.confirmationStatus === 'Confirmed').length;
    const rejectedCount = BOOKINGS_LIST.filter(item => item.confirmationStatus === 'Rejected').length;

    const data = [
        { status: 'Pending', count: pendingCount },
        { status: 'Confirmed', count: confirmedCount },
        { status: 'Rejected', count: rejectedCount },
    ];

    const COLORS_MAP = {
        Pending: '#f97316',   // orange
        Confirmed: '#22c55e', // green
        Rejected: '#ef4444',  // red
    };

    return (
        <div className="w-full h-[400px] bg-white rounded-xl p-4 px-5 pb-12">
            <h2 className="text-xl font-semibold mb-4">Booking Confirmation Status</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_MAP[entry.status]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConfirmationStatusChart;
