"use client";

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
        setValue,
        getValues,
        formState: { errors },
        watch,
    } = useForm();

    const tripType = watch('tripType');
    const pickupCity = watch('pickupCity');

    const getCoordinates = async (address) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
        const response = await fetch(url, {
            headers: { 'User-Agent': 'YourAppName/1.0 (you@email.com)' },
        });
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lng: parseFloat(lon) };
        }
        throw new Error('Location not found');
    };

    const onSubmit = async (data) => {
        try {
            const coordList = [];
            const pickupCoords = await getCoordinates(data.pickupCity);
            coordList.push(point([pickupCoords.lng, pickupCoords.lat]));

            if (tripType !== 'Local Trip') {
                if (dropOffs.length) {
                    for (let city of dropOffs) {
                        const coords = await getCoordinates(city);
                        coordList.push(point([coords.lng, coords.lat]));
                    }
                } else if (data.dropCity) {
                    const dropCoords = await getCoordinates(data.dropCity);
                    coordList.push(point([dropCoords.lng, dropCoords.lat]));
                }
            }

            if (data.tripType === 'Round Trip') {
                coordList.push(point([pickupCoords.lng, pickupCoords.lat]));
            }

            let totalDistance = 0;
            for (let i = 0; i < coordList.length - 1; i++) {
                totalDistance += distance(coordList[i], coordList[i + 1], { units: 'kilometers' });
            }

            const bookingData = {
                ...data,
                coordinates: coordList,
                totalDistance,
            };
            if (dropOffs.length) bookingData.dropOffs = dropOffs;

            if (!tripData) {
                router.push(`/Trip?tripData=${encodeURIComponent(JSON.stringify(bookingData))}`);
            }
        } catch (err) {
            console.error('Coordinate fetch error:', err);
        }
    };

    return (
        <section
            className="w-full flex justify-center py-6 bg-primary/20 rounded-3xl"
            style={{ boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)' }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white text-black p-6 space-y-6 w-[85%] max-w-lg rounded-2xl"
            >
                {/* Trip Type Tabs */}
                <div className="flex gap-2">
                    {['One Way', 'Round Trip', 'Local Trip'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setValue('tripType', type)}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border 
                                ${tripType === type ? 'bg-primary text-white border-primary' : 'bg-white text-black border-gray-300'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                {errors.tripType && <span className="text-red-500 text-xs">{errors.tripType.message}</span>}

                {/* Pickup City */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Pickup City</label>
                    <select
                        {...register('pickupCity', { required: 'Pickup City is required' })}
                        className="border p-2 rounded-md"
                    >
                        <option value="" className="text-gray-500">Select City</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.pickupCity && <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>}
                </div>

                {/* Drop City */}
                {tripType !== 'Local Trip' && (
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Drop City</label>

                        {tripType === 'Round Trip' && dropOffs.length > 0 && (
                            <div className='flex gap-2 mb-2 flex-wrap text-xs'>
                                <span className='flex items-center gap-2'>{pickupCity} <ArrowRightCircle /></span>
                                {dropOffs.map((dr, idx) => (
                                    <span key={idx} className='flex items-center gap-2'>{dr} <ArrowRightCircle /></span>
                                ))}
                                <span className='flex items-center gap-2'>{pickupCity} <ArrowRightCircle /></span>
                            </div>
                        )}

                        {tripType === 'Round Trip' && (
                            <p className='text-xs text-red-500'>Select City & 'Press Enter' to add Multiple Drops</p>
                        )}

                        <select
                            disabled={!pickupCity}
                            {...register('dropCity', { required: 'Drop City is required' })}
                            onKeyDown={tripType === 'Round Trip' ? (e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = getValues('dropCity');
                                    if (val && !dropOffs.includes(val)) setDropOffs(prev => ([...prev, val]));
                                }
                            } : undefined}
                            className="border p-2 rounded-md"
                        >
                            <option value="" className="text-gray-500">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {errors.dropCity && <span className="text-red-500 text-xs">{errors.dropCity.message}</span>}
                    </div>
                )}

                {/* Pickup Time */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Pickup Date & Time</label>
                    <input
                        type="datetime-local"
                        {...register('pickupTime', { required: 'Pickup Time is required' })}
                        className="border p-2 rounded-md"
                    />
                    {errors.pickupTime && <span className="text-red-500 text-xs">{errors.pickupTime.message}</span>}
                </div>

                {/* Return Date */}
                {tripType === 'Round Trip' && (
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Return Date</label>
                        <input
                            type="date"
                            {...register('returnDate', { required: 'Return Date is required' })}
                            className="border p-2 rounded-md"
                        />
                        {errors.returnDate && <span className="text-red-500 text-xs">{errors.returnDate.message}</span>}
                    </div>
                )}

                {/* Mobile Number */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Mobile Number</label>
                    <input
                        type="tel"
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

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
                >
                    Book Cab
                </button>
            </form>
        </section>
    );
}
