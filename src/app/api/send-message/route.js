import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {

        const { name, bookingId, tripType, pickupCity, bookingUrl } = await req.json();

        const response = await axios.post('https://backend.aisensy.com/campaign/api/v1', {
            campaignName: "New Trip Notification  - Vendor", // Can be any name
            destination: "918700381153", // e.g. "91XXXXXXXXXX"
            userName: "orders.tapscabs@gmail.com", // from AiSensy
            template_name: "booking_assigned_to_vendor", // your template name
            template_data: [name, bookingId, tripType, pickupCity, bookingUrl],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
            },
        });

        if (!response)
            return NextResponse.json({
                success: false,
                message: 'Failed to Send notification',
                error: error.message,
            }, { status: 404 });

        return NextResponse.json({
            success: true,
            message: 'Vendor Notification sent Successfully',
            data: { data: response },
        }, { status: 201 });

    } catch (error) {
        console.error('Error Sending Vendor notification:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to sned vendor notification',
            error: error.message,
        }, { status: 500 });
    }
}

// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//     try {

//         const { name, bookingId, tripType, pickupCity, bookingUrl } = await req.json();

//         const response = await axios.post('https://backend.aisensy.com/campaign/t1/api/v2', {
//             apiKey: process.env.WHATSAPP_API_KEY,
//             campaignName: "New Trip Notification  - Vendor", // Can be any name
//             destination: "918700381153", // e.g. "91XXXXXXXXXX"
//             userName: "orders.tapscabs@gmail.com", // from AiSensy
//             template_name: "booking_assigned_to_vendor", // your template name
//             templateParams: [name, bookingId, tripType, pickupCity, bookingUrl],
//         });

//         if (!response)
//             return NextResponse.json({
//                 success: false,
//                 message: 'Failed to Send notification',
//                 error: error.message,
//             }, { status: 404 });

//         return NextResponse.json({
//             success: true,
//             message: 'Vendor Notification sent Successfully',
//             data: { data: response },
//         }, { status: 201 });

//     } catch (error) {
//         console.error('Error Sending Vendor notification:', error);
//         return NextResponse.json({
//             success: false,
//             message: 'Failed to sned vendor notification',
//             error: error.message,
//         }, { status: 500 });
//     }
// }

