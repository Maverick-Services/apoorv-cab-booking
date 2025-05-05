import { Pencil, Trash } from 'lucide-react'
import React from 'react'

function VariantCard({ variant, onEdit, onDelete }) {
    return (
        <div className="group relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {variant.cabType}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                            <p className="text-gray-600">
                                <span className="font-medium">Price:</span>
                                <span className="ml-2">
                                    <span className="line-through text-red-600">₹{variant.variantAcutalPrice}</span>
                                    <span className="ml-2 text-green-600">₹{variant.variantDiscountedPrice}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                    <button
                        onClick={onEdit}
                        type='button'
                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-blue-600 transition-colors"
                        aria-label="Edit variant"
                    >
                        <Pencil />
                    </button>
                    <button
                        type='button'
                        onClick={onDelete}
                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Delete variant"
                    >
                        <Trash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VariantCard