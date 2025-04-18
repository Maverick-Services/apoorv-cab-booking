import InnerLayout from "@/components/dashboard/layout/InnerLayout";
import ProductName from "./components/ProductName";
import { Loader } from "lucide-react";
import ProductDescription from "./components/ProductDescription";
import PriceDetails from "./components/PriceDetails";
// import { useSearchParams } from "next/navigation";

export default function Page() {
    // const searchParams = useSearchParams();
    // const updateProductId = searchParams.get('id');

    // const {
    //     isLoading,
    //     handleCreate,
    //     handleUpdate,
    //     fetchData,
    // } = useProductForm();

    // Initially Fetch Product Details if we got Id in URL
    // useEffect(() => {
    //     if (updateProductId) {
    //         fetchData(updateProductId);
    //     }
    // }, [updateProductId]);

    const handleSubmit = (e) => {
        // e.preventDefault();
        // if (updateProductId) {
        //     handleUpdate();
        // } else {
        //     handleCreate();
        // }
    };

    return (
        <InnerLayout heading={'Add new Package'}>
            {
                // isLoading
                false
                    ? <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex items-center justify-center">
                        <Loader />
                    </section>
                    : <section className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit min-h-full">
                        <form
                            // onSubmit={handleSubmit} 
                            className="h-full flex flex-col gap-5 p-5">
                            <ProductName />
                            <ProductDescription />
                            <PriceDetails />

                            <button
                                type="submit"
                                // disabled={isLoading}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 cursor-pointer transition-colors font-medium disabled:opacity-50"
                            >
                                {false ? (
                                    <Loader className="" color='white' size={10} height={6} />
                                ) : false ? (
                                    "Update Package"
                                ) : (
                                    "Create Package"
                                )}
                            </button>
                        </form>
                    </section>
            }
        </InnerLayout>
    );
}