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
