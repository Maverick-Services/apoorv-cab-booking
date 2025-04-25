import { MAIN_WEBSITE } from '@/lib/assets/assets';
import Image from 'next/image';
import React from 'react';
import { FaDollarSign, FaUser, FaClock, FaHeadset } from 'react-icons/fa';

function WhyUs() {
    return (
        <section id='why-us' className="py-24">
            <div className='max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:gap-10 items-center'>
                {/* Left Side - Car Image */}
                <div className="mb-12 lg:mb-0">
                    <Image
                        src={MAIN_WEBSITE.mobile}
                        height={800}
                        width={2000}
                        alt='Rental Car'
                    />

                </div>

                {/* Right Side - Content */}
                <div className="">
                    {/* <div className="mb-4">
                    <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1 rounded-full">
                        WHY CHOOSE US
                    </span>
                </div> */}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                        We offer the best experience <br /> with our rental deals
                    </h2>

                    <div className="space-y-6">
                        {/* Feature Item */}
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaDollarSign className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Best price guaranteed</h4>
                                <p className="text-gray-500 text-sm">
                                    Find a lower price? We’ll refund you 100% of the difference.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaUser className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Experience driver</h4>
                                <p className="text-gray-500 text-sm">
                                    Don’t have driver? Don’t worry, we have many experienced driver for you.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaClock className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">24 hour car delivery</h4>
                                <p className="text-gray-500 text-sm">
                                    Book your car anytime and we will deliver it directly to you.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <FaHeadset className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">24/7 technical support</h4>
                                <p className="text-gray-500 text-sm">
                                    Have a question? Contact Rentcars support any time when you have problem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;
