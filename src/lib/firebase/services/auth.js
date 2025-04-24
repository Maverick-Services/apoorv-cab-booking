import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-client";
import { doc, setDoc } from "firebase/firestore";

// Utility functions for validations
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phoneNo) => /^[0-9]{10,15}$/.test(phoneNo); // accepts 10 to 15 digit numbers
const isStrongPassword = (password) => password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);

export const signup = async (name, email, phoneNo, password, role) => {

    try {
        // Validation checks
        if (!name || !email || !phoneNo || !password || !role) {
            throw new Error("All fields are required.");
        }

        if (!isValidEmail(email)) {
            throw new Error("Invalid email format.");
        }

        if (!isValidPhone(phoneNo)) {
            throw new Error("Invalid phone number. Must be 10 to 15 digits.");
        }

        if (!isStrongPassword(password)) {
            throw new Error("Password must be at least 8 characters long and include both letters and numbers.");
        }

        const allowedRoles = ["user", "admin", "vendor"];
        if (!allowedRoles.includes(role.toLowerCase())) {
            throw new Error(`Invalid role. Allowed roles: ${allowedRoles.join(", ")}`);
        }

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info to Firestore
        if (user) {
            await setDoc(doc(db, "Users", user.uid), {
                name,
                email: user.email,
                phoneNo,
                role: role.toLowerCase(),
            });
        }

        return user;

    } catch (err) {
        console.error("Signup error:", err.message || err);
        throw new Error(err.message || "Signup failed. Please try again.");
    }
};




// ---> Create vendor by firebase admin can only be used in nextjs backend api folder
// import admin from "../firebase-admin";
// export const signup = async () => {
//     try {
//         const userRecord = await admin.auth().createUser({
//             email,
//             password,
//         });

//         console.log("created user", userRecord);

//         // Assign custom claims (optional but useful)
//         const updatedUserRecord = await admin.auth().setCustomUserClaims(userRecord.uid, { role });
//         console.log("updated user", updatedUserRecord);

//         // Store in Firestore
//         const db = admin.firestore();
//         await db.collection('users').doc(userRecord.uid).set({
//             email,
//             role,
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         });

//         // return res.status(200).json({ message: 'User created successfully', uid: userRecord.uid });
//     } catch (error) {
//         console.log("Error", error)
//         // return res.status(400).json({ message: 'Error creating user', error: error.message });
//     }
// }