"use client";

import { ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import { LuShieldAlert } from "react-icons/lu";

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-12 text-center">
            {/* Icon Badge */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-8 ring-red-500/5">
                <LuShieldAlert className="h-10 w-10" />
            </div>

            {/* Status Code & Main Title */}
            <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
                403 - Access Denied
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                Unauthorized Access
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-md text-base text-zinc-600 dark:text-zinc-400">
                Oops! You don’t have permission to view this page. Please sign in with an authorized account or head back to safety.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                    href="/auth/signin"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
                >
                    <BiLogIn className="h-4 w-4" />
                    Sign In
                </Link>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition duration-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}