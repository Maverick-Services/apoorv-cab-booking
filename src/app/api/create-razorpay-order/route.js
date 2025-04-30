// app/api/create-razorpay-order/route.js
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        console.error('❌ could not parse JSON body:', e);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    console.log('📦 create-razorpay-order got:', body);

    try {
        const { amount } = body;
        if (typeof amount !== 'number') {
            throw new Error('`amount` must be a number');
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        console.log('👷 creating order with options:', options);
        const order = await razorpay.orders.create(options);
        console.log('✅ razorpay.orders.create result:', order);

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error('❌ create-razorpay-order error:', error);
        // If error.error exists, log that too:
        if (error.error) console.error('   → Razorpay server said:', error.error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
