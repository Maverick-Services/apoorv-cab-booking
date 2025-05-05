import Image from 'next/image';
import React, { Suspense } from 'react';
import BookingForm from './BookingForm';

export const dynamic = "force-dynamic";

function Header() {
    return (
        <div className="pt-8 pb-12 px-6 lg:px-20 xl:px-28 bg-white">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-7 max-w-[1500px] mx-auto">
                {/* LEFT - FORM */}
                <div className="w-full max-w-lg">
                    <div className="rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <h2 className="bg-primary text-white text-center text-xl font-semibold py-3">
                            Find Your Perfect Cab
                        </h2>
                        <div className="">
                            <Suspense fallback={<div className="text-center py-4"></div>}>
                                <BookingForm />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* RIGHT - IMAGE */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
                    <div className="text-left pl-4">
                        <h1 className="text-4xl md:text-4xl xl:text-5xl font-extrabold leading-tight text-gray-900">
                            Find, book & rent a cab
                            <span className="text-primary"> Easily</span>.
                        </h1>
                        <p className="mt-1 text-gray-600 text-base md:text-lg">
                            Hassle-free online cab booking with quick confirmation and trusted service.
                        </p>
                    </div>
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
