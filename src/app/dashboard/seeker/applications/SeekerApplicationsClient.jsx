'use client';

import React, { useSyncExternalStore } from 'react';
import { Table } from '@heroui/react';
import {
    FiSearch,
    FiBell,
    FiMail,
    FiDownload,
    FiExternalLink,
    FiBriefcase
} from 'react-icons/fi';

// Helper to check if component is mounted on client without useEffect setState
const emptySubscribe = () => () => { };
const useIsMounted = () => {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
};

// Time Function

const formatRelativeTime = (dateString) => {

    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 3600) {
        const mins = Math.max(1, Math.floor(diffInSeconds / 60));
        return `${mins} min${mins > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
};

export default function SeekerApplicationsClient({ jobs = [], user }) {

    const isMounted = useIsMounted();

    const totalApplied = jobs.length;
    const shortlistedCount = jobs.filter((j) => j.status?.toLowerCase() === 'shortlisted').length;
    const interviewsCount = jobs.filter((j) => j.status?.toLowerCase() === 'interview').length;
    const successRate = totalApplied > 0 ? Math.round((shortlistedCount / totalApplied) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#111215] text-zinc-100 p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Navbar Header */}

                <div className="flex items-center justify-between pb-4">
                    <div className="relative w-80">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="w-full bg-[#1A1C20] text-sm text-zinc-200 placeholder-zinc-500 rounded-lg pl-9 pr-4 py-2 border border-zinc-800 focus:outline-none focus:border-zinc-700"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg bg-[#1A1C20] border border-zinc-800">
                            <FiBell className="text-base" />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg bg-[#1A1C20] border border-zinc-800">
                            <FiMail className="text-base" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden border border-zinc-600 flex items-center justify-center font-semibold text-xs text-zinc-200">
                            {user?.name ? user.name.charAt(0) : 'M'}
                        </div>
                    </div>
                </div>

                {/* Header Action Row */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">My Applications</h1>
                        <p className="text-sm text-zinc-400 mt-2">
                            Track your job applications and interview progress in real-time.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#1A1C20] p-1 rounded-lg border border-zinc-800 flex text-xs font-medium">
                            <button className="px-4 py-1.5 rounded-md bg-zinc-800 text-white shadow-sm">
                                Active
                            </button>
                            <button className="px-4 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200">
                                Archived
                            </button>
                        </div>
                        <button className="flex items-center gap-2 bg-white text-zinc-950 font-medium text-xs px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors">
                            <FiDownload className="text-sm" />
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#16181D] border border-zinc-800/80 rounded-xl p-5">
                        <p className="text-xs font-medium text-zinc-400">Total Applied</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{totalApplied || 24}</h3>
                    </div>
                    <div className="bg-[#16181D] border border-zinc-800/80 rounded-xl p-5">
                        <p className="text-xs font-medium text-zinc-400">Shortlisted</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{shortlistedCount || 8}</h3>
                    </div>
                    <div className="bg-[#16181D] border border-zinc-800/80 rounded-xl p-5">
                        <p className="text-xs font-medium text-zinc-400">Interviews</p>
                        <h3 className="text-3xl font-bold text-amber-500 mt-2">{interviewsCount || 3}</h3>
                    </div>
                    <div className="bg-[#16181D] border border-zinc-800/80 rounded-xl p-5">
                        <p className="text-xs font-medium text-zinc-400">Success Rate</p>
                        <h3 className="text-3xl font-bold text-emerald-500 mt-2">{successRate || 12}%</h3>
                    </div>
                </div>

                {/* Table Container */}

                <div className="bg-[#16181D] border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
                    <Table className="w-full text-left">
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Job Applications Table">
                                <Table.Header>
                                    {/* Notice isRowHeader prop added below */}
                                    <Table.Column isRowHeader className="bg-[#1A1C20] text-zinc-400 font-medium text-xs py-3 px-5 border-b border-zinc-800">
                                        Job Title
                                    </Table.Column>
                                    <Table.Column className="bg-[#1A1C20] text-zinc-400 font-medium text-xs py-3 px-5 border-b border-zinc-800">
                                        Company / Info
                                    </Table.Column>
                                    <Table.Column className="bg-[#1A1C20] text-zinc-400 font-medium text-xs py-3 px-5 border-b border-zinc-800">
                                        Applied
                                    </Table.Column>
                                    <Table.Column className="bg-[#1A1C20] text-zinc-400 font-medium text-xs py-3 px-5 border-b border-zinc-800">
                                        Status
                                    </Table.Column>
                                    <Table.Column className="bg-[#1A1C20] text-zinc-400 font-medium text-xs py-3 px-5 border-b border-zinc-800 text-right">
                                        Action
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                
                                    {jobs.length === 0 ? (
                                        <Table.Row className="border-b border-zinc-800/50">
                                            <Table.Cell colSpan={5} className="py-8 text-center text-zinc-500 text-xs">
                                                No applications found.
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        jobs.map((item, idx) => {
                                            const status = item.status || 'Applied';
                                            let statusStyle = 'border-zinc-600 text-zinc-300 bg-zinc-800/30';

                                            if (status.toLowerCase() === 'review') {
                                                statusStyle = 'border-amber-500/50 text-amber-400 bg-amber-500/10';
                                            } else if (status.toLowerCase() === 'shortlisted') {
                                                statusStyle = 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10';
                                            } else if (status.toLowerCase() === 'rejected') {
                                                statusStyle = 'border-rose-500/50 text-rose-400 bg-rose-500/10';
                                            } else if (status.toLowerCase() === 'offered') {
                                                statusStyle = 'border-blue-500/50 text-blue-400 bg-blue-500/10';
                                            }

                                            return (
                                                <Table.Row key={item._id?.$oid || item._id || idx} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                                                    <Table.Cell className="py-4 px-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
                                                                <FiBriefcase className="text-base" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-semibold text-zinc-100">
                                                                    {item.jobTitle || 'N/A'}
                                                                </h4>
                                                                <p className="text-xs text-zinc-500 mt-0.5">
                                                                    {item.expectedSalary ? `Salary: ${item.expectedSalary}` : 'Full-time • Remote'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell className="py-4 px-5 text-sm text-zinc-300">
                                                        <div>
                                                            <p className="font-medium text-xs text-zinc-200">
                                                                {item.companyName || item.applicantName || 'Company Inc.'}
                                                            </p>
                                                            {item.portfolioUrl && (
                                                                <a
                                                                    href={item.portfolioUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors mt-0.5"
                                                                >
                                                                    Portfolio <FiExternalLink className="text-[10px]" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell className="py-4 px-5 text-xs text-zinc-400">
                                                        {isMounted ? formatRelativeTime(item.appliedAt || item.createdAt?.$date) : 'Recently'}
                                                    </Table.Cell>

                                                    <Table.Cell className="py-4 px-5">
                                                        <span className={`inline-block px-3 py-0.5 text-xs font-medium rounded-full border ${statusStyle}`}>
                                                            {status}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell className="py-4 px-5 text-right">
                                                        <a
                                                            href={item.resumeLink || '#'}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-xs text-zinc-400 hover:text-white transition-colors font-medium inline-block"
                                                        >
                                                            Details
                                                        </a>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    )}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>

                        <Table.Footer>
                            <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800 text-xs text-zinc-500 bg-[#16181D]">
                                <span>
                                    Showing {jobs.length > 0 ? `1-${jobs.length}` : 0} of {jobs.length} applications
                                </span>
                                <div className="flex items-center gap-2">
                                    <button className="px-2 py-1 rounded border border-zinc-800 text-zinc-400 hover:bg-zinc-800">
                                        &lt;
                                    </button>
                                    <button className="w-6 h-6 rounded bg-white text-black font-semibold flex items-center justify-center">
                                        1
                                    </button>
                                    <button className="w-6 h-6 rounded hover:bg-zinc-800 text-zinc-400 flex items-center justify-center">
                                        2
                                    </button>
                                    <button className="w-6 h-6 rounded hover:bg-zinc-800 text-zinc-400 flex items-center justify-center">
                                        3
                                    </button>
                                    <button className="px-2 py-1 rounded border border-zinc-800 text-zinc-400 hover:bg-zinc-800">
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </Table.Footer>
                    </Table>
                </div>

            </div>
        </div>
    );
}