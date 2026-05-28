import React from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const handleSignOut = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/api/auth/signOut", {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/auth/signin');
    }

    return (
        <navbar class="px-8 flex justify-between items-center h-16 bg-[#FDFBF7] shadow-2xs">
            <div className='flex gap-10'>
                <Link class="font-bold text-2xl font-['Playfair_Display'] text-[#344E41]" to="/">ApplyOrbit</Link>
                <div class="flex gap-5 items-center">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `border-b-2 cursor-pointer transition-all duration-300 text-[#779082] text-[15px] font-semibold
                        ${isActive ? "text-[#d9692c] text-[16px] border-[#d9692c]" 
                            : "border-transparent hover:text-[#C67346] hover:scale-101 "}`
                        }
                        >Dashboard</NavLink>
                    <NavLink
                        to="/applications"
                        className={({ isActive }) =>
                            `border-b-2 cursor-pointer transition-all duration-300 text-[#779082] text-[15px] font-semibold
                        ${isActive ? "text-[#d9692c] text-[16px] border-[#d9692c]" 
                            : "border-transparent hover:text-[#C67346] hover:scale-101"}`
                        }
                        >Applications</NavLink>
                    <NavLink
                        to="/application"
                        className={({ isActive }) =>
                            `border-b-2 cursor-pointer transition-all duration-300 text-[#779082] text-[15px] font-semibold
                        ${isActive ? "text-[#d9692c] text-[16px] border-[#d9692c]" 
                            : "border-transparent hover:text-[#C67346] hover:scale-101"}`
                        }
                        >Resume Tailor</NavLink>
                </div>
            </div>
            <div className='flex'>
                <button
                    onClick={handleSignOut}
                    className='px-3 py-1.5 rounded-3xl transition-colors font-semibold text-[14px] cursor-pointer'
                    >
                    Log out
                </button>
                <div class="flex gap-2 items-center">
                    <div class="w-10 h-10 rounded-full bg-blue-500"></div>
                    <NavLink>Saurav</NavLink>
                </div>
                </div>
        </navbar>
    )
}
