import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import React from 'react'

export const metadata = {
    title: "Admin Panel",
    description: "Apoorv Cab Booking Admin Panel.",
};

function AdminLayout({ children }) {
    return (
        <div>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </div>
    )
}

export default AdminLayout
