import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-client";
import { doc, setDoc } from "firebase/firestore";

export const signup = async (name, email, phoneNo, password, role) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        // Set Initial User Data
        if (user) {
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                name,
                phoneNo,
                role,
            });
        }

        return user;

    } catch (err) {
        console.log(err);
        return null;
    }
}


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