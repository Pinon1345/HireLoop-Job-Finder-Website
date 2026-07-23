import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { FaHandPointDown, FaBriefcase, FaCrown, FaExclamationTriangle } from 'react-icons/fa';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';
import { getUserByEmail } from "@/lib/api/users";

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const sessionUser = await getUserSession();

    if (!sessionUser) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    const user = await getUserByEmail(sessionUser.email);

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // Non-seeker Warning Card

    if (user.role !== 'seeker') {
        return (
            <div className="container max-w-2xl mx-auto my-16 px-6">
                <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl shadow-blue-900/20">
                    <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-500">
                        <FaExclamationTriangle className="w-8 h-8" />
                    </div>
                    <p className="text-zinc-100 font-bold text-2xl">
                        Only Job Seekers Can Apply For This Position
                    </p>
                    <p className="text-zinc-400 font-medium text-base max-w-md">
                        Please sign in with a candidate/seeker account to proceed with your job application.
                    </p>
                    <div className="pt-2">
                        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-800/50">
                            Thank You!
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(user?._id);

    const plan = await getPlanById(user?.plan || "seeker_free");

    const job = await getJobById(id);

    const appliedCount = applications?.length || 0;
    const maxLimit = plan.maxApplicationsPerMonth;
    const isLimitReached = appliedCount >= maxLimit;
    const progressPercent = Math.min((appliedCount / maxLimit) * 100, 100);

    return (
        <div className="min-h-[80vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto w-full space-y-8">

                {/* Top Header Card / Application Tracker */}

                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-blue-950/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                                Application Limit
                            </span>
                            <h2 className="text-xl font-semibold text-zinc-200">
                                Hey, <span className="text-white">{user?.name || 'There'}</span>! 👋
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 bg-zinc-800/80 border border-zinc-700/50 px-4 py-2 rounded-xl">
                            <FaBriefcase className="text-blue-500 w-4 h-4" />
                            <span className="text-sm font-medium text-zinc-300">
                                Applied: <strong className="text-blue-500 text-base">{appliedCount}</strong> / {maxLimit}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}

                    <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-zinc-700/30">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isLimitReached ? 'bg-amber-500' : 'bg-linear-to-r from-blue-600 to-indigo-500'
                                }`}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                        You are currently on the <span className="font-semibold text-zinc-200">{plan.name} Plan</span> ({maxLimit} applications/month).
                    </p>
                </div>

                {/* Main Application Section */}

                <div className="text-center space-y-4">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
                        Apply for <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">{job?.jobTitle || 'Position'}</span>
                    </h1>

                    {job?.company && (
                        <p className="text-zinc-400 text-sm font-medium">
                            at <span className="text-zinc-200 font-semibold">{job.company}</span>
                        </p>
                    )}

                    <div className="flex items-center justify-center pt-2 mt-4">
                        <div className="p-3 bg-blue-600/10 rounded-full border border-blue-500/20 text-blue-500 animate-bounce">
                            <FaHandPointDown className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering: Reached Limit vs Apply Button */}

                {isLimitReached ? (
                    <div className="bg-linear-to-b from-amber-950/20 to-zinc-900 border border-amber-500/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
                        <div className="inline-flex p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-500">
                            <FaCrown className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-100">
                            Monthly Limit Reached
                        </h3>
                        <p className="text-zinc-300 text-sm max-w-md mx-auto">
                            You’ve used all <strong className="text-amber-400">{maxLimit} applications</strong> included in your free monthly allowance. Upgrade your plan to unlock unlimited job applications.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/pricing"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                            >
                                View Upgrade Plans
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <JobApply applicant={user} job={job} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyPage;