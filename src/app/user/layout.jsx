
import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import React from 'react'

export const metadata = {
    title: "User Panel",
    description: "Apoorv Cab Booking User Panel.",
};

function UserLayout({ children }) {
    return (
        <div>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </div>
    )
}

export default UserLayout
