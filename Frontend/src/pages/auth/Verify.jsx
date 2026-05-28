import React from 'react'
import Lottie from "lottie-react"
import { useNavigate } from 'react-router-dom'

export default function Verify() {
  const [status, setStatus] = React.useState('verifying');
  const navigate = useNavigate();

  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const error = params.get('error');
    const access_token = params.get('access_token');
    const type = params.get('type');

    if (error) {
      setStatus('error');  // handles expired/invalid links
      return;
    }

    if (access_token && type === 'signup') {
      localStorage.setItem('token', access_token);
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, []);

  return (
    <div>
      <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-800 mb-0.5">
        {status === 'verifying' && 'Verifying your email...'}
        {status === 'success' && 'Email Verified!'}
        {status === 'error' && 'Verification Failed'}
      </h1>

      {status === 'verifying' && (
        <p className="text-[16px] text-gray-500">Please wait a moment.</p>
      )}

      {status === 'success' && (
        <>
          <p className="text-[16px] text-gray-500 mb-8">Your account is ready. Sign in to get started.</p>
          <button
            onClick={() => navigate('/auth/signin')}
            className='w-full border-0 rounded-[6px] text-[16px] font-medium text-white cursor-pointer bg-[#284535] py-2'
          >
            Go to Sign In
          </button>
        </>
      )}

      {status === 'error' && (
        <p className="text-[16px] text-red-500">Link expired or invalid. Try signing up again.</p>
      )}
    </div>
  )
}