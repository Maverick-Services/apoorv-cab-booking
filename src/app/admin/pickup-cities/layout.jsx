import React from 'react'
// import PickupFormContextProvider from './context/pickupFormContext'

function layout({ children }) {
    return (
        <div>

            {/* <PickupFormContextProvider> */}
            {children}
            {/* </PickupFormContextProvider> */}
        </div>
    )
}

export default layout
