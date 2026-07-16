"use client";


import { useEffect, useState } from "react";
import StatsSection from '@/components/dashboard/StatsSection';
import { useSession } from '@/lib/auth-client';
import { Avatar, Spinner } from '@heroui/react';
import React from 'react';
import {
    HiOutlineDocumentText,
    HiOutlineUsers,
    HiOutlineLightningBolt,
    HiOutlineCheckCircle,
} from "react-icons/hi";

const RecruiterDashboard = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Spinner size="xl" />
            </div>
        );
    }

    const user = session?.user;
    console.log("Session in the Recruiter Dashboard Home Page", session);


    const recruiterStats = [
        {
            title: "Total Job Posts",
            value: 48,
            icon: HiOutlineDocumentText,
        },
        {
            title: "Total Applicants",
            value: "1,284",
            icon: HiOutlineUsers,
        },
        {
            title: "Active Jobs",
            value: 18,
            icon: HiOutlineLightningBolt,
        },
        {
            title: "Jobs Closed",
            value: 32,
            icon: HiOutlineCheckCircle,
        },
    ];


    return (
        <div className='container w-11/12 mx-auto mt-4 mb-4'>
            <h1 className='text-3xl text-blue-600'>Welcome Back!</h1>
            <div className='flex flex-row items-center gap-2 mt-3 mb-8'>
                <Avatar>
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback>{user?.name?.charAt(0) ?? "U"}</Avatar.Fallback>
                </Avatar>
                <h1 className='text-purple-600 font-bold text-2xl'>{user?.name}</h1>
            </div>

            {/* Cards */}

            <div>
                <StatsSection stats={recruiterStats} />
            </div>

        </div>
    );
};

export default RecruiterDashboard;