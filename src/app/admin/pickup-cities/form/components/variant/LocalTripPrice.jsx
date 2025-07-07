import React from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'

function LocalTripPrice() {
    const { handleVariant, variant, setVariant, } = usePickupCityForm()

    return (
        <div className="border-b pb-8">
            <h3 className="text-lg font-semibold mb-4">Local Trip Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Extra Km Price/Km</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.extraKilometersLocal || 0}
                        onChange={(e) => handleVariant('extraKilometersLocal', e.target.value)}
                        placeholder="Eg. 10"
                        className="input-field"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Extra Hour Price/Hour</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.extraHoursLocal || 0}
                        onChange={(e) => handleVariant('extraHoursLocal', e.target.value)}
                        placeholder="Eg. 10"
                        className="input-field"
                    />
                </div>
            </div>
        </div>
    )
}

export default LocalTripPrice