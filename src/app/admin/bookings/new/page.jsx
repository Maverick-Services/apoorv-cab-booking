'use client';

import { useForm } from 'react-hook-form';
import InnerLayout from '@/components/dashboard/layout/InnerLayout';

export default function Page() {
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
        <InnerLayout heading="Add New Booking">
            <section>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-xl"
                >
                    {/* Pickup City */}
                    <div className="flex flex-col">
                        <label htmlFor="pickupCity" className="text-sm font-medium mb-1">
                            Pickup City
                        </label>
                        <input
                            type="text"
                            id="pickupCity"
                            {...register('pickupCity', { required: 'Pickup City is required' })}
                            placeholder="e.g. Delhi, Mumbai"
                            className="border p-2 rounded-md"
                        />
                        {errors.pickupCity && (
                            <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>
                        )}
                    </div>

                    {/* Drop City */}
                    <div className="flex flex-col">
                        <label htmlFor="dropCity" className="text-sm font-medium mb-1">
                            Drop City
                        </label>
                        <input
                            type="text"
                            id="dropCity"
                            {...register('dropCity', { required: 'Drop City is required' })}
                            placeholder="e.g. Jaipur, Pune"
                            className="border p-2 rounded-md"
                        />
                        {errors.dropCity && (
                            <span className="text-red-500 text-xs">{errors.dropCity.message}</span>
                        )}
                    </div>

                    {/* Pickup Time */}
                    <div className="flex flex-col">
                        <label htmlFor="pickupTime" className="text-sm font-medium mb-1">
                            Pickup Time
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
                        </select>
                        {errors.tripType && (
                            <span className="text-red-500 text-xs">{errors.tripType.message}</span>
                        )}
                    </div>

                    {/* Return Date - Conditionally visible */}
                    {tripType === 'Round Trip' && (
                        <div className="flex flex-col">
                            <label htmlFor="returnDate" className="text-sm font-medium mb-1">
                                Return Date
                            </label>
                            <input
                                type="date"
                                id="returnDate"
                                {...register('returnDate', {
                                    required: tripType === 'Round Trip' ? 'Return Date is required' : false,
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
        </InnerLayout>
    );
}
