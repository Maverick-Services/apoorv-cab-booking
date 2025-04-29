import { CalendarDays } from 'lucide-react'
import React from 'react'

function ReturnDate({ tripType, register }) {
    return (
        <div>
            {tripType === 'Round Trip' && (
                <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <CalendarDays size={16} className="text-primary" />
                        Return Date
                    </label>
                    <input
                        type="date"
                        {...register('returnDate', { required: true })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                </div>
            )}
        </div>
    )
}

export default ReturnDate
