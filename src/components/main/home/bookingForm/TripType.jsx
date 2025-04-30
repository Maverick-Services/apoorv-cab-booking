import { TRIP_TYPES } from '@/lib/constants/constants'
import React from 'react'

function TripType({ tripType, setValue }) {
    return (
        <div className="flex gap-2 mb-6 items-center justify-center">
            {Object.values(TRIP_TYPES).map(type => (
                <button
                    key={type}
                    type="button"
                    onClick={() => setValue('tripType', type)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-[12px] sm:text-sm font-semibold transition-all ${tripType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    {type}
                </button>
            ))}
        </div>
    )
}

export default TripType
