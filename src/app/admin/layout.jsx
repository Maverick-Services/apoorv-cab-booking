import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import { adminSidebarLinks } from '@/lib/constants/sidebarLinks';
import React from 'react'

export const metadata = {
    title: "Admin Panel",
    description: "Apoorv Cab Booking Admin Panel.",
};

function AdminLayout({ children }) {
    return (
        <div>
            <LayoutProvider sidebarLinks={adminSidebarLinks}>
                {children}
            </LayoutProvider>
        </div>
    )
}

export default AdminLayout
