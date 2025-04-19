import { MAIN_WEBSITE } from '@/lib/assets/assets';
import Image from 'next/image';
import React from 'react';
import BookingForm from './BookingForm';

function Header() {
    return (
        <div className="pt-10 px-4 lg:pl-28 xl:min-h-[60vh]">
            {/* Heading */}
            <div className="text-center md:text-left mb-10">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl xl:text-7xl">
                    Find, book and rent a cab
                    <span className="text-blue-600"> Easily</span>.
                </h1>
            </div>

            {/* Form and Image Side by Side */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Booking Form */}
                <div className="w-full max-w-xl">
                    <h2 className='bg-primary text-white border-4 border-primary text-center text-2xl font-bold pt-2 pb-1 rounded-t-xl'>Find Your Perfect Cab</h2>
                    <BookingForm />
                </div>

                {/* Image */}
                <div className="w-full lg:flex-1">
                    <Image
                        src={MAIN_WEBSITE.taxi}
                        alt="main car"
                        width={1400}
                        height={900}
                        className="object-contain w-full"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
