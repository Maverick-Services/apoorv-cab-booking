import { create } from "zustand";
import { auth, db } from "@/lib/firebase/firebase-client";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signup as firebaseSignup } from "@/lib/firebase/services/auth";

const useAuthStore = create((set, get) => ({
    user: null,
    userData: null,
    isLoading: false,
    error: null,

    initAuth: () => {
        set({ isLoading: true });
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const snap = await getDoc(doc(db, "Users", user.uid));
                set({
                    user,
                    userData: snap.exists() ? snap.data() : null,
                    isLoading: false,
                    error: null,
                });
            } else {
                set({ user: null, userData: null, isLoading: false });
            }
        });
        return unsubscribe;
    },

    // Sign-in existing user
    handleSignInWithEmail: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            set({ error: "Invalid email or password" });
            return
        } finally {
            set({ isLoading: false });
        }
    },

    // Create a new user (wraps your signup util)
    handleSignup: async (name, email, phoneNo, password, role) => {
        set({ isLoading: true, error: null });
        try {
            const user = await firebaseSignup(name, email, phoneNo, password, role);
            set({ user });
        } catch (err) {
            set({ error: err.message || "Signup failed" });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    // Log out
    handleLogout: async () => {
        set({ isLoading: true, error: null });
        try {
            await signOut(auth);
            set({ user: null, userData: null });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useAuthStore;
