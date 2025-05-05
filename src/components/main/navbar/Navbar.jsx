"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MAIN_WEBSITE } from '@/lib/assets/assets'
// import LoginDialog from '../LoginDialog'
import useAuthStore from '@/store/useAuthStore'
import LoginDialogOuter from '../LoginDialogOuter'
import { PhoneCall } from 'lucide-react'
import { BorderBeam } from "@/components/magicui/border-beam";

// const navLinks = [
//     { href: '#why-us', label: 'Why Us' },
//     { href: '#testimonials', label: 'Testimonials' },
//     { href: '#contact', label: 'Contact' },
// ]

const authLinks = [
    { href: '/my-trips', label: 'My Trips' },
    { href: '/profile', label: 'Profile' },
]

export default function Navbar() {
    const { user, userData, handleLogout } = useAuthStore()
    // console.log(user)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <nav className=" bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm z-50 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src={MAIN_WEBSITE.logo}
                            height={48}
                            width={140}
                            alt="logo"
                            className="hover:opacity-90 transition-opacity"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-gray-600 hover:text-blue-900 transition-colors relative group"
                            >
                                {label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all group-hover:w-full"></span>
                            </Link>
                        ))} */}

                        <div className="relative ">
                            {/* Soft gradient glow behind */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-2xl blur-lg" /> */}

                            {/* Main Card Container */}
                            <div className="relative flex items-center divide-x divide-gray-300 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-200 shadow-sm transition-transform hover:shadow-md ">

                                {/* Availability Segment */}
                                <div className="flex items-center pr-4">
                                    <PhoneCall className="w-5 h-5 text-indigo-600" />
                                    <span className="ml-2 text-sm font-medium text-gray-700">24 X 7 Support</span>
                                </div>

                                {/* Phone Number Segment */}
                                <div className="flex items-center pl-4">
                                    <a
                                        href="tel:7248772488"
                                        className="text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                                    >
                                        +91 72487 72488
                                    </a>
                                </div>

                                {/* Animated Border Beam */}
                                <BorderBeam
                                    duration={8}
                                    size={180}
                                    colorFrom="#6366f1"
                                    colorTo="#8b5cf6"
                                    delay={0.5}
                                    className="absolute -z-10"
                                />
                            </div>
                        </div>

                        {user ? (
                            <div className="flex items-center space-x-6 ml-4">
                                {authLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="text-gray-600 hover:text-blue-900 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <div className="flex items-center space-x-4 border-l pl-6 ml-4 border-gray-200">
                                    <span className="text-gray-600 font-medium">
                                        Hi, {userData?.name?.split(' ')[0] || user.email.split('@')[0]}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-gradient-to-br from-red-500 to-rose-600 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className='flex flex-row-reverse md:hidden'>
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className={`h-6 w-6 transform transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                        <div className="relative ">
                            {/* Soft gradient glow behind */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 rounded-2xl blur-lg" /> */}

                            {/* Main Card Container */}
                            <div className="relative flex items-center divide-x divide-gray-300 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-200 shadow-sm transition-transform hover:shadow-md ">

                                {/* Availability Segment */}
                                <div className="flex items-center pr-2">
                                    <PhoneCall className="w-5 h-5 text-indigo-600" />
                                </div>

                                {/* Phone Number Segment */}
                                <div className="flex items-center pl-2">
                                    <a
                                        href="tel:7248772488"
                                        className="text-base font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                                    >
                                        72487 72488
                                    </a>
                                </div>

                                {/* Animated Border Beam */}
                                <BorderBeam
                                    duration={8}
                                    size={180}
                                    colorFrom="#6366f1"
                                    colorTo="#8b5cf6"
                                    delay={0.5}
                                    className="absolute -z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
                        {/* {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="block px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {label}
                            </Link>
                        ))} */}

                        {user ? (
                            <>
                                {authLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="block px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <div className="px-4 pt-4 mt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 font-medium">
                                            {userData?.name || user.email}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="w-full mt-2 bg-blue-900 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                )}
            </div>

            <LoginDialogOuter open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </nav>
    )
}