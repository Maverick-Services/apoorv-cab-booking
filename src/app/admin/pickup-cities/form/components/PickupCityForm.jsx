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
import CabVariant from './CabVariant';
import CityName from './CityName';
import Terms from './Terms';
import { usePickupCityForm } from '../context/PickupCityContext';

const PickupCityForm = ({ setEditPickup }) => {
    const searchParams = useSearchParams();
    const updatePickupCityId = searchParams.get('id');

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
        tempTerm, setTempTerm, termsArray, setTermsArray,
        setOneWayTermsArray, oneWayTermsArray
    } = usePickupCityForm();


    // Initially Fetch Pickup City Details if we got Id in URL
    useEffect(() => {
        if (updatePickupCityId) {
            (async () => {
                const pickupCityData = await fetchData(updatePickupCityId);
                if (pickupCityData) {
                    handleData('name', pickupCityData?.name);
                    setTermsArray(pickupCityData?.terms);
                    setOneWayTermsArray(pickupCityData?.oneWayTerms);
                    setVariantList(pickupCityData?.variantList)
                    setEditPickup(true);
                }
            })();
        }
    }, [updatePickupCityId]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        let finalData = {
            ...data,
            terms: [...termsArray],
            oneWayTerms: [...oneWayTermsArray],
            variantList: variantList
        }
        if (updatePickupCityId) {
            finalData = {
                ...finalData,
                id: updatePickupCityId
            }
            handleUpdate(finalData);
            return;
        }
        handleCreate(finalData)
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
                        <CityName />

                        {/* City Terms and Conditions */}
                        <Terms />

                    </div>
                    <div className='w-full'>
                        {/* Cabs in city Details */}
                        <CabVariant />
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
                            {!updatePickupCityId ?
                                <div className='flex justify-center items-center gap-2'> <PlusCircle size={20} /> Create Pickup City </div>
                                : <div className='flex justify-center items-center gap-2'> <CircleCheckBig size={20} /> Update Pickup City </div>
                            }
                        </>
                    )}
                </button>

                {/* Delete Button */}
                {updatePickupCityId && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                            >
                                <LucideDelete size={20} /> Delete Pickup City
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Delete Pickup City</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this Pickup City?
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    onClick={() => handleDelete(updatePickupCityId)}
                                    disabled={deleting === updatePickupCityId}
                                    className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                                >
                                    {deleting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <LucideDelete size={20} /> Delete Pickup City
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

export default PickupCityForm;