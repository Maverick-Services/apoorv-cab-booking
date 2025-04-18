import { MAIN_WEBSITE } from '@/lib/assets/assets'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='mx-auto flex flex-col-reverse md:flex-row items-start justify-center pt-10 px-4 xl:min-h-[60vh] gap-7'>
            <div className='max-w-2xl lg:pl-28 text-center md:text-left'>
                <h1 className='lg:mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl xl:text-7xl'>
                    Find, book and rent a car<br />
                    <span className='text-blue-600'>Easily</span>.
                </h1>
                <p className='mb-8 text-base text-gray-600 md:text-xl'>
                    Get a car wherever and whenever you need it with your iOS or Android device.
                    Your perfect rental experience starts here.
                </p>
            </div>
            <div className='mb-8 md:mb-0'>
                <Image
                    src={MAIN_WEBSITE.car1}
                    alt='main car'
                    width={1500}
                    height={1000}
                    className='object-contain max-w-full'
                />
            </div>
        </div>
    )
}

export default Header
