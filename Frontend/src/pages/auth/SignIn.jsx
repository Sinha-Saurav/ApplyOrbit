import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

export default function SignIn(){
    const navigate = useNavigate();

        const [error, submitAction, isPending] = React.useActionState(
            async(previousState, formData) => {
                const email = formData.get('email');
                const password = formData.get('password');

                const res = await fetch("http://localhost:8000/api/auth/login", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password}),
                })

                const data = await res.json();

                if (!res.ok) {
                    return data.message || "Invalid credentials"; 
                }

                if(data.token){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('email', data.email)
                    navigate('/dashboard');
                }
                return null;
            }, null
        );

    return (
        <div>
            <h1 
                className="font-['Playfair_Display'] text-3xl font-bold text-gray-800 mb-0.5"
            >
                Welcome back</h1>
            <p 
                className="text-[16px]"
            >
                Sign in to continue job search.</p>

            <div className='mt-8 mb-4'>
                <form 
                    action={submitAction} 
                    className='flex flex-col'
                >
                    <label htmlFor='email' className='font-medium text-gray-800'>Email address</label>
                    <input type='email' id='email' name='email' placeholder='example@gmail.com' required 
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    <label htmlFor="password" className='mt-4 font-medium  text-gray-800'>Password</label>
                    <input type='password' id='password' name='password' placeholder="••••••••" required 
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />
                    
                    <NavLink className="text-end mt-2 mb-5 underline text-[#284535]">Forgot password?</NavLink>

                    {error && (
                        <p className=" text-center text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <button type='submit' disabled={isPending}
                        className='border-0 rounded-[6px] text-[16px] font-medium text-white
                        cursor-pointer bg-[#284535] py-2'
                    >
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
            <p className='text-center'>Don't have an account?<NavLink to="/auth/signup"
                className="font-bold text-[#3c6750]"
                > Sign up.</NavLink></p>
        </div>
    )
}