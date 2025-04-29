import React from 'react'

function TripType({ tripType, setValue }) {
    return (
        <div className="flex gap-2 mb-4">
            {['One Way', 'Round Trip', 'Local', 'Airport'].map(type => (
                <button
                    key={type}
                    type="button"
                    onClick={() => setValue('tripType', type)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${tripType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    {type}
                </button>
            ))}
        </div>
    )
}

export default TripType
