import { CalendarDays } from 'lucide-react'
import React from 'react'

function PickupDate({ register }) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                <CalendarDays size={16} className="text-primary" />
                Pickup Date & Time
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
                {/* Date Input */}
                <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                        Pickup Date
                    </label>
                    <input
                        type="date"
                        {...register('pickupDate', { required: true })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                </div>

                {/* Time Input */}
                <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                        Pickup Time
                    </label>
                    <input
                        type="time"
                        {...register('pickupTime', { required: true })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                </div>
            </div>
        </div>
    )
}

export default PickupDate
