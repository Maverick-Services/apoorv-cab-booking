import React from 'react'

export const metadata = {
    title: "User Panel",
    description: "Apoorv Cab Booking User Panel.",
};

function UserLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default UserLayout
