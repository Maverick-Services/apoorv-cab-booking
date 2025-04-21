"use client";

import { useForm } from 'react-hook-form';
import { cities } from '@/lib/constants/constants';
import { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { point, distance } from '@turf/turf';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CalendarDays, MapPin, Phone, Clock } from 'lucide-react';

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
        <div className="w-full max-w-7xl mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-6 shadow-2xl shadow-primary/20 border border-gray-100"
            >
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end">
                    {/* Trip Type Selector */}
                    <div className="flex gap-2 mb-4">
                        {['One Way', 'Round Trip', 'Local Trip'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setValue('tripType', type)}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${tripType === type
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className='flex flex-col gap-3'>
                        {/* Pickup City */}
                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <MapPin size={16} className="text-primary" />
                                Pickup Location
                            </label>
                            <div className="relative">
                                <select
                                    {...register('pickupCity', { required: true })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        {/* Drop City */}
                        {tripType !== 'Local Trip' && (
                            <div className="md:col-span-3 relative">
                                <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <MapPin size={16} className="text-primary" />
                                    {tripType === 'Round Trip' ? 'Via Cities' : 'Drop Location'}
                                </label>
                                <div className="relative">
                                    <select
                                        disabled={!pickupCity}
                                        {...register('dropCity', { required: true })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <ArrowRight size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                </div>
                            </div>
                        )}

                        {/* Date/Time Pickers */}
                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <CalendarDays size={16} className="text-primary" />
                                Pickup Date
                            </label>
                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    {...register('pickupTime', { required: true })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                                />
                                <Clock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        {tripType === 'Round Trip' && (
                            <div className="md:col-span-2 relative">
                                <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <CalendarDays size={16} className="text-primary" />
                                    Return Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        {...register('returnDate', { required: true })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Mobile Number */}
                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Phone size={16} className="text-primary" />
                                Mobile Number
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    {...register('mobileNumber', {
                                        required: true,
                                        pattern: /^[0-9]{10}$/
                                    })}
                                    placeholder="10-digit number"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                                />
                                <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="">
                            <button
                                type="submit"
                                className="w-full h-[52px] bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                Search Cabs
                                <ArrowRightCircle size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Error Messages */}
                <div className="mt-4 space-y-1">
                    {Object.keys(errors).map((error) => (
                        <p key={error} className="text-red-500 text-sm">
                            {errors[error].message}
                        </p>
                    ))}
                </div>
            </form>
        </div>
    );
}
