import React from 'react'
import PageHeader from './PageHeader'

function InnerLayout({ children, heading }) {
    return (
        <div className='flex flex-col h-screen p-4 bg-gray-100'>
            <div className=''>
                <PageHeader heading={heading} />
            </div>
            <div className='flex-1 overflow-y-auto mt-4 pr-2 scroll-smooth'>
                {children}
            </div>
        </div>
    )
}

export default InnerLayout
