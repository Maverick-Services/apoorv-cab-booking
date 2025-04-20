"use client"
import React from 'react'
import CabTypeFormContextProvider from './context/CabTypeContext'

function layout({ children }) {
    return (
        <div>
            <CabTypeFormContextProvider>
                {children}
            </CabTypeFormContextProvider>
        </div>
    )
}

export default layout
