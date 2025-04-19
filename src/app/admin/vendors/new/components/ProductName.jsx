import React from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function ProductName() {

    // const { data, handleData } = useProductForm();

    return (
        <div className='flex flex-col gap-4'>
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Personal Details */}
            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Email  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Delhi, Noida"
                        // value={data?.name ?? ""}
                        value={""}
                        // onChange={(e) => handleData('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>

                {/* Phone No  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone No <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="e.g., Delhi, Noida"
                        // value={data?.name ?? ""}
                        value={""}
                        // onChange={(e) => handleData('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                        required
                    />
                </div>
            </div>

            {/* Location */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="eg, Rohini, Delhi"
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
