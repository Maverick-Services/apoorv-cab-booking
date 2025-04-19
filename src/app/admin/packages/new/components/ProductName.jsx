import React from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function ProductName() {

    // const { data, handleData } = useProductForm();

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="e.g., Classic, Premium"
                    // value={data?.name ?? ""}
                    value={""}
                    // onChange={(e) => handleData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-secondary outline-none transition-all"
                    required
                />
            </div>

            {/* Location Details */}
            <div className='flex gap-4 flex-col sm:flex-row'>
                {/* Pickup City  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup City <span className="text-red-500">*</span>
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

                {/* Drop Off City  */}
                <div className='grow'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Drop City <span className="text-red-500">*</span>
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
            </div>
        </div>
    )
}

export default ProductName
