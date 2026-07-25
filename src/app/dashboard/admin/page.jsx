'use client';

import React from 'react';
import { Button } from '@heroui/react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { FiBriefcase, FiCalendar, FiDollarSign, FiDownload, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { BsFillBuildingFill } from 'react-icons/bs';

// --- Sample Data ---

const statsData = [
    {
        title: 'Total Users',
        value: '124,892',
        change: '+12%',
        isPositive: true,
        icon: FiUsers,
    },
    {
        title: 'Total Recruiters',
        value: '12,405',
        change: '+8%',
        isPositive: true,
        icon: FiBriefcase,
    },
    {
        title: 'Total Companies',
        value: '4,281',
        change: '+5%',
        isPositive: true,
        icon: BsFillBuildingFill,
    },
    {
        title: 'Jobs Posted',
        value: '8,920',
        change: '+18%',
        isPositive: true,
        icon: FiTrendingUp,
    },
    {
        title: 'Platform Revenue',
        value: '$245,800',
        change: '+24.5%',
        isPositive: true,
        icon: FiDollarSign,
    },
];

const barChartData = [
    { category: 'Engineering', count: 3200 },
    { category: 'Design', count: 2100 },
    { category: 'Marketing', count: 1800 },
    { category: 'Sales', count: 2900 },
    { category: 'Finance', count: 1200 },
];

const areaChartData = [
    { day: 'Day 1', users: 100 },
    { day: 'Day 5', users: 280 },
    { day: 'Day 10', users: 450 },
    { day: 'Day 15', users: 320 },
    { day: 'Day 20', users: 600 },
    { day: 'Day 25', users: 950 },
    { day: 'Day 30', users: 850 },
];

// --- Component ---

const AdminDashboardHome = () => {
    return (
        <div className="w-full min-h-screen bg-black text-zinc-100 p-6 space-y-6">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-xs text-zinc-400 mt-1">
                        Real-time platform performance and growth metrics.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition min-w-0 h-auto"
                    >
                        <FiCalendar className="w-3.5 h-3.5" />
                        Last 30 days
                    </Button>
                    <Button
                        size="sm"
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-900 bg-white rounded-lg hover:bg-zinc-200 transition min-w-0 h-auto"
                    >
                        <FiDownload className="w-3.5 h-3.5" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* 5 Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statsData.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={idx}
                            className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <span
                                    className={`text-xs font-semibold px-1.5 py-0.5 rounded ${stat.isPositive
                                        ? 'text-emerald-400 bg-emerald-500/10'
                                        : 'text-rose-400 bg-rose-500/10'
                                        }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-400">{stat.title}</p>
                                <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Analytics Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Job Posts by Category (Bar Chart) */}
                <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">Job Posts by Category</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                            <span className="text-xs text-zinc-400">Active Listings</span>
                        </div>
                    </div>

                    <div className="h-64 w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="category"
                                    stroke="#71717a"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        borderColor: '#27272a',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '12px',
                                    }}
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#52525b"
                                    radius={[4, 4, 0, 0]}
                                    hover={{ fill: '#71717a' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: New Users Area Chart */}
                <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">New Users (30d)</h3>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            +2,410
                        </span>
                    </div>

                    <div className="h-64 w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    stroke="#71717a"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        borderColor: '#27272a',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '12px',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#userGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardHome;