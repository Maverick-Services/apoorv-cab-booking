import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase/firebase-admin';

const db = admin.firestore();

export async function POST(req) {
    try {
        const { email, password, displayName } = await req.json();

        if (!email || !password || !displayName) {
            // return res.status(400).json({ message: 'Missing required fields' });
            return NextResponse.json({
                success: false,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        // Create a new user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            role: 'admin'
        });

        // Set custom claims to make the user an admin
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

        // Store admin details in Firestore
        await db.collection('user').doc(userRecord.uid).set({
            email,
            displayName,
            role: 'admin',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            message: 'Admin created successfully',
            uid: userRecord.uid,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create admin',
            error: error.message,
        }, { status: 500 });
    }
}
