import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';

export default function ResetPassword(){
    const navigate = useNavigate();

    const [error, submitAction, isPending] = React.useActionState(
        async(previousState, formData) => {
            const password = formData.get('password');
            const confirm = formData.get('confirm');

            if(password !== confirm){
                return {error: "Passwords do not match"};
            }

            const {error} = await supabase.auth.updateUser({password});

            if(error){
                return { error: error.message};
            }

            return { success: true };
        },null
    );

    React.useEffect(()=>{
        if(error?.success){
            setTimeout(() => navigate('/auth/signin'), 2000);
        }
    },[error])

    return(
        <div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-800 mb-0.5"
                >Reset Password</h1>
            <p className="text-[16px]">Enter your new password below.</p>

            <div className='mt-8 mb-4'>
                <form action={submitAction} className='flex flex-col'>
                    <label htmlFor='password' className='font-medium text-gray-800'>New Password</label>
                    <input name='password' id='password' placeholder='••••••••' required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    <label htmlFor='confirm' className='mt-4 font-medium text-gray-800'>Confirm Password</label>
                    <input name='confirm' id='confirm' type='password' placeholder="••••••••" required
                        className='border-2 border-gray-400 rounded-md px-3 py-2
                        text-sm focus:border-[#284535] outline-none'
                    />

                    {error?.error && (
                        <p className="text-center text-red-500 text-sm mt-3">{error.error}</p>
                    )}
                    {error?.success && (
                        <p className="text-center text-green-600 text-sm mt-3">Password updated! Redirecting...</p>
                    )}

                    <button className='border-0 rounded-[6px] text-[16px] font-medium text-white
                        cursor-pointer bg-[#284535] py-2 mt-5'>
                        {isPending? 'Updating...': 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}