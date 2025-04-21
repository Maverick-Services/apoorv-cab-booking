"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircleCheckBig, Loader2, LucideDelete, PlusCircle } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
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
// import { useCabTypeForm } from '../context/CabTypeContext';

const PickupCityForm = () => {
    // const searchParams = useSearchParams();
    // const updateCabTypeId = searchParams.get('id');
    const [isLoading, setIsLoading] = useState(false)
    const [otherError, setOtherError] = useState(null)
    const [creating, setCreating] = useState(false)
    const [updateCabTypeId, setUpdateCabTypeId] = useState()

    const [tempTerm, setTempTerm] = useState('');
    const [termsArray, setTermsArray] = useState([]);

    // const {
    //     otherError,
    //     isLoading,
    //     creating,
    //     deleting,
    //     fetchData,
    //     handleCreate,
    //     handleUpdate,
    //     handleDelete,
    // } = useCabTypeForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    // Initially Fetch Product Details if we got Id in URL
    // useEffect(() => {
    //     if (updateCabTypeId) {
    //         (async () => {
    //             const cabTypeData = await fetchData(updateCabTypeId);
    //             if (cabTypeData) {
    //                 setValue('name', cabTypeData.name);
    //                 setValue('seatingCapacity', cabTypeData.seatingCapacity);
    //                 setValue('luggageCapacity', cabTypeData.luggageCapacity);
    //             }
    //         })();
    //     }
    // }, [updateCabTypeId]);


    const onSubmit = async (data) => {
        console.log('Cab Type Data:', data);
        // if (updateCabTypeId) {
        //     handleUpdate({ ...data, id: updateCabTypeId });
        // } else {
        //     handleCreate(data);
        // }
    };

    const handleAddTerm = () => {
        if (tempTerm.trim() !== '') {
            setTermsArray([...termsArray, tempTerm.trim()]);
            setTempTerm('');
        }
    };

    const handleRemoveTerm = (index) => {
        setTermsArray(termsArray.filter((_, i) => i !== index));
    };

    return (
        <div className='w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full"
            >
                <div className=''>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 mb-4 gap-4 p-4 bg-white rounded-xl border border-gray-300'>
                        {/* City Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor='name' className="text-sm font-medium">City Name</label>
                            {isLoading
                                ? <Skeleton className="h-10 w-full" />
                                : <input
                                    type="text"
                                    id="name"
                                    placeholder='eg. Delhi / Lucknow / Manali'
                                    {...register('name', { required: 'City Name is required' })}
                                    className="border p-2 rounded-md"
                                />
                            }
                            {errors.name && (
                                <span className="text-red-500 text-xs">{errors.name.message}</span>
                            )}
                        </div>

                        {/* City Terms and Conditions */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor='terms' className="text-sm font-medium">Terms and Conditions</label>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="terms"
                                    placeholder='eg. Your Trip has a KM limit.'
                                    value={tempTerm}
                                    onChange={(e) => setTempTerm(e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTerm}
                                    className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
                                >
                                    +
                                </button>
                            </div>

                            {errors.terms && (
                                <span className="text-red-500 text-xs">{errors.terms.message}</span>
                            )}

                            {/* Display List of Terms */}
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {termsArray.map((term, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        {index + 1}. {term}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTerm(index)}
                                            className="text-red-500 hover:text-red-700 ml-2 text-xs cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                            {!updateCabTypeId ?
                                <div className='flex justify-center items-center gap-2'> <PlusCircle size={20} /> Add </div>
                                : <div className='flex justify-center items-center gap-2'> <CircleCheckBig size={20} /> Update </div>
                            }
                        </>
                    )}
                </button>

                {/* Delete Button */}
                {updateCabTypeId && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                            >
                                <LucideDelete size={20} /> Delete
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Delete Cab Type</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this Cab Type?
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    // onClick={() => handleDelete(updateCabTypeId)}
                                    // disabled={deleting === updateCabTypeId}
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

export default PickupCityForm;