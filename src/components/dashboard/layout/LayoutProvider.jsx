'use client'

import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

function LayoutProvider({ children }) {
    // const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // if (!user) {
    //     return <Auth />;
    // }

    return (
        <main className='flex flex-col sm:flex-row h-screen relative'>
            <div className="w-full max-[768px]:flex-col flex bg-[#F3F6FE] h-screen">
                <div className="flex w-full justify-between items-center p-5 bg-white shadow-md md:hidden">
                    <img src="/logo.png" alt="logo" className="h-7" />
                    <div onClick={() => setSidebarOpen(prev => !prev)} className="cursor-pointer">
                        {sidebarOpen
                            ? <IoClose className="text-2xl ease-in-out transition-all duration-300 focus:rotate-90" />
                            : <FiMenu className="text-2xl" />
                        }
                    </div>
                </div>
                <Sidebar isOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />
            </div>
            <div className='hidden sm:block'>
                <Sidebar />
            </div>
            <div className='grow h-screen overflow-auto'>
                {children}
            </div>
        </main>
    )
}

export default LayoutProvider;
