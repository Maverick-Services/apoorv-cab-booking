"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
// import { auth } from "@/lib/firebase/firebase-client";

export default function Sidebar({ isOpen, setIsSidebarOpen, sidebarLinks }) {
    const pathname = usePathname();
    // const user = auth.currentUser;
    // console.log("User", user);

    function onLinkClick() {
        setIsSidebarOpen(false)
    }

    return (
        <div className={`max-[640px]:max-w-58 w-full max-[640px]:absolute ${!isOpen ? "-left-full" : 'left-0'} max-[640px]:top-0 sm:w-[7rem] lg:w-[18rem] h-screen bg-gradient-to-b overflow-auto from-gray-50 to-white border-r border-gray-100 shadow-xl flex flex-col items-center gap-2 px-6 py-2 transition-all duration-500 ease-in-out`}>
            <div className="w-full p-4 hover:scale-[1.02] transition-transform duration-300">
                <Image
                    src={MAIN_WEBSITE.logo}
                    alt="logo"
                    height={160}
                    width={160}
                    className="w-full sm:hidden lg:block object-contain"
                />
                <h2 className="text-secondary font-bold items-center hidden sm:flex lg:hidden  justify-center text-3xl">TBP</h2>
            </div>

            <div className="w-full flex flex-col gap-3 transition-all duration-300 ease-in-out">
                {sidebarLinks?.map(({ href, label, icon }) => {
                    const abc = href.split('/')[1]
                    const isActive = href === `/${abc}` ? pathname === `/${abc}` : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onLinkClick}
                            className={`group flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-300
                                ${isActive
                                    ? "bg-gradient-to-r from-primary to-secondary shadow-md text-white"
                                    : "hover:bg-gray-100 hover:translate-x-1 text-gray-600 hover:text-gray-900"}
                            `}
                        >
                            <span className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"}`}>
                                <span
                                    className="text-xl"
                                    style={{ fontSize: "max(1.3vw, 20px)" }}
                                >
                                    {icon}
                                </span>
                            </span>

                            <span className="text-sm sm:hidden lg:block font-medium opacity-100 group-hover:opacity-100 transition-opacity">
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto w-full border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image
                        src={MAIN_WEBSITE.car1}
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium sm:hidden lg:block ">Apoorv Cab Booking</p>
                        <p className="text-xs text-gray-500 sm:hidden lg:block ">user@gmail.com</p>
                    </div>
                </div>
                <Button className='w-full mt-2 text-white'><span><LogOut /></span> <span className="sm:hidden lg:block">Logout</span> </Button>
            </div>
        </div>
    );
}
