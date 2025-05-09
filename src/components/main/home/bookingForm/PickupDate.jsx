'use client'

import React from 'react'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { CalendarDays, Clock } from 'lucide-react'
import { Controller } from 'react-hook-form'

export default function PickupDate({ register, control }) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Date Input */}
                <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                        <CalendarDays size={16} className="text-primary" />
                        Pickup Date
                    </label>
                    <input
                        type="date"
                        {...register('pickupDate', { required: true })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />
                </div>

                {/* 12-Hour Time Picker */}
                <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                        <Clock size={16} className="text-primary" />
                        Pickup Time
                    </label>
                    <Controller
                        name="pickupTime"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TimePicker
                                value={field.value}
                                onChange={field.onChange}
                                disableClock
                                format="h:mm a"          // 12-hour format with AM/PM
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
