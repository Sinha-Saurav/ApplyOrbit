import React from 'react'
import { AppContext } from "../context/AppContext";

export default function Settings() {

    const userName = localStorage.getItem('userName')
    const email = localStorage.getItem('email')

    return (
        <section className='mt-25 px-8 flex flex-col gap-5'>
            <div>
                <h1 className='text-2xl font-bold text-[#264653]'>Settings</h1>
                <p className='text-[16px] font-medium text-[#616169]'>Manage your profile and account</p>
            </div>

            <div className='w-full flex flex-col gap-7 shadow rounded-2xl p-6 bg-[#ffffff]'>
                <div>
                    <h2 className='text-[22px] font-bold text-[#173329]'>Profile</h2>
                    <p className=' font-medium text-gray-500'>Your personal information</p>
                </div>

                <div className='flex justify-between '>

                    <div className='flex items-center gap-5 flex-1'>
                        <div className='w-30 h-30 rounded-full bg-[#264653] flex items-center 
                            justify-center text-white font-semibold text-6xl'>
                            {userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className='text-2xl font-bold text-[#264653]'>{userName}</p>
                            <p className='text-[16px] font-medium text-[#2b5261]'>{email}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-7 flex-1'>
                        <div className='flex flex-col gap-3 flex-1 '>
                            <label className='font-medium text-gray-900'>Full Name</label>
                            <input
                                className='border-2 rounded-lg py-2 px-4 font-medium bg-[#fffdfb]
                                border border-[#EDE6D8] outline-none focus:border-[#e8927c] transition-colors'
                                value={userName}
                            />
                        </div>
                        <div className='flex flex-col gap-3 flex-1'>
                            <label className='font-medium text-gray-900'>Email
                                <span className='text-sm ml-1 text-[#6f6f6f]'>(read only)</span>
                            </label>
                            <input
                                className='border-2 rounded-lg py-2 px-4 bg-[#F8F5F0] font-medium
                                border border-[#c1715d]'
                                value={email}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        className="bg-[#E76F51] text-white text-sm font-semibold px-5 py-3 rounded-lg 
                        hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                    >
                        {"Save changes"}
                    </button>
                </div>
            </div>

            {/* Account */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
                <div>
                    <h2 className="text-[22px] font-bold text-[#264653]">Account</h2>
                    <p className="text-base text-gray-600 mt-0.5">Manage your account</p>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-400">
                    <div>
                        <p className="text-base font-medium text-gray-800">Change password</p>
                        <p className="text-sm text-gray-500">We'll send a reset link to your email</p>
                    </div>
                    <button
                        className="border text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                        Send reset email
                    </button>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-400">
                    <div>
                        <p className="text-base font-medium text-gray-800">Delete all applications</p>
                        <p className="text-sm text-gray-500">Permanently removes all your application data</p>
                    </div>
                    <button
                        className="border border-orange-300 text-orange-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-50 transition cursor-pointer"
                    >
                        Clear all
                    </button>
                </div>

                <div className="flex justify-between items-center py-2">
                    <div>
                        <p className="text-base font-medium text-red-500">Delete account</p>
                        <p className="text-sm text-gray-500">Permanently deletes your account. Cannot be undone.</p>
                    </div>
                    <button
                        className="border border-red-300 text-red-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    >
                        Delete account
                    </button>
                </div>
            </div>
        </section>
    )
}