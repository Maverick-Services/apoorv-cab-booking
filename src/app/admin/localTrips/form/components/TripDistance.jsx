import React from 'react'
import { useLocalTripFromForm } from '../context/localTripContext'
import { Skeleton } from '@/components/ui/skeleton';

function TripDistance({ updateLocalTripId }) {

    const { isLoading, handleData, data } = useLocalTripFromForm();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor='name' className="text-sm font-medium">Trip Distance (Kms)</label>
            {isLoading
                ? <Skeleton className="h-10 w-full" />
                : <input
                    type="number"
                    id="tripDistance"
                    placeholder='eg. 8 / 10'
                    onChange={(e) => handleData('tripDistance', e.target.value)}
                    value={updateLocalTripId ? data.tripDistance : ""}
                    className="border p-2 rounded-md"
                />
            }
        </div>
    )
}

export default TripDistance
