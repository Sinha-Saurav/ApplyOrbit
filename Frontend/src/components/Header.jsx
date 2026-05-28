import React from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'

export default function Header(){
    const navigate = useNavigate();
    const handleSignOut = async(e)=>{
        e.preventDefault()

        await fetch("http://localhost:8000/api/auth/signOut",{
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/auth/signin');
    }

    return(
        <navbar class="px-8 flex justify-between items-center h-14 border-b-2 border-b-[#d9dffa]">
            <Link class="font-bold text-2xl text-[#2563eb]" to="/">ApplyOrbit</Link>
            <div class="flex gap-5 items-center">
                <NavLink
                    to="/dashboard"
                    className={({isActive})=>
                        `px-3 py-1.5 rounded-3xl transition-colors font-semibold text-[14px]
                        ${isActive ? "bg-blue-500/20 text-blue-600" : "hover:bg-blue-500/20"}`
                    }
                >Dashboard</NavLink>
                <NavLink
                    to="/applications"
                    className={({isActive})=>
                        `px-3 py-1.5 rounded-3xl transition-colors font-semibold text-[14px]
                        ${isActive ? "bg-blue-500/20 text-blue-600" : "hover:bg-blue-500/20"}`
                    }
                >Applications</NavLink>
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
