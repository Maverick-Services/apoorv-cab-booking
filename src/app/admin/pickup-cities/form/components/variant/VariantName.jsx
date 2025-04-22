import React from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'

function VariantName() {
    const { handleVariant, variant, setVariant, } = usePickupCityForm()

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Variant Name</label>
            <input
                type="text"
                value={variant.name}
                onChange={(e) => handleVariant('name', e.target.value)}
                placeholder="Eg. Hatchback / Sedan"
                className="input-field"
            />
        </div>
    )
}

export default VariantName
