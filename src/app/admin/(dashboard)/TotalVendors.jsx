'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { VENDORS } from '@/lib/constants/constants';

const TotalVendors = () => {
    const totalVendors = VENDORS.length;

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Vendors</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{totalVendors}</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <Building2 className="text-indigo-600 dark:text-indigo-300 h-6 w-6" />
            </div>
        </div>
    );
};

export default TotalVendors;
