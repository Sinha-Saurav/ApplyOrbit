import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header.jsx'

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden relative">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="flex justify-between items-center px-8 py-5 text-[12px] text-[#7C8478] mt-12">
                <div>
                    
                        <p className="font-bold font-['Playfair_Display'] text-[16px] text-[#d3703b]">
                            ApplyOrbit
                        </p>
                    <p className="italic font-serif">
                        © 2026 ApplyOrbit. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-8">
                    <p className="cursor-pointer hover:text-[#C67346]">
                        Privacy Policy
                    </p>

                    <p className="cursor-pointer hover:text-[#C67346]">
                        Terms of Service
                    </p>

                    <p className="cursor-pointer hover:text-[#C67346]">
                        Contact
                    </p>
                </div>
            </footer>
        </div>
    );
}
    
