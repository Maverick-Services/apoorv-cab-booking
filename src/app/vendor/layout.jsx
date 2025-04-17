import LayoutProvider from '@/components/dashboard/layout/LayoutProvider';
import React from 'react'

export const metadata = {
    title: "Vendor Panel",
    description: "Apoorv Cab Booking Vendor Panel.",
};

function VendorLayout({ children }) {
    return (
        <div>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </div>
    )
}

export default VendorLayout
