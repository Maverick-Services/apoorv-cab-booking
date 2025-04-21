import { cities } from '@/lib/constants/constants'
import React from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function ProductName() {

    // const { data, handleData } = useProductForm();

    return (
        <div className='flex flex-col gap-4'>
            {/* Pickup City */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">City</label>
                <select
                    // {...register('city', { required: 'City is required' })}
                    className="border p-2 rounded-md"
                >
                    <option value="" className="text-gray-500">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                {/* {errors.pickupCity && <span className="text-red-500 text-xs">{errors.pickupCity.message}</span>} */}
            </div>

            {/* Cab Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cab Type <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Cab Type"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Total Hours */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Included <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter total hours included"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Total Kms */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kolometers Included <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter total kms included"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Base Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prie <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter Price"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>
        </div>
    )
}

export default ProductName
