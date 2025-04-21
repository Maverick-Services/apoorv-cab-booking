"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import VariantCard from './VariantCard'

function CabVariant() {
    const [variant, setVariant] = useState({
        name: '',
        minKilometers: '',
        actualPrice: '',
        discountedPrice: '',
        driverAllowance: '',
    })

    const [variantList, setVariantList] = useState([])

    function handleVariant(key, value) {
        setVariant(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function handleAddVariant() {
        // Basic validation
        if (
            !variant.name ||
            !variant.minKilometers ||
            !variant.actualPrice ||
            !variant.discountedPrice ||
            !variant.driverAllowance
        ) {
            alert("Please fill all the fields before adding the variant.")
            return
        }

        // Add to list
        setVariantList(prev => [...prev, variant])

        // Reset current variant
        setVariant({
            name: '',
            minKilometers: '',
            actualPrice: '',
            discountedPrice: '',
            driverAllowance: '',
        })
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
            <h2 className='text-2xl text-primary font-bold mb-4'>Add Cab Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Variant Name</label>
                    <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => handleVariant('name', e.target.value)}
                        placeholder="Eg. Regular / Premium"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Minimum Kilometers</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.minKilometers}
                        onChange={(e) => handleVariant('minKilometers', e.target.value)}
                        placeholder="Eg. 120"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Price Per Kilometer (Actual)</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.actualPrice}
                        onChange={(e) => handleVariant('actualPrice', e.target.value)}
                        placeholder="Eg. 10"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Price Per Kilometer (Discounted)</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.discountedPrice}
                        onChange={(e) => handleVariant('discountedPrice', e.target.value)}
                        placeholder="Eg. 8"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Driver Allowance (Per Day)</label>
                    <input
                        type="number"
                        min={0}
                        value={variant.driverAllowance}
                        onChange={(e) => handleVariant('driverAllowance', e.target.value)}
                        placeholder="Eg. 500"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

                <Button
                    type="button"
                    className="w-full mt-2 bg-primary text-white hover:opacity-90 transition-all"
                    onClick={handleAddVariant}
                >
                    Add Cab Type
                </Button>
            </div>

            {/* Display added variants */}
            {variantList.length > 0 && (
                <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Variant Details</h3>
                    {variantList.map((v, idx) => (
                        <VariantCard key={idx} variant={v} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CabVariant
