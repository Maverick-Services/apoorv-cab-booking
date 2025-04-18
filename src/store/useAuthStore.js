import { create } from "zustand";
import { auth } from "@/lib/firebase/firebase-client";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const useAuthStore = create((set) => ({
    user: null,
    userData: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),

    initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    set({
                        user,
                        userData: docSnap.data(),
                        isLoading: false,
                    });
                }
            } else {
                set({ user: null, userData: null, isLoading: false });
            }
        });
        return unsubscribe;
    },

    handleSignInWithEmail: async (email, password) => {
        set({ isLoading: true });
        try {
            await signInWithEmailAndPassword(auth, email, password);
            set({ error: null });
        } catch (error) {
            set({ error: "Invalid email or password" });
            console.log(error.message);
        }
        set({ isLoading: false });
    },

    handleLogout: async () => {
        set({ isLoading: true });
        try {
            await signOut(auth);
            set({ user: null, userData: null });
        } catch (error) {
            set({ error: error.message });
        }
        set({ isLoading: false });
    }
}));

export default useAuthStore;
