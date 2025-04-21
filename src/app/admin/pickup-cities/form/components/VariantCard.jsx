import React from 'react'

function VariantCard({ variant }) {
    return (
        <div className="border border-gray-300 rounded-md p-3 shadow-sm bg-white">
            <h4 className="font-semibold text-gray-800">{variant.name}</h4>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li><strong>Min KM:</strong> {variant.minKilometers}</li>
                <li><strong>Actual Price:</strong> ₹{variant.actualPrice} / km</li>
                <li><strong>Discounted Price:</strong> ₹{variant.discountedPrice} / km</li>
                <li><strong>Driver Allowance:</strong> ₹{variant.driverAllowance} / day</li>
            </ul>
        </div>
    )
}

export default VariantCard
