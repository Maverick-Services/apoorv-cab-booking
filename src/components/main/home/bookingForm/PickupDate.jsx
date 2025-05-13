'use client'

import React, { useEffect, useState } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { Controller } from 'react-hook-form'

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
const minutes = ['00', '15', '30', '45']
const periods = ['AM', 'PM']

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
                        className="w-full px-4 py-1 rounded-lg border border-gray-300"
                    />
                </div>

                {/* Time Picker Dropdowns */}
                <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                        <Clock size={16} className="text-primary" />
                        Pickup Time
                    </label>
                    <Controller
                        name="pickupTime"
                        control={control}
                        rules={{ required: true }}
                        defaultValue="09:00 AM"
                        render={({ field }) => {
                            const [hourVal, minuteVal, periodVal] = field.value?.split(/[: ]/) ?? ['09', '00', 'AM']
                            const [hour, setHour] = useState(hourVal)
                            const [minute, setMinute] = useState(minuteVal)
                            const [period, setPeriod] = useState(periodVal)

                            useEffect(() => {
                                if (field.value) {
                                    const [h, m, p] = field.value.split(/[: ]/)
                                    setHour(h)
                                    setMinute(m)
                                    setPeriod(p)
                                }
                            }, [field.value])

                            const updateTime = (h, m, p) => {
                                setHour(h)
                                setMinute(m)
                                setPeriod(p)
                                if (h && m && p) {
                                    field.onChange(`${h}:${m} ${p}`)
                                }
                            }

                            return (
                                <div className="flex gap-2">
                                    <select
                                        value={hour}
                                        onChange={(e) => updateTime(e.target.value, minute, period)}
                                        className="flex-1 px-3 py-1 border rounded-lg border-gray-300"
                                    >
                                        <option value="">Hour</option>
                                        {hours.map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={minute}
                                        onChange={(e) => updateTime(hour, e.target.value, period)}
                                        className="flex-1 px-3 py-1 border rounded-lg border-gray-300"
                                    >
                                        <option value="">Min</option>
                                        {minutes.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={period}
                                        onChange={(e) => updateTime(hour, minute, e.target.value)}
                                        className="flex-1 px-3 py-1 border rounded-lg border-gray-300"
                                    >
                                        <option value="">AM/PM</option>
                                        {periods.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
