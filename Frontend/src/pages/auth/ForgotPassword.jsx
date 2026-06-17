import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword(){
    const [error, submitAction, isPending] = React.useActionState(
        async (previousState, formData) => {
            const email = formData.get('email');

            const res = await fetch("https://applyorbit.onrender.com/api/auth/forgot-password", {
                method: "POST",
                headers: { 'Content-Type': "application/json"},
                body: JSON.stringify({ email }),
            })

            const data = await res.json();

            if(!res.ok){
                return { error: data.message || "Something went wrong" };
            }

            return { success: "Password reset email sent! Check your inbox." };
        }, null
    );

    return (
        <div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-800 mb-0.5">
                Forgot Password</h1>
            <p className="text-[16px]">
                Enter your email and we'll send you a reset link.</p>

            <div className='mt-8 mb-4'>
                <form action={submitAction} className='flex flex-col'>
                    <label htmlFor='email' className='font-medium text-gray-800'>Email address</label>
                    <input type='email' id='email' name='email' placeholder='example@gmail.com' required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    {error?.error && (
                        <p className="text-center text-red-500 text-sm mt-3">{error.error}</p>
                    )}
                    {error?.success && (
                        <p className="text-center text-green-600 text-sm mt-3">{error.success}</p>
                    )}

                    <button type='submit' disabled={isPending}
                        className='border-0 rounded-[6px] text-[16px] font-medium text-white
                        cursor-pointer bg-[#284535] py-2 mt-5'
                    >
                        {isPending ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
            <p className='text-center'>Remember your password? <NavLink to="/auth/signin"
                className="font-bold text-[#3c6750]">Sign in.</NavLink></p>
        </div>
    )
    
}