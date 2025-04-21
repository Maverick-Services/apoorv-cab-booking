import Image from 'next/image';
import React, { Suspense } from 'react';
import BookingForm from './BookingForm';

export const dynamic = "force-dynamic";

function Header() {
    return (
        <div className="pt-5 pb-12 px-6 lg:px-20 xl:px-28 bg-white">
            {/* Heading at Top Center */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900">
                    Find, book & rent a cab
                    <span className="text-primary"> Easily</span>.
                </h1>
                <p className="mt-1 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                    Hassle-free online cab booking with quick confirmation and trusted service.
                </p>
            </div>

            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-2">

                {/* LEFT - FORM */}
                <div className="w-full max-w-xl">
                    <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <h2 className="bg-primary text-white text-center text-xl font-semibold py-3">
                            Find Your Perfect Cab
                        </h2>
                        <div className="">
                            <Suspense fallback={<div className="text-center py-4">Loading form...</div>}>
                                <BookingForm />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* RIGHT - IMAGE */}
                <div className="w-full lg:w-1/2 flex-1 flex justify-center">
                    <Image
                        src="/header2.jpg"
                        alt="Main Cab"
                        width={800}
                        height={800}
                        className="w-full h-auto max-w-[800px] object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
