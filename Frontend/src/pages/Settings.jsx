import React from 'react'
import { AppContext } from "../context/AppContext";

export default function Settings() {
    const { setApps } = React.useContext(AppContext)

    const token = localStorage.getItem("token")
    console.log(token)
    const [fullName, setFullName] = React.useState(localStorage.getItem("userName") || "");
    const email = localStorage.getItem('email')
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    async function handleSaveProfile() {
        setLoading(true);
        try{
            const res = await fetch("/api/auth/update-profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ full_name: fullName })
            });
            if (!res.ok) {
                throw new Error("Failed to update profile")
            } 

            localStorage.setItem("userName", fullName)  
            setMessage("Profile updated!")

        }catch(error){
            console.error("Profile Update failed:", error);
            setMessage(error.message || "Something Went Wrong");
        }finally {
            setTimeout(() => setMessage(""), 4000);
            setLoading(false)
        }
    }

    async function handlChangePassword() {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });

            if (!res.ok) throw new Error("Failed to send reset email.");

            setMessage("Password reset email sent!");

        } catch (error) {
            console.error("reset failed:", error);
            setMessage(err.message || "Something went wrong.");
        } finally {
            setTimeout(() => setMessage(""), 4000);
            setLoading(false)
        }
    }

    async function handleDeleteApps() {
        setLoading(true);
        try {
            const res = await fetch("/api/applications", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error("Failed to delete.");

            setApps([]);
            setMessage("All applications deleted.");

        } catch (error) {
            console.error("Delete failed:", error);
            setMessage(error.message || "Network error. Please try again.");

        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    }

    async function handleDeleteAccount() {
        if (!confirm("Delete your account permanently? This cannot be undone.")) return;
        try {
            const res = await fetch("/api/auth/delete-account", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Failed to delete account.");
            }
            localStorage.clear();
            window.location.href = "/auth/signup";

        } catch (error) {
            console.error("Delete account failed:", error);
            setMessage(error.message || "Network error. Please try again.");
            setTimeout(() => setMessage(""), 3000);
        }
    }



    return (
        <section className='mt-25 px-8 flex flex-col gap-5'>

            {message && (
                <div className="fixed top-25 right-10 bg-[#264653] text-white text-sm px-4 py-2 rounded-xl shadow z-50">
                    {message}
                </div>
            )}

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
                            {fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className='text-2xl font-bold text-[#264653]'>{fullName}</p>
                            <p className='text-[16px] font-medium text-[#2b5261]'>{email}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-7 flex-1'>
                        <div className='flex flex-col gap-3 flex-1 '>
                            <label className='font-medium text-gray-900'>Full Name</label>
                            <input
                                className='border-2 rounded-lg py-2 px-4 font-medium bg-[#fffdfb]
                                border border-[#EDE6D8] outline-none focus:border-[#e8927c] transition-colors'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                        onClick={handleSaveProfile}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save changes"}
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
                    <div className="flex gap-2 justify-center items-center border text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 
                            transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                        class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 
                        0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                        <button
                            className='cursor-pointer'
                            onClick={handlChangePassword}
                            disabled={loading}
                        >
                            Send reset email
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-400">
                    <div>
                        <p className="text-base font-medium text-gray-800">Delete all applications</p>
                        <p className="text-sm text-gray-500">Permanently removes all your application data</p>
                    </div>
                    <div className=" flex gap-2 justify-center items-center border border-orange-300 text-orange-500 text-sm font-medium px-4 
                            py-2 rounded-lg hover:bg-orange-50 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide 
                        lucide-eraser-icon lucide-eraser"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/>
                        <path d="m5.082 11.09 8.828 8.828"/></svg>
                        <button
                            className='cursor-pointer'
                            onClick={handleDeleteApps}
                            disabled={loading}
                            >
                            Clear all
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center py-2">
                    <div>
                        <p className="text-base font-medium text-red-500">Delete account</p>
                        <p className="text-sm text-gray-500">Permanently deletes your account. Cannot be undone.</p>
                    </div>
                    <div className=" flex gap-2 justify-center items-center border border-red-300 text-red-500 text-sm font-medium px-4 py-2 
                            rounded-lg hover:bg-red-50 transition cursor-pointer"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                         class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 
                         2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        <button
                            className='cursor-pointer'
                            onClick={handleDeleteAccount}
                            disabled={loading}
                        >
                            Delete account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}