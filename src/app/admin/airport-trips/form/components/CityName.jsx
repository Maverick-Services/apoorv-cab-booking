"use client"

import React, { useEffect, useState } from 'react'
import { useAirportTripForm } from '../context/airportTripContext'
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';

function CityName() {
    const { isLoading, handleData, data, selectedCity, setSelectedCity } = useAirportTripForm();

    const [loading, setLoading] = useState(true)
    const [citiesList, setCitiesList] = useState()

    async function fetchCities() {
        try {
            const res = await getAllPickupCities()
            setCitiesList(res)
        } catch (error) {
            console.error('Error fetching Pickup Cities:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">City Name</label>
            {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
            ) : (
                <select
                    value={selectedCity?.name}
                    onChange={(e) => {
                        handleData('cityName', e.target.value)
                        setSelectedCity(citiesList?.filter(i => i.name === e.target.value)[0])
                    }}
                    className="input-field h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select City Name</option>
                    {citiesList.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default CityName
