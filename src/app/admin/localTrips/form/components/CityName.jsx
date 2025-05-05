"use client"

import React, { useEffect, useState } from 'react'
import { useLocalTripFromForm } from '../context/localTripContext'
import { Skeleton } from '@/components/ui/skeleton';
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity';

function CityName({ updateLocalTripId }) {
    const { isLoading, handleData, data, selectedCity, setSelectedCity } = useLocalTripFromForm();

    const [loading, setLoading] = useState(true)
    const [citiesList, setCitiesList] = useState([])

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

    // Fetch cities on mount
    useEffect(() => {
        fetchCities()
    }, [])

    // Set default city if updateLocalTripId is present
    useEffect(() => {
        if (!loading && updateLocalTripId && data?.cityName && citiesList.length > 0) {
            const matchedCity = citiesList.find(city => city.name === data.cityName)
            if (matchedCity) {
                setSelectedCity(matchedCity)
            }
        }
    }, [loading, updateLocalTripId, data?.cityName, citiesList])

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">City Name</label>
            {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
            ) : (
                <select
                    value={selectedCity?.name || ''}
                    onChange={(e) => {
                        handleData('cityName', e.target.value)
                        setSelectedCity(citiesList?.find(i => i.name === e.target.value))
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
