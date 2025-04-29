"use client"
import { MapPin } from 'lucide-react'
import React, { useEffect } from 'react'

function Pickup({ register, pickupCities, setPickupCities }) {

    useEffect(() => {
        const fetchPickupCities = async () => {
            setLoading(true);
            try {
                const res = await getAllPickupCities();
                setPickupCities(res || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false); ``
        };
        fetchPickupCities();
    }, []);

    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <MapPin size={16} className="text-primary" />
                Pickup Location
            </label>
            <select
                {...register(
                    'pickupCity',
                    { required: true }
                )}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
            >
                <option value="">Select City</option>
                {pickupCities.map(city => (
                    <option key={city?.id} value={city?.name}>{city?.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Pickup
