// app/api/verify-payment/route.js
import { createNewBooking } from '@/lib/firebase/admin/booking';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            bookingData,
            isFullPayment
        } = await request.json();

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
        }

        // Persist booking
        const bookingId = await createNewBooking({
            ...bookingData,
            payment: {
                paymentId: razorpay_payment_id,
                amount: isFullPayment ? bookingData.totalAmount : bookingData.bookingAmount,
                status: 'completed',
                isFullPayment,
                timestamp: new Date().toISOString(),
            },
            status: {
                trip: 'not started',
                booking: 'accepted',
                vendor: 'not assigned',
                driver: 'not assigned',
            },
        });

        return NextResponse.json({ success: true, bookingId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
