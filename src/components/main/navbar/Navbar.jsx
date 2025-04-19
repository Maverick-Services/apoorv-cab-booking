"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MAIN_WEBSITE } from '@/lib/assets/assets'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="max-w-7xl pt-4 mx-auto">
            <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Brand */}
                <Image
                    src={MAIN_WEBSITE.logo}
                    height={100}
                    width={250}
                    alt='logo'
                />

                {/* Hamburger Icon (visible on mobile) */}
                <div className="md:hidden">
                    <button
                        type="button"
                        className="text-gray-700 hover:text-white focus:outline-none"
                        aria-label="Toggle menu"
                        onClick={handleToggle}
                    >
                        <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                            {/* Simple burger icon; you could switch icons when isOpen is true */}
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links (hidden on mobile, visible on md+) */}
                <div className="hidden md:flex md:space-x-6">
                    <Link href="#why-us">
                        <p className="hover:text-blue-500 transition-colors">Why Us</p>
                    </Link>
                    <Link href="#testimonials">
                        <p className="hover:text-blue-500 transition-colors">Testimonials</p>
                    </Link>
                    <Link href="#contact">
                        <p className="hover:text-blue-500 transition-colors">Contact</p>
                    </Link>
                </div>

                {/* Login Button (hidden on mobile, visible on md+) */}
                <button className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </div>

            {/* Dropdown Menu (visible when toggled on mobile) */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 transition-all duration-300">
                    <Link href="/">
                        <p className="block py-2 hover:text-blue-500">Home</p>
                    </Link>
                    <Link href="/why-us">
                        <p className="block py-2 hover:text-blue-500">Why Us</p>
                    </Link>
                    <Link href="/contact-us">
                        <p className="block py-2 hover:text-blue-500">Contact Us</p>
                    </Link>
                    <button className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
