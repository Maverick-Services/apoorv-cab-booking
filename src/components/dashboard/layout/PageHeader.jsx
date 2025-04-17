import React from 'react'

function PageHeader({ heading }) {
    return (
        <header className="bg-primary py-5 text-white text-center rounded-lg">
            <h1 className="sm:text-3xl text-xl font-bold">{heading}</h1>
        </header>
    )
}

export default PageHeader
