"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
    return (
        <section className="min-h-screen bg-[#0F0F10] text-white flex items-center justify-center px-6">
            <div className="max-w-2xl text-center">

                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-extrabold bg-linear-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    404
                </h1>

                {/* Icon */}
                <div className="flex justify-center my-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600/15 flex items-center justify-center border border-blue-500/30">
                        <HiOutlineExclamationTriangle className="text-5xl text-blue-400" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-zinc-400 leading-7">
                    The page you are looking for does not exist, may have been
                    moved, or the URL might be incorrect.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

                    <Button
                        as={Link}
                        href="/"
                        startContent={<FaArrowLeft />}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        Back to Home
                    </Button>

                    <Button
                        as={Link}
                        href="/jobs"
                        variant="bordered"
                        startContent={<FaSearch />}
                        className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                        Browse Jobs
                    </Button>

                </div>

                {/* Footer Text */}
                <p className="mt-12 text-sm text-zinc-500">
                    HireLoop • Connecting Talent with Opportunity
                </p>

            </div>
        </section>
    );
} 