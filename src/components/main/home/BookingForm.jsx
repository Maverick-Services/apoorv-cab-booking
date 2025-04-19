'use client';

import { useForm } from 'react-hook-form';
import InnerLayout from '@/components/dashboard/layout/InnerLayout';
import { cities } from '@/lib/constants/constants';

export default function BookingForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const tripType = watch('tripType');

    const onSubmit = (data) => {
        console.log('Booking Data:', data);
    };

    return (
        <section>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 shadow-md space-y-6 border-4 border-primary w-full"
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
                    {errors.tripType && (
                        <span className="text-red-500 text-xs">{errors.tripType.message}</span>
                    )}
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
                    {errors.pickupCity && (
                        <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>
                    )}
                </div>

                {/* Show only when NOT Local Trip */}
                {tripType !== 'Local Trip' && (
                    <>
                        {/* Drop City */}
                        <div className="flex flex-col">
                            <label htmlFor="dropCity" className="text-sm font-medium mb-1">
                                Drop City
                            </label>
                            <select
                                id="dropCity"
                                {...register('dropCity', { required: 'Drop City is required' })}
                                className="border p-2 rounded-md"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            {errors.dropCity && (
                                <span className="text-red-500 text-xs">{errors.dropCity.message}</span>
                            )}
                        </div>
                    </>
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
                    {errors.pickupTime && (
                        <span className="text-red-500 text-xs">{errors.pickupTime.message}</span>
                    )}
                </div>

                {/* Return Date - Only for Round Trip */}
                {tripType === 'Round Trip' && (
                    <div className="flex flex-col">
                        <label htmlFor="returnDate" className="text-sm font-medium mb-1">
                            Return Date
                        </label>
                        <input
                            type="date"
                            id="returnDate"
                            {...register('returnDate', {
                                required: 'Return Date is required',
                            })}
                            className="border p-2 rounded-md"
                        />
                        {errors.returnDate && (
                            <span className="text-red-500 text-xs">{errors.returnDate.message}</span>
                        )}
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
                    {errors.mobileNumber && (
                        <span className="text-red-500 text-xs">{errors.mobileNumber.message}</span>
                    )}
                </div>

                {/* Submit Button */}
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
