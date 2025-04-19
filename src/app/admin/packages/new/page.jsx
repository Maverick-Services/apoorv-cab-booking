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
                            className="h-full flex">
                            {/* Left Section - Form Fields */}
                            <div className="flex-1 flex flex-col gap-5 p-8 border-r border-gray-100">
                                <ProductName />
                                <ProductDescription />
                                <PriceDetails />
                            </div>

                            {/* Right Section - Image Upload */}
                            {/* <div className="w-96 p-8 flex flex-col">
                                <ProductImage updateProductId={updateProductId} />
                            </div> */}
                        </form>
                    </section>
            }
        </InnerLayout>
    );
}