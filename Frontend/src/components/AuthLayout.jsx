import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout(){
    return(
        <div className='grid grid-cols-[1.5fr_1fr] min-h-screen'>
            <div className='bg-[#BE5E3E] flex flex-col justify-between relative overflow-hidden'>
                <div className='p-12 relative z-20'>
                    <h1 className="font-['Playfair_Display'] text-white text-2xl font-bold">ApplyOrbit</h1>
                    <p className="font-['Playfair_Display'] text-white text-3xl font-bold leading-tight mt-14 ml-4 max-w-[600px]">
                        Organize your job search. Track
                        your applications, tailor your resume,
                        and land your dream job.
                    </p>
                </div>
                <img src="/Job search.svg" alt='job application management illustration'
                    className='bottom-[-60px] left-[-60px] w-[80%] absolute z-10'
                />

                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
                className='absolute bottom-[-300px] left-[-180px] w-[800px] opacity-80 z-0'>
                <path fill="#D5835E" d="M42.7,-67.5C55.5,-66.6,66.2,-55.5,74.2,-42.5C82.2,-29.6,87.4,-14.8,86.1,-0.8C84.7,13.2,76.8,26.5,67.4,37C58,47.5,47.2,55.3,35.8,58.9C24.3,62.5,12.2,61.9,-1.4,64.3C-14.9,66.6,-29.8,72.1,-37.5,66.3C-45.2,60.5,-45.6,43.5,-51,30.6C-56.4,17.7,-66.9,8.9,-68.4,-0.9C-69.9,-10.6,-62.5,-21.2,-55.6,-31.6C-48.8,-42,-42.4,-52.2,-33.2,-55.2C-24,-58.2,-12,-54.1,1.5,-56.7C14.9,-59.2,29.9,-68.5,42.7,-67.5Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className='bg-[#f8f8f8] flex items-center justify-center p-8'>
                <div className="w-100 max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}