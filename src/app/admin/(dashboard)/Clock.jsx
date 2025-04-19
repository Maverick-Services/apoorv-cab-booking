"use client"

import { ClipLoader } from "react-spinners";
import { Clock as ClockIcon } from "lucide-react";
import useTime from "@/hooks/useTime";

export default function Clock() {
    const date = new Date();
    const { finalDate, realTime, timeLoading } = useTime({ date });

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Current Time</p>
                    {!timeLoading ? (
                        <div className="mt-2 space-y-1">
                            <h3 className="text-2xl font-bold text-gray-800">{realTime}</h3>
                            <h3 className="text-sm text-gray-500">{finalDate}</h3>
                        </div>
                    ) : (
                        <div className="mt-2">
                            <ClipLoader size={20} color="#4F46E5" />
                        </div>
                    )}
                </div>
                <div className="bg-orange-100 p-4 rounded-xl group-hover:bg-orange-200 transition-colors">
                    <ClockIcon className="w-8 h-8 text-orange-600" />
                </div>
            </div>
        </div>
    );
}
