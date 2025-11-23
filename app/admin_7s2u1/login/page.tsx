'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setLocalStorage } from '@/app/components/Helper';
import { useRouter } from 'next/navigation';

// The main component exported from the file, combining layout and page logic.
// We use 'App' as the main component name for standard React/Next.js environments.
export default function AdminLogin() {
    // State for subtle entrance animation
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        // Set isLoaded to true after mount to trigger the fade-in animation
        setIsLoaded(true);
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Required fields cannot be empty')
        }
        setLoading(true)
        try {
            const jsonBody = JSON.stringify({ email: username, password: password });
            const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL! + 'api/admin/login',
                jsonBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            if (res?.data?.id !== "") {
                toast.success('Login Successfull');
                const jsonRes = JSON.stringify(res?.data?.user)
                setLocalStorage('access-token', res?.data?.token);
                setLocalStorage('adminData', jsonRes);
                router.replace('/admin_e34ta')
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to login!!')
        } finally {
            setLoading(false);
        }
    };

    // Custom styles for the entrance animation using keyframes
    // This is a common pattern in single-file React apps where a global CSS file isn't available.
    const customStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0; /* Ensure initial state is hidden */
    }
    .backdrop-blur {
      backdrop-filter: blur(8px);
    }
  `;

    return (
        <>
            {/* Inject custom animation styles */}
            <style>{customStyles}</style>

            {/* Main Container - Full viewport height and elegant gradient background */}
            <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-900 via-gray-900 to-black font-inter">

                {/* Login Card Container - Applying the motion effect here */}
                <div
                    className={`
            w-full max-w-sm p-8 md:p-10
            bg-gray-800/60 backdrop-blur rounded-2xl shadow-2xl
            border border-gray-700/50
            transform transition-all duration-700
            ${isLoaded ? 'fade-in-up' : 'opacity-0'}
          `}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="text-center">
                            <Lock className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                Admin Portal
                            </h1>
                            <p className="text-gray-400 mt-1">Sign in to access the dashboard</p>
                        </div>

                        {/* Input Field: Username */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-3 pl-10 text-white bg-gray-700/80 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-400"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        {/* Input Field: Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 pl-10 text-white bg-gray-700/80 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-400"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-2
                         bg-linear-to-r from-blue-600 to-blue-700
                         text-white font-semibold rounded-lg shadow-lg
                         hover:from-blue-700 hover:to-blue-800
                         transition duration-300 ease-in-out
                         transform hover:scale-[1.01] active:scale-[0.99]
                         focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        >
                            {loading ?
                                <Loader2 rotate={360} />
                                : "Secure Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};