"use client";

import React, { useEffect, useState } from 'react';
import { CircleCheckBig, Loader2, LucideDelete, PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import CityName from './CityName';
import TripVariant from './TripVariant';
import TripHours from './TripHours';
import TripDistance from './TripDistance';
import { useLocalTripFromForm } from '../context/localTripContext';

const LocalTripForm = () => {
    const searchParams = useSearchParams();
    const updateLocalTripId = searchParams.get('id');

    const {
        otherError,
        isLoading,
        creating,
        deleting,
        fetchData,
        handleCreate,
        handleUpdate,
        handleDelete,
        data, setData, handleData,
        handleVariant, variant, setVariant, variantList, setVariantList,
    } = useLocalTripFromForm();


    // Initially Fetch local trip Details if we got Id in URL
    useEffect(() => {
        if (updateLocalTripId) {
            (async () => {
                const resp = await fetchData(updateLocalTripId);
                setData(resp)
                setVariantList(resp?.variantList)
            })();
        }
    }, [updateLocalTripId]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const finalData = {
            ...data,
            variantList: variantList
        }
        if (updateLocalTripId) {
            handleUpdate(finalData);
        } else {
            handleCreate(finalData);
        }
    };



    return (
        <div className='w-full'>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full"
            >
                <div className=''>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 mb-4 gap-4 p-4 bg-white rounded-xl border border-gray-300'>
                        {/* City Name */}
                        <CityName updateLocalTripId={updateLocalTripId} />

                        {/* Hours */}
                        <TripHours updateLocalTripId={updateLocalTripId} />

                        {/* Kilometers */}
                        <TripDistance updateLocalTripId={updateLocalTripId} />
                    </div>

                    <div className='w-full'>
                        {/* LocalTrip Variants in city */}
                        <TripVariant updateLocalTripId={updateLocalTripId} />
                    </div>
                </div>
                {otherError
                    && <p className="text-red-500 text-base">Error: {otherError}</p>
                }

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={creating}
                    className="bg-primary w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer transition"
                >
                    {creating ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {!updateLocalTripId ?
                                <div className='flex justify-center items-center gap-2'> <PlusCircle size={20} /> Add </div>
                                : <div className='flex justify-center items-center gap-2'> <CircleCheckBig size={20} /> Update </div>
                            }
                        </>
                    )}
                </button>

                {/* Delete Button */}
                {updateLocalTripId && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                            >
                                <LucideDelete size={20} /> Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Delete Cab Type</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this Local Trip?
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    onClick={() => handleDelete(data.id)}
                                    disabled={deleting}
                                    className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                                >
                                    {deleting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <LucideDelete size={20} /> Delete
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

            </form>
        </div>
    )
};

export default LocalTripForm;