"use client";

import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import { Loader, Loader2 } from "lucide-react";
import ProductName from "./components/ProductName";
import { useForm } from "react-hook-form";
import { getAllPickupCities } from "@/lib/firebase/admin/pickupCity";
import { useEffect, useState } from "react";
import { createVendor } from "@/lib/firebase/admin/vendor";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";

export default function Page() {
    // const searchParams = useSearchParams();
    // const updateProductId = searchParams.get('id');

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pickupCities, setPickupCities] = useState([]);

    const {
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCreateVendor = async (data) => {
        setLoading(true);

        const result = await createVendor(data);
        if (result)
            router.push('/admin/vendors');

        setLoading(false);
    };

    useEffect(() => {
        const fetchPickupCities = async () => {
            setLoading(true);
            try {
                const res = await getAllPickupCities();
                setPickupCities(res || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchPickupCities();
    }, []);

    if (!pickupCities)
        return <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />

    return (
        <InnerLayout heading={'Add new Vendor'}>
            {
                // isLoading
                false
                    ? <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex items-center justify-center">
                        <Loader />
                    </section>
                    : <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit min-h-full">
                        <form
                            onSubmit={handleSubmit(handleCreateVendor)}
                            className="h-full flex flex-col gap-5 p-5">
                            {
                                pickupCities?.length > 0 &&
                                <ProductName register={register} pickupCities={pickupCities} />
                            }
                            <button
                                type="submit"
                                // disabled={isLoading}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                            >
                                {false ? (
                                    <Loader className="" color='white' size={10} height={6} />
                                ) : false ? (
                                    "Update Vendor"
                                ) : (
                                    "Create Vendor"
                                )}
                            </button>
                        </form>
                    </section>
            }
        </InnerLayout>
    );
}