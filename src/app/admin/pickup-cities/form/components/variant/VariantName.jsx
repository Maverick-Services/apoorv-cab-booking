"use client"

import React, { useEffect, useState } from 'react'
import { usePickupCityForm } from '../../context/PickupCityContext'
import { getAllCabTypes } from '@/lib/firebase/admin/cabType'
import { Skeleton } from "@/components/ui/skeleton"

function VariantName() {
    const [cabTypes, setCabTypes] = useState([])
    const [loading, setLoading] = useState(true)

    const { handleVariant, variant } = usePickupCityForm()

    useEffect(() => {
        async function fetchCabTypes() {
            try {
                const res = await getAllCabTypes()
                setCabTypes(res)
            } catch (error) {
                console.error('Error fetching cab types:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCabTypes()
    }, [])

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Variant Name</label>

            {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
            ) : (
                <select
                    value={variant.name}
                    onChange={(e) => handleVariant('name', e.target.value)}
                    className="input-field h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select a variant</option>
                    {cabTypes.map((cab) => (
                        <option key={cab.id} value={cab.name}>
                            {cab.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default VariantName
