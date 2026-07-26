'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { FiShieldOff, FiArrowLeft, FiHome } from 'react-icons/fi';

const ForbiddenPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full bg-black text-zinc-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-sm">

                {/* Icon & Status Code */}
                <div className="relative flex items-center justify-center">
                    {/* Subtle Glow Effect */}
                    <div className="absolute w-24 h-24 bg-rose-500/10 rounded-full blur-xl" />

                    <div className="relative p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-rose-500 shadow-inner">
                        <FiShieldOff className="w-12 h-12" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
                        Error 403
                    </span>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Access Denied
                    </h1>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        You don’t have permission to access this page. Please contact your administrator if you believe this is a mistake.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                        size="sm"
                        onPress={() => router.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition min-w-0 h-9"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>

                    <Button
                        size="sm"
                        onPress={() => router.push('/dashboard/admin')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-zinc-900 bg-white rounded-lg hover:bg-zinc-200 transition min-w-0 h-9"
                    >
                        <FiHome className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ForbiddenPage;