import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();

    const [error, submitAction, isPending] = React.useActionState(
        async (previousData, formData) => {
            const email = formData.get('email')
            const userName = formData.get('username')
            const password = formData.get('password');

            const res = await fetch('https://applyorbit.onrender.com/api/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, email, password }),
            });

            const data = await res.json();


            if (!res.ok) {
                return data.message || "Sign up failed";
            }

            navigate('/auth/signin');  // redirect to login after signup
            return null;
        }, null
    )
    

    return (
        <div>
            {error === "success"
                ? <p className="text-green-600 text-sm">Check your email to verify your account!</p>
                : error && <p className="text-red-500 text-sm">{error}</p>
            }
            <h1
                className="font-['Playfair_Display'] text-3xl font-bold text-gray-800 mb-0.5"
            >
                Welcome</h1>
            <p
                className="text-[16px]"
            >
                Sign up to begin job search.</p>

            <div className='mt-8 mb-4'>
                <form action={submitAction} className='flex flex-col'>
                    <label htmlFor='email' className='font-medium text-gray-800'>Email address</label>
                    <input type='email' id='email' name='email' placeholder='example@gmail.com' required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    <label htmlFor='username' className='font-medium mt-4 text-gray-800'>Username</label>
                    <input type='text' id='username' name='username' placeholder='Shivani' required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    <label htmlFor="password" className='mt-4 font-medium  text-gray-800'>Password</label>
                    <input type='password' id='password' name='password' placeholder="••••••••" required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    <button type='submit'
                        className='border-0 rounded-[6px] text-[16px] font-medium text-white
                        cursor-pointer bg-[#284535] py-2 mt-5'
                    >Sign Up</button>
                </form>
            </div>
            <p className='text-center'>Already have an account?<NavLink to="/auth/signin"
                className="font-bold text-[#3c6750]"
            > Sign In.</NavLink></p>
        </div>
    )
}