import React from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export default function Header() {
    const navigate = useNavigate();
    const { setApps } = React.useContext(AppContext)
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const userName = localStorage.getItem('userName')
    

    const handleSignOut = async (e) => {
        e.preventDefault()

        await fetch("http://localhost:8000/api/auth/signOut", {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setApps([])
        navigate('/auth/signin');
    }

    return (
        <navbar class="px-8 flex fixed top-0 right-0 left-0 z-50 justify-between items-center h-16 bg-[#FDFBF7] shadow-2xs">
            <Link class="font-bold text-2xl font-['Playfair_Display'] text-[#264653]" to="/">ApplyOrbit</Link>
            <div class="flex gap-7 items-center">
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
                    to="/resume-tailor"
                    className={({ isActive }) =>
                        `border-b-2 cursor-pointer transition-all duration-300 text-[#779082] text-[15px] font-semibold
                        ${isActive ? "text-[#d9692c] text-[16px] border-[#d9692c]"
                            : "border-transparent hover:text-[#C67346] hover:scale-101"}`
                    }
                >Resume Tailor</NavLink>

                <div className='relative' ref={dropdownRef}>
                    {/* Avatar button */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className='cursor-pointer'
                    >
                        <div className='w-9 h-9 rounded-full bg-[#344E41] flex items-center justify-center text-white font-semibold text-sm'>
                            {userName?.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className='absolute right-0 top-12 w-[220px] bg-[#FDFBF7] rounded-xl shadow-lg border border-gray-200 z-50 py-2'>

                            {/* Profile info */}
                            <div className='px-4 py-3 border-b border-gray-300'>
                                <p className='font-semibold text-gray-800 text-sm'>{userName}</p>
                                <p className='text-xs text-gray-400'>{localStorage.getItem('email')}</p>
                            </div>

                            {/* Menu items */}
                            <div className='py-1'>
                                <div
                                    onClick={() => navigate('/dashboard')}
                                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-sm text-gray-700'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                    Dashboard
                                </div>

                                <div
                                    onClick={() => navigate('/applications')}
                                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-sm text-gray-700'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                                    Applications
                                </div>

                                <div
                                    onClick={() => navigate('/settings')}
                                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-sm text-gray-700'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                    Settings
                                </div>
                            </div>

                            {/* Sign out */}
                            <div className='border-t border-gray-100 mt-1'>
                                <div
                                    onClick={handleSignOut}
                                    className='flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 cursor-pointer text-sm text-red-500'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    Sign Out
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </navbar>
    )
}
