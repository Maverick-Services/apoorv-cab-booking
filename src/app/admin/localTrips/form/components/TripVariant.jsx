"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import VariantCard from './VariantCard'
import CabType from './variant/CabType'
import { useLocalTripFromForm } from '../context/localTripContext'
import VariantPrice from './variant/VariantPrice'

function TripVariant() {

    const { variant, setVariant, variantList, setVariantList } = useLocalTripFromForm();
    console.log(variantList)
    function handleAddVariant() {
        // const requiredFields = [
        //     'cabType',
        //     'variantPrice',
        // ];

        // if (requiredFields.some(field => !variant[field])) {
        //     alert("Please fill all the fields before adding the variant.")
        //     return
        // }

        setVariantList(prev => [...prev, variant])
        setVariant({
            cabType: '',
            variantPrice: '',
        })
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
            <h2 className='text-2xl text-primary font-bold mb-3'>Add Cab Types</h2>

            <div className="space-y-4">
                {/* Variant Details Section */}
                <div className="border-b pb-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CabType />
                        <VariantPrice />
                    </div>
                </div>

                <Button
                    type="button"
                    className="w-full bg-primary text-white hover:opacity-90 transition-all p-6 text-lg -mt-4"
                    onClick={handleAddVariant}
                >
                    Add Cab Type
                </Button>
            </div>

            {/* Display added variants */}
            {variantList.length > 0 && (
                <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-semibold">Added Cab Variants</h3>
                    {variantList.map((v, idx) => (
                        <VariantCard key={idx} variant={v} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TripVariant
