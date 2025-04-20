"use client"

import React from 'react'
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { addPickupCity } from '@/lib/firebase/admin/pickupCity';

function PickupCityForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = async (data) => {
        console.log('Pickup City Data:', data);
        const result = await addPickupCity(data)
        console.log(result)
        setValue("pickupCity", '')
        setValue("price", '')
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-xl"
            >
                {/* Pickup City */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Pickup City
                    </label>
                    <input
                        type="text"
                        id="pickupCity"
                        {...register('pickupCity', { required: 'Pickup City is required' })}
                        className="border p-2 rounded-md"
                    />
                    {errors.pickupCity && (
                        <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>
                    )}
                </div>

                {/* Price Per Kilometer */}
                <div className="flex flex-col">
                    <label htmlFor="pricePerKm" className="text-sm font-medium mb-1">
                        Price Per Kilometer
                    </label>
                    <input
                        type="text"
                        id="pricePerKm"
                        {...register('price', { required: 'Price Per Kilometer is required' })}
                        className="border p-2 rounded-md"
                    />
                    {errors.price && (
                        <span className="text-red-500 text-xs">{errors.price.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-primary flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer transition"
                >
                    <PlusCircle size={20} /> Add City
                </button>
            </form>
        </div>
    )
}

export default PickupCityForm
