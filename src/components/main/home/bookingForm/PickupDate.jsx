import { CalendarDays } from 'lucide-react'
import React from 'react'

function PickupDate({ register }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <CalendarDays size={16} className="text-primary" />
                Pickup Date & Time
            </label>
            <input
                type="datetime-local"
                {...register('pickupTime', { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
        </div>
    )
}

export default PickupDate
