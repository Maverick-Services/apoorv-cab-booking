import React from 'react'

export const metadata = {
    title: "Admin Panel",
    description: "Apoorv Cab Booking Admin Panel.",
};

function AdminLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default AdminLayout
