import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <>
                {children}

                {/*Overlay blocking*/}
                <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Sign in to continue</h2>
                        <p className="text-gray-500 text-sm mb-6">Create a free account to track your applications</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => navigate('/auth/signin')} className="px-4 py-2 bg-[#284535] text-white rounded-lg text-sm cursor-pointer">Sign In</button>
                            <button onClick={() => navigate('/auth/signup')} className="px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer">Sign Up</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return children;
}