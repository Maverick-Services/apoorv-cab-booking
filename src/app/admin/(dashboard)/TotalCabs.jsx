'use client';

import React from 'react';
import { CarFront } from 'lucide-react';
import { VENDORS } from '@/lib/constants/constants';

const TotalCabs = () => {
    const totalCabs = VENDORS.reduce((total, vendor) => total + vendor.cabs.length, 0);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex items-center justify-between border border-gray-200 dark:border-gray-800">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Cabs</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{totalCabs}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <CarFront className="text-green-600 dark:text-green-300 h-6 w-6" />
            </div>
        </div>
    );
};

export default TotalCabs;
