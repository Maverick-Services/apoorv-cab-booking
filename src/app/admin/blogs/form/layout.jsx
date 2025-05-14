import React from 'react'
import FormContextProvider from './context/FormContext'

function layout({ children }) {
    return (
        <FormContextProvider>
            {children}
        </FormContextProvider>
    )
}

export default layout
