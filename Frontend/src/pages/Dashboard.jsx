import React from 'react'
import { AppContext } from '../context/AppContext'

export default function Dashboard(){

    const {apps, setApps} = React.useContext(AppContext)

    const total = apps.length;
    const applied = apps.filter(app => app.status === "Applied").length;
    const shortListed = apps.filter(app => app.status === "Shortlisted").length;
    const interviews = apps.filter(app => app.status === "Interview").length;
    const offers = apps.filter(app => app.status === "Offer").length;
    const rejected = apps.filter(app => app.status === "Rejected").length;

    return(
        <>
            <section className='px-8 py-10 flex-col'>
                <div className='mb-5'>
                    <h1 className='text-3xl font-bold text-[#264653]'>Good Evening, Saurav</h1>
                    <h2 className='text-[16px] text-[#71717A]'>Here's what's happening with your job search.</h2>
                </div>
                <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4'>

                    <div className='relative border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6 overflow-hidden'>
                        
                        <div className='relative z-10'>
                            <div className='bg-[#264653] w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{total}</p>
                            <h3 className='text-[14px] text-gray-600'>Total Applications</h3>
                        </div>

                        {/* Blob Background */}
                        <svg
                            viewBox="0 0 200 200"
                            className="absolute right-[-220px] bottom-[-80px] w-152 h-152 opacity-70"
                        >
                            <path
                            fill="#CC703F"
                            d="M49.1,-51C62.9,-47,72.8,-30.8,70,-16.8C67.2,-2.8,51.6,9,42.5,24.3C33.4,39.7,30.8,58.6,23,59.9C15.3,61.3,2.4,45.1,-13.6,38.7C-29.6,32.3,-48.6,35.7,-56,29.2C-63.3,22.8,-59,6.6,-54.1,-7.5C-49.2,-21.6,-43.6,-33.5,-34.5,-38.3C-25.4,-43.1,-12.7,-40.8,2.5,-43.8C17.7,-46.7,35.3,-54.9,49.1,-51Z"
                            transform="translate(100 100)"
                            />
                        </svg>

                    </div>

                    <div className='relative overflow-hidden border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6'>
                        
                        <div className='relative z-10'>
                            <div className='bg-[#E9C46A] w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#264853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-clock-icon lucide-clipboard-clock"><path d="M16 14v2.2l1.6 1"/><path d="M16 4h2a2 2 0 0 1 2 2v.832"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/><circle cx="16" cy="16" r="6"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{applied}</p>
                            <h3 className='text-[14px] text-gray-600'>Applied</h3>
                        </div>

                        {/* Blob Background */}
                        <svg viewBox="0 0 200 200" className="absolute left-[-100px] top-[-70px] w-152 h-152 opacity-70">
                        <path fill="#7F8058" d="M35.7,-57C48,-47.7,60.8,-40.7,67.5,-29.8C74.1,-18.8,74.6,-4,67.5,6.1C60.4,16.2,45.8,21.6,35.7,28.1C25.7,34.6,20.2,42.3,11.4,49.9C2.6,57.6,-9.4,65.3,-22.8,66.4C-36.1,67.6,-50.8,62.2,-62.1,52.1C-73.3,42.1,-81.2,27.5,-81.8,12.7C-82.5,-2,-76,-16.9,-64.7,-24.5C-53.4,-32.2,-37.4,-32.7,-25.8,-42.4C-14.2,-52,-7.1,-70.8,2.3,-74.4C11.7,-78,23.5,-66.4,35.7,-57Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className='relative overflow-hidden border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6'>
                        <div className='relative z-10'>
                            <div className='bg-[#2A9D8F] w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-user-icon lucide-file-user"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M16 22a4 4 0 0 0-8 0"/><circle cx="12" cy="15" r="3"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{shortListed}</p>
                            <h3 className='text-[14px] text-gray-600'>Short Listed</h3>
                        </div>

                        {/* Blob Background */}
                        <svg viewBox="0 0 200 200" className="absolute right-[-200px] bottom-[-40px] w-152 h-152 opacity-70">
                        <path fill="#7F8058" d="M47.2,-63.9C56.5,-58.2,56.3,-38.2,60.7,-20.7C65.1,-3.1,74.2,12,70,22.1C65.8,32.2,48.3,37.3,34.4,42.9C20.6,48.4,10.3,54.4,-1.3,56.2C-12.9,58,-25.8,55.7,-36.7,49.2C-47.7,42.6,-56.6,32,-59.4,20.1C-62.2,8.2,-58.9,-5,-54,-16.7C-49.1,-28.5,-42.5,-39,-33.2,-44.8C-24,-50.5,-12,-51.6,3.5,-56.4C18.9,-61.2,37.9,-69.7,47.2,-63.9Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    <div className='relative overflow-hidden border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6'>

                        <div className='relative z-10'>
                            <div className='bg-[#F4A261] w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#264653" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{interviews}</p>
                            <h3 className='text-[14px] text-gray-600'>Interviews</h3>
                        </div>

                        {/* Blob Background */}
                        <svg viewBox="0 0 200 200" className='absolute left-[-80px] top-[-50px] w-152 h-152 opacity-70'>
                        <path fill="#CC703F" d="M26.7,-48.1C29.7,-44.5,23.8,-27.4,34.4,-17.1C45,-6.9,72.2,-3.4,80.7,4.9C89.3,13.3,79.2,26.6,67.3,34.7C55.4,42.9,41.8,45.8,30.3,45.1C18.8,44.4,9.4,40,-3.5,46.1C-16.5,52.2,-32.9,68.9,-46.5,70.8C-60,72.7,-70.6,59.8,-73.2,45.5C-75.8,31.3,-70.3,15.6,-67.3,1.7C-64.3,-12.1,-63.7,-24.3,-58.6,-34.1C-53.4,-44,-43.8,-51.5,-33.3,-50.7C-22.7,-49.9,-11.4,-40.6,0.2,-41.1C11.9,-41.5,23.7,-51.6,26.7,-48.1Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className='relative overflow-hidden border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6'>
                        <div className='relative z-10'>
                            <div className='bg-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{offers}</p>
                            <h3 className='text-[14px] text-gray-600'>Offers</h3>
                        </div>

                        {/* Blob Background */}
                        <svg viewBox="0 0 200 200" className='absolute right-[-80px] top-[-50px] w-152 h-152 opacity-70'>
                        <path fill="#CC703F" d="M26.7,-48.1C29.7,-44.5,23.8,-27.4,34.4,-17.1C45,-6.9,72.2,-3.4,80.7,4.9C89.3,13.3,79.2,26.6,67.3,34.7C55.4,42.9,41.8,45.8,30.3,45.1C18.8,44.4,9.4,40,-3.5,46.1C-16.5,52.2,-32.9,68.9,-46.5,70.8C-60,72.7,-70.6,59.8,-73.2,45.5C-75.8,31.3,-70.3,15.6,-67.3,1.7C-64.3,-12.1,-63.7,-24.3,-58.6,-34.1C-53.4,-44,-43.8,-51.5,-33.3,-50.7C-22.7,-49.9,-11.4,-40.6,0.2,-41.1C11.9,-41.5,23.7,-51.6,26.7,-48.1Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    
                    <div className='relative overflow-hidden border-0 bg-white rounded-md shadow-[0_0_2px_rgba(0,0,0,0.2)] h-36 p-6'>
                        <div className='relative z-10'>
                            <div className='bg-[#e6502b] w-11 h-11 rounded-xl flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                            </div>

                            <p className='text-2xl font-bold text-[#264853] mt-1.5 mb-1 ml-1'>{rejected}</p>
                            <h3 className='text-[14px] text-gray-600'>Rejected</h3>
                        </div>

                        {/* Blob Background */}
                        <svg viewBox="0 0 200 200" className='absolute right-[-280px] bottom-[-30px] w-152 h-152 opacity-70'>
                        <path fill="#7F8058" d="M31.4,-49.9C44.5,-46.7,61.8,-46.2,64.3,-38.3C66.8,-30.4,54.7,-15.2,46.3,-4.9C37.9,5.5,33.2,11,29.1,16.2C25,21.4,21.5,26.2,16.7,38.4C12,50.6,6,70.1,-1.6,72.9C-9.3,75.7,-18.5,61.9,-26.1,51.4C-33.6,40.8,-39.4,33.5,-40.6,25.4C-41.7,17.4,-38,8.7,-40.4,-1.3C-42.7,-11.4,-51,-22.8,-47.6,-26.8C-44.2,-30.8,-29,-27.4,-19.1,-32.5C-9.2,-37.6,-4.6,-51.1,2.2,-55C9.1,-58.9,18.2,-53.1,31.4,-49.9Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    
                </div>
            </section>

            <section className='px-8'>
                <h3 className='text-2xl font-medium text-[#264653]'>Recent Applications</h3>
            </section>
        </>  
    )
}