'use client';

import { useForm } from 'react-hook-form';
import { cities } from '@/lib/constants/constants';
import { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { point, distance } from '@turf/turf';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function BookingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tripData = searchParams.get('tripData');

    const [dropOffs, setDropOffs] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const tripType = watch('tripType');
    const pickupCity = watch('pickupCity');

    const getCoordinates = async (address) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0 (your@email.com)',
            },
        });
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lng: parseFloat(lon) };
        } else {
            throw new Error('Location not found');
        }
    };

    const onSubmit = async (data) => {
        try {
            const coordList = [];

            // Pickup
            const pickupCoords = await getCoordinates(data.pickupCity);
            coordList.push(point([pickupCoords.lng, pickupCoords.lat]));

            // Drop-offs
            if (dropOffs?.length > 0) {
                for (let city of dropOffs) {
                    const coords = await getCoordinates(city);
                    coordList.push(point([coords.lng, coords.lat]));
                }
            } else if (data.dropCity) {
                const dropCoords = await getCoordinates(data.dropCity);
                coordList.push(point([dropCoords.lng, dropCoords.lat]));
            }


            // Return to pickup if round trip
            if (data.tripType === "Round Trip") {
                coordList.push(point([pickupCoords.lng, pickupCoords.lat]));
            }

            // Calculate distance
            let totalDistance = 0;
            for (let i = 0; i < coordList.length - 1; i++) {
                totalDistance += distance(coordList[i], coordList[i + 1], { units: 'kilometers' });
            }

            let bookingData = {
                ...data,
                coordinates: coordList,
                totalDistance,
            };

            if (dropOffs)
                bookingData.dropOffs = dropOffs;

            // console.log('Booking Data:', bookingData);

            // Uncomment to route
            if (!tripData) router.push(`/Trip?tripData=${JSON.stringify(bookingData)}`);
        } catch (err) {
            console.error("Coordinate fetch error:", err);
        }
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 shadow-md space-y-6 border-4 border-primary w-full rounded-b-xl"
            >
                {/* Trip Type */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Trip Type</label>
                    <select
                        {...register('tripType', { required: 'Trip type is required' })}
                        className="border p-2 rounded-md"
                    >
                        <option value="">Select Trip Type</option>
                        <option value="One Way">One Way</option>
                        <option value="Round Trip">Round Trip</option>
                        <option value="Local Trip">Local Trip</option>
                    </select>
                    {errors.tripType && <span className="text-red-500 text-xs">{errors.tripType.message}</span>}
                </div>

                {/* Pickup City */}
                <div className="flex flex-col">
                    <label htmlFor="pickupCity" className="text-sm font-medium mb-1">
                        Pickup City
                    </label>
                    <select
                        id="pickupCity"
                        {...register('pickupCity', { required: 'Pickup City is required' })}
                        className="border p-2 rounded-md"
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.pickupCity && <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>}
                </div>

                {/* Drop City (Only for non-local trips) */}
                {tripType !== 'Local Trip' && (
                    <div className="flex flex-col">
                        <label htmlFor="dropCity" className="text-sm font-medium mb-1">
                            Drop City
                        </label>

                        {tripType === 'Round Trip' && dropOffs.length > 0 && (
                            <div className='flex gap-2 mb-2 w-full flex-wrap'>
                                <span className='flex items-center gap-2 text-sm'>
                                    {pickupCity} <ArrowRightCircle />
                                </span>
                                {dropOffs.map((dr, idx) => (
                                    <span key={idx} className='flex items-center gap-2 text-sm'>
                                        {dr} <ArrowRightCircle />
                                    </span>
                                ))}
                                <span className='flex items-center gap-2 text-sm'>
                                    {pickupCity}
                                </span>
                            </div>
                        )}

                        {tripType === 'Round Trip' && (
                            <p className='text-sm text-red-500'>
                                Select City & 'Press Enter' to add Multiple Drops
                            </p>
                        )}

                        <select
                            id="dropCity"
                            disabled={!pickupCity}
                            onKeyDown={tripType === "Round Trip" ? (e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setDropOffs(prev => ([...prev, e.target.value]));
                                }
                            } : undefined}
                            {...register('dropCity', { required: 'Drop City is required' })}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {errors.dropCity && <span className="text-red-500 text-xs">{errors.dropCity.message}</span>}
                    </div>
                )}

                {/* Pickup Time */}
                <div className="flex flex-col">
                    <label htmlFor="pickupTime" className="text-sm font-medium mb-1">
                        Pickup Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="pickupTime"
                        {...register('pickupTime', { required: 'Pickup Time is required' })}
                        className="border p-2 rounded-md"
                    />
                    {errors.pickupTime && <span className="text-red-500 text-xs">{errors.pickupTime.message}</span>}
                </div>

                {/* Return Date */}
                {tripType === 'Round Trip' && (
                    <div className="flex flex-col">
                        <label htmlFor="returnDate" className="text-sm font-medium mb-1">
                            Return Date
                        </label>
                        <input
                            type="date"
                            id="returnDate"
                            {...register('returnDate', { required: 'Return Date is required' })}
                            className="border p-2 rounded-md"
                        />
                        {errors.returnDate && <span className="text-red-500 text-xs">{errors.returnDate.message}</span>}
                    </div>
                )}

                {/* Mobile Number */}
                <div className="flex flex-col">
                    <label htmlFor="mobileNumber" className="text-sm font-medium mb-1">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        {...register('mobileNumber', {
                            required: 'Mobile Number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit number',
                            },
                        })}
                        placeholder="Enter 10-digit mobile number"
                        className="border p-2 rounded-md"
                    />
                    {errors.mobileNumber && <span className="text-red-500 text-xs">{errors.mobileNumber.message}</span>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer transition"
                >
                    Book Cab
                </button>
            </form>
        </section>
    );
}
