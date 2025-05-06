"use client"

import React, { useEffect, useState } from "react"
import { getAllPickupCities } from '@/lib/firebase/admin/pickupCity'
import { Skeleton } from "@/components/ui/skeleton"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllLocalTrips } from "@/lib/firebase/admin/localTrips"
import { TRIP_TYPES } from "@/lib/constants/constants"
import { getAllAirportTrips } from "@/lib/firebase/admin/airportTrips"

function Pickup({ register, setValue, tripType, pickupCities, setPickupCities }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)

  const fetchPickupCities = async () => {
    setLoading(true)
    try {
      const res = await getAllPickupCities()
      setPickupCities(res || [])
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const fetchLocalTrips = async () => {
    setLoading(true)
    try {
      const res = await (
        tripType === TRIP_TYPES.local ? getAllLocalTrips()
          : getAllAirportTrips()
      )
      // console.log("local", )
      setPickupCities(Array.from(
        new Map(
          res?.map(lc => [lc?.cityName, { id: lc?.id, name: lc?.cityName }])
        ).values()
      ) || [])

    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // console.log("Trip Type", tripType);
    if (tripType === TRIP_TYPES.local || tripType === TRIP_TYPES.airport)
      fetchLocalTrips();
    else
      fetchPickupCities();

  }, [tripType])
  // console.log("Pikup Cities", pickupCities);

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setValue('pickupCity', city.name)
    if (tripType === TRIP_TYPES.local || tripType === TRIP_TYPES.airport) setValue('tripId', city.id);
    setOpen(false)
  }

  return (
    <div className="w-full">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
        <MapPin size={16} className="text-primary" />
        Pickup Location
      </label>

      {loading ? (
        <Skeleton className="w-full h-12 rounded-lg" />
      ) : (
        <>
          <input
            type="hidden"
            {...register('pickupCity', { required: true })}
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white px-4 py-3  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100",
                  !selectedCity && "text-gray-400"
                )}
              >
                {selectedCity?.name || "Select Pickup City"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-0">
              <Command>
                <CommandInput placeholder="Search city..." className="h-10" />
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {pickupCities.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.name}
                      onSelect={() => handleCitySelect(city)}
                    >
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  )
}


export default Pickup
