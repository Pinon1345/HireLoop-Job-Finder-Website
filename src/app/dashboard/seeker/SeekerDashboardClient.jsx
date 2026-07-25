'use client';

import React, { useSyncExternalStore } from 'react';
import {
    FiSearch,
    FiMail,
    FiBell,
    FiBookmark,
    FiSend,
    FiCalendar,
    FiAward,
    FiUser,
    FiPlus,
    FiRefreshCw,
    FiVolume2
} from 'react-icons/fi';

// Custom hook to safely handle client mounting without hydration errors or extra state renders
const emptySubscribe = () => () => { };
const useIsMounted = () => {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
};

export default function SeekerDashboardClient({ user, applications = [] }) {
    const isMounted = useIsMounted();

    // Metrics dynamic calculation (with default mock fallbacks for missing data)
    const totalApplied = applications.length || 0;
    const savedJobsCount = 12;
    const interviewsCount = applications.filter((a) => a.status?.toLowerCase() === 'interview').length || 3;
    const offersCount = applications.filter((a) => a.status?.toLowerCase() === 'offered').length || 1;

    // Application status breakdown
    const statusCounts = {
        applied: applications.filter((a) => !a.status || a.status.toLowerCase() === 'applied').length || 0,
        underReview: applications.filter((a) => a.status?.toLowerCase() === 'review').length || 6,
        shortlisted: applications.filter((a) => a.status?.toLowerCase() === 'shortlisted').length || 5,
        rejected: applications.filter((a) => a.status?.toLowerCase() === 'rejected').length || 2,
        offered: applications.filter((a) => a.status?.toLowerCase() === 'offered').length || 1,
    };

    const totalStatusCount = Object.values(statusCounts).reduce((a, b) => a + b, 0) || 1;

    return (
        <div className="min-h-screen bg-[#111215] text-zinc-100 p-6 font-sans">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Top Header / Search Navbar */}
                <div className="flex items-center justify-between pb-2">
                    <div className="relative w-80">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                        <input
                            type="text"
                            placeholder="Search for opportunities..."
                            className="w-full bg-[#181A1F] text-xs text-zinc-200 placeholder-zinc-500 rounded-lg pl-9 pr-4 py-2 border border-zinc-800/80 focus:outline-none focus:border-zinc-700"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-zinc-400 hover:text-zinc-200 rounded-lg bg-[#181A1F] border border-zinc-800/80">
                            <FiMail className="text-sm" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                        </button>
                        <button className="relative p-2 text-zinc-400 hover:text-zinc-200 rounded-lg bg-[#181A1F] border border-zinc-800/80">
                            <FiBell className="text-sm" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden border border-zinc-600 flex items-center justify-center font-semibold text-xs text-zinc-200">
                            {user?.name ? user.name.charAt(0) : 'A'}
                        </div>
                    </div>
                </div>

                {/* Key Metric Stats (Top 4 Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Saved Jobs */}
                    <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-5 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium text-zinc-400">Saved Jobs</p>
                            <h3 className="text-3xl font-bold text-white mt-3">{savedJobsCount}</h3>
                        </div>
                        <div className="p-2 text-zinc-300">
                            <FiBookmark className="text-base" />
                        </div>
                    </div>

                    {/* Applications Submitted */}
                    <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-5 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium text-zinc-400 leading-tight">
                                Applications<br />Submitted
                            </p>
                            <h3 className="text-3xl font-bold text-white mt-1">{totalApplied}</h3>
                        </div>
                        <div className="p-2 text-zinc-300">
                            <FiSend className="text-base" />
                        </div>
                    </div>

                    {/* Interviews Scheduled */}
                    <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-5 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium text-zinc-400 leading-tight">
                                Interviews<br />Scheduled
                            </p>
                            <h3 className="text-3xl font-bold text-white mt-1">{interviewsCount}</h3>
                        </div>
                        <div className="p-2 text-amber-500">
                            <FiCalendar className="text-base" />
                        </div>
                    </div>

                    {/* Offers Received */}
                    <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-5 flex justify-between items-start">
                        <div>
                            <p className="text-xs font-medium text-zinc-400">Offers Received</p>
                            <h3 className="text-3xl font-bold text-white mt-3">{offersCount}</h3>
                        </div>
                        <div className="p-2 text-emerald-500">
                            <FiAward className="text-base" />
                        </div>
                    </div>

                </div>

                {/* Profile Card & Application Status Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                    {/* User Profile Card */}
                    <div className="lg:col-span-5 bg-[#181A1F] border border-zinc-800/70 rounded-xl p-6 flex flex-col justify-between">
                        <div className="flex flex-col items-center text-center pt-2">
                            <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-3">
                                <FiUser className="text-2xl" />
                            </div>
                            <h2 className="text-lg font-bold text-white">
                                {user?.name || 'Alex Rivera'}
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1">
                                {user?.email || 'alex.rivera@example.com'}
                            </p>
                        </div>

                        <button className="w-full mt-8 py-2.5 px-4 rounded-lg border border-zinc-700/80 bg-transparent hover:bg-zinc-800/50 text-xs font-medium text-zinc-200 transition-colors">
                            Edit Profile
                        </button>
                    </div>

                    {/* Application Status Progress Bars */}
                    <div className="lg:col-span-7 bg-[#181A1F] border border-zinc-800/70 rounded-xl p-6">
                        <h3 className="text-sm font-semibold text-white mb-5">Application Status</h3>

                        <div className="space-y-4">

                            {/* Applied */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-zinc-400">Applied</span>
                                    <span className="font-semibold text-zinc-200">{statusCounts.applied}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{ width: `${(statusCounts.applied / totalStatusCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Under Review */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-zinc-400">Under Review</span>
                                    <span className="font-semibold text-zinc-200">{statusCounts.underReview}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${(statusCounts.underReview / totalStatusCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Shortlisted */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-zinc-400">Shortlisted</span>
                                    <span className="font-semibold text-zinc-200">{statusCounts.shortlisted}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(statusCounts.shortlisted / totalStatusCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Rejected */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-zinc-400">Rejected</span>
                                    <span className="font-semibold text-zinc-200">{statusCounts.rejected}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-rose-500 rounded-full"
                                        style={{ width: `${(statusCounts.rejected / totalStatusCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Offered */}
                            <div>
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="text-zinc-400">Offered</span>
                                    <span className="font-semibold text-zinc-200">{statusCounts.offered}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${(statusCounts.offered / totalStatusCount) * 100}%` }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Recent Activity Section */}
                <div className="pt-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-white">Recent Activity</h3>
                        <button className="text-xs text-zinc-400 hover:text-zinc-200 underline transition-colors">
                            View All Activity
                        </button>
                    </div>

                    <div className="space-y-3">

                        {/* Activity Item 1 */}
                        <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-zinc-800/90 flex items-center justify-center text-zinc-300 shrink-0">
                                    <FiRefreshCw className="text-sm" />
                                </div>
                                <p className="text-xs text-zinc-300">
                                    Application for Senior Product Designer at <span className="font-semibold text-zinc-200">TechFlow</span> updated to <span className="text-amber-400 underline underline-offset-2">Under Review</span>
                                </p>
                            </div>
                            <span className="text-xs text-zinc-500 shrink-0 pl-2">2 hours ago</span>
                        </div>

                        {/* Activity Item 2 */}
                        <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-zinc-800/90 flex items-center justify-center text-emerald-500 shrink-0">
                                    <FiVolume2 className="text-sm" />
                                </div>
                                <p className="text-xs text-zinc-300">
                                    New Job Alert: Lead Frontend Engineer at <span className="font-semibold text-zinc-200">FinGrid</span> matches your profile.
                                </p>
                            </div>
                            <span className="text-xs text-zinc-500 shrink-0 pl-2">5 hours ago</span>
                        </div>

                        {/* Activity Item 3 */}
                        <div className="bg-[#181A1F] border border-zinc-800/70 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                                <div className="w-9 h-9 rounded-lg bg-zinc-800/90 flex items-center justify-center text-zinc-300 shrink-0">
                                    <FiMail className="text-sm" />
                                </div>
                                <p className="text-xs text-zinc-300">
                                    You have a new message from <span className="font-semibold text-zinc-200">Sarah Jenkins</span> (Hiring Manager at CloudOps).
                                </p>
                            </div>
                            <span className="text-xs text-zinc-500 shrink-0 pl-2">1 day ago</span>
                        </div>

                    </div>
                </div>

            </div>

            {/* Floating Action Button */}
            <button
                aria-label="Create application"
                className="fixed bottom-6 right-6 w-11 h-11 bg-white text-zinc-950 rounded-full shadow-2xl flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95"
            >
                <FiPlus className="text-xl" />
            </button>
        </div>
    );
}