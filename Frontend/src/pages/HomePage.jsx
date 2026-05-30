import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <nav className={`flex px-8 justify-between bg-[#FDFBF7] h-16 fixed top-0 right-0 left-0 z-50
                items-center shadow-2xs `}
            >
                <h1 className="text-2xl font-bold font-['Playfair_Display'] text-[#344E41]">ApplyOrbit</h1>
                <div className='flex gap-16 text-[#779082] font-semibold'>
                    <p
                        className='hover:text-[#C67346] hover:scale-101
                        border-b-2 border-transparent hover:border-[#C67346] cursor-pointer transition-all duration-200'
                        onClick={() => navigate('/dashboard')}
                    >Dashboard</p>
                    <p
                        className='hover:text-[#C67346] hover:scale-101
                        border-b-2 border-transparent hover:border-[#C67346] cursor-pointer transition-all duration-200'
                        onClick={() => navigate('/applications')}
                    >Applications</p>
                    <p
                        className='hover:text-[#C67346] hover:scale-101
                        border-b-2 border-transparent hover:border-[#C67346] cursor-pointer transition-all duration-200'
                        onClick={() => navigate('/dashboard')}
                    >Resume Tailor</p>
                </div>
                <div className='flex gap-5 items-center'>
                    <p
                        className='font-semibold cursor-pointer text-[#2d6632] hover:text-[#3ba143] hover:scale-105
                            bg-gradient-to-r from-[#3ba143] to-[#3a5f4b] bg-no-repeat bg-bottom 
                            bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-all duration-200'
                        onClick={() => navigate('/auth/signin')}
                    >Sign in</p>
                    <p
                        className='font-semibold text-white px-2 py-1 cursor-pointer border-none rounded-[6px] bg-[#2d6632]
                        hover:bg-[#3ba143] hover:scale-104 transition-all duration-200 '
                        onClick={() => navigate('/auth/signup')}
                    >Sign up</p>
                </div>
            </nav>

            <main className='min-h-screen bg-[#767A57] pt-[60px]'>
                <section className='grid grid-cols-[1fr_1.5fr]  bg-[#FBF6F1]'>
                    <div className='flex flex-col bg-[#FBF6F1] pl-20 pt-32'>
                        <p className="font-['Playfair_Display'] text-5xl mb-2 text-[#49523b]">Organize today.</p>
                        <p className="font-['Playfair_Display'] text-5xl text-[#d17544]">Get hired tommorow.</p>
                        <p className='my-8 max-w-[340px] font-semibold text-gray-700'>Track your applications, tailor your resume and never miss an opportunity.</p>
                        <div className='flex gap-2'>
                            <div className='flex items-center gap-2 border-none px-5 py-3 rounded-[10px] bg-[#344E41] 
                            cursor-pointer hover:scale-101 hover:bg-[#39624e] transition-all duration-300'
                                onClick={() => navigate('/dashboard')}>
                                <p className='text-white font-medium'>View Dashboard
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                            <p
                                className='border-2 border-[#d17544] font-medium text-[#d17544] rounded-[10px]
                                px-5 py-3 cursor-pointer hover:scale-102 transition-all duration-300 hover:shadow'
                                onClick={() => navigate('/applications')}
                            >Add Application</p>
                        </div>
                    </div>
                    <div>
                        <img src='/herosection.png' alt="A abstract art where a lady working on her computer" className='pt-15' />
                    </div>
                </section>

                <section className='rounded-tr-[70px] border-t-[1px] border-t-[#e08f63]  bg-[#FBF6F1] px-6'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className="font-['Playfair_Display'] text-[20px] my-5 pt-10 text-zinc-800">What's inside?</p>
                        <p className='max-w-2xl text-[13px] text-center text-zinc-800'>A thoughtfully designed space to elevate your job search with tools designed
                            to reduce cognitive lode and enhance your professional presentation.
                        </p>
                    </div>
                    <div className='flex gap-10 justify-center mt-14'>
                        <div className='group bg-[#faefe3] p-8 rounded-4xl max-w-[350px] 
                            hover:bg-[#ffecd7]  transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none"
                                stroke="#75340B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                className='lucide lucide-square-kanban bg-[#FFDBCB] p-3 rounded-[10px]
                                group-hover:scale-110 transition-transform duration-300'
                            ><rect width="18"
                                height="18" x="3" y="3" rx="2" /><path d="M8 7v7" /><path d="M12 7v4" /><path d="M16 7v9" />
                            </svg>
                            <p className='text-gray-700 font-serif my-4'>Track Applications</p>
                            <p className='text-[14px] text-[#6e4a06]'>A visual board to manage your journey from first contact to signed offer,
                                keeping every detail in sight.
                            </p>
                            <img src='/application.png' alt="a empty application lists"
                                className='w-full object-contain'
                            />
                        </div>
                        <div className='bg-[#5F7B6C] p-8 rounded-4xl max-w-[350px] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none"
                                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                className="lucide lucide-book-open-check-icon bg-[#7F9589] p-3 rounded-[10px]
                                group-hover:rotate-6 transition-transform duration-300"><path d="M12 21V7" />
                                <path d="m16 12 2 2 4-4" /><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 
                                1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/>
                            </svg>
                            <p className='text-[#fff7f7] font-serif my-4'>Tailor Resume</p>
                            <p className='text-[14px] text-[#fff7f7]'>
                                Adapt your story for every role. Our AI-assisted tool highlights your most relevant strengths
                                for every application.
                            </p>
                            <img src='/Resume folder.png' alt="a empty application lists"
                                className='w-full object-contain group-hover:brightness-110 transition-all duration-300'
                            />
                        </div>
                        <div className='bg-[#F1E7DC] p-8 rounded-4xl max-w-[350px] group
                            hover:bg-[#efdfce] transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className='lucide lucide-calendar-icon bg-[#5C614D] 
                                p-3 rounded-[10px] group-hover:scale-110 transition-transform duration-300'>
                                <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M3 10h18" />
                            </svg>
                            <p className='text-gray-700 font-serif my-4'>Stay Organized</p>
                            <p className='text-[14px] text-[#2a4a06]'>Automated reminders and integrated calendars ensure
                                you never miss a follow-up or a deadline.
                            </p>
                            <img src='/Organizing projects.png' alt="a empty application lists"
                                className='w-full object-contain'
                            />
                        </div>

                    </div>
                    <div className='px-4 bg-[#344E41] rounded-4xl max-w-full min-h-85 mt-35 flex flex-col
                        justify-center items-center'>
                        <p className='text-white font-serif'>Ready to land your next role?</p>
                        <p className='text-[#e6e6e6] my-7 max-w-2xl text-center'>Join students and freshers who are tracking smarter, applying faster, and standing out with tailored resumes.</p>
                        <div className='flex gap-5 items-center justify-center'>
                            <button
                                className='bg-[#C67346] border-none px-10 py-5 rounded-[8px]
                                hover:brightness-105 cursor-pointer text-white font-medium shadow-2xl'
                                onClick={() => navigate('/dashboard')}
                            >Start Tracking Free</button>
                            <p className='max-w-50 text-gray-300 italic text-[14px]'>No credit card required. Just you and your goals.</p>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="flex justify-between items-center px-8 text-[12px] text-[#7C8478] mt-30 mb-5">

                <div>
                    <p className="font-bold font-['Playfair_Display'] text-sm text-[#d3703b]">
                        ApplyOrbit
                    </p>
                    <p className='italic font-serif'>
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
        </>
    )
}