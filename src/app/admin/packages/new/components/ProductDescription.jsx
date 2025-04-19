import React from 'react'
// import { useProductForm } from '../contexts/ProductFormContext';

function ProductDescription() {
    // const { data, handleData } = useProductForm();

    return (
        <div className='flex items-center gap-2'>
            <input
                type="checkbox"
                // value={data?.name ?? ""}
                value={false}
                // onChange={(e) => handleData('name', e.target.value)}
                className="border-8 border-gray-600 rounded-lg"
                required
            />

            <label className="text-base font-bold text-gray-600">
                Include Toll Tax
            </label>

        </div>
    )
}

export default ProductDescription
