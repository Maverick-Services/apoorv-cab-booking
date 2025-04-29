import React from 'react'
import { useAirportTripForm } from '../../context/airportTripContext'

function VariantPrice() {

    const { handleVariant, variant, setVariant, } = useAirportTripForm()

    return (
        <div className="max-w-xs">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Trip Actual Price</label>
                <input
                    type="number"
                    min={0}
                    value={variant.driverAllowance}
                    onChange={(e) => handleVariant('variantAcutalPrice', e.target.value)}
                    placeholder="Eg. 500"
                    className="input-field"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Trip Discounted Price</label>
                <input
                    type="number"
                    min={0}
                    value={variant.driverAllowance}
                    onChange={(e) => handleVariant('variantDiscountedPrice', e.target.value)}
                    placeholder="Eg. 500"
                    className="input-field"
                />
            </div>
        </div>
    )
}

export default VariantPrice
