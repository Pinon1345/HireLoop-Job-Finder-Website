"use client";

import Image from "next/image";
import Link from "next/link";
import {
    HiMapPin,
    HiBriefcase,
    HiCurrencyDollar,
    HiClock,
    HiBuildingOffice2,
    HiArrowLeft
} from "react-icons/hi2";

export default function JobDetailsClient({ job }) {
    if (!job) {
        return (
            <div className="mx-auto max-w-4xl py-20 text-center text-zinc-400">
                <h2 className="text-2xl font-bold text-white">Job Not Found</h2>
                <p className="mt-2">The job position you are looking for does not exist or has expired.</p>
                <Link
                    href="/jobs"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                    <HiArrowLeft /> Back to Jobs
                </Link>
            </div>
        );
    }

    const handleApplyNow = () => {

        // Handle application logic (open modal, redirect to form, etc.)

        alert(`Applying for: ${job.jobTitle} at ${job.companyName}`);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 text-zinc-100">
            {/* Back Link */}
            <Link
                href="/jobs"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
                <HiArrowLeft /> Back to Jobs
            </Link>

            {/* Main Header Card */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                        {/* Company Logo / Placeholder */}
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-800 text-2xl font-bold text-sky-500">
                            {job.companyLogo ? (
                                <Image
                                    src={job.companyLogo}
                                    alt={job.companyName}
                                    height={300}
                                    width={300}
                                    className="h-full w-full object-cover" />
                            ) : (
                                job.companyName?.charAt(0) || "C"
                            )}
                        </div>

                        {/* Title & Metadata */}
                        <div>
                            <h1 className="text-2xl font-extrabold text-white md:text-3xl">
                                {job.jobTitle}
                            </h1>
                            <p className="mt-1 flex items-center gap-2 font-medium text-zinc-400">
                                <HiBuildingOffice2 className="text-sky-400" />
                                {job.companyName}
                            </p>

                            {/* Badges */}
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold">
                                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sky-400">
                                    {job.jobCategory}
                                </span>
                                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-400">
                                    {job.jobType}
                                </span>
                                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                                    {job.isRemote ? "Remote" : "On-site"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}

                    <div className="shrink-0 pt-4 md:pt-0">
                        <button
                            onClick={handleApplyNow}
                            className="w-full rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:translate-y-0 md:w-auto"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 md:grid-cols-4">
                    <div className="flex items-center gap-3">
                        <HiCurrencyDollar className="text-2xl text-emerald-400" />
                        <div>
                            <p className="text-xs text-zinc-400">Salary</p>
                            <p className="text-sm font-semibold text-white">
                                {job.minSalary} - {job.maxSalary} {job.currency}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <HiMapPin className="text-2xl text-sky-400" />
                        <div>
                            <p className="text-xs text-zinc-400">Location</p>
                            <p className="text-sm font-semibold text-white">{job.location}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <HiBriefcase className="text-2xl text-purple-400" />
                        <div>
                            <p className="text-xs text-zinc-400">Job Type</p>
                            <p className="text-sm font-semibold text-white">{job.jobType}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <HiClock className="text-2xl text-orange-400" />
                        <div>
                            <p className="text-xs text-zinc-400">Deadline</p>
                            <p className="text-sm font-semibold text-white">{job.deadline}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="mt-8 space-y-8">
                {/* Responsibilities */}
                {job.responsibilities && (
                    <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-8">
                        <h2 className="text-xl font-bold text-white">Key Responsibilities</h2>
                        <div className="mt-4 whitespace-pre-line leading-relaxed text-zinc-300">
                            {job.responsibilities}
                        </div>
                    </section>
                )}

                {/* Requirements */}
                {job.requirements && (
                    <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-8">
                        <h2 className="text-xl font-bold text-white">Requirements & Qualifications</h2>
                        <div className="mt-4 whitespace-pre-line leading-relaxed text-zinc-300">
                            {job.requirements}
                        </div>
                    </section>
                )}

                {/* Benefits */}
                {job.benefits && (
                    <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl md:p-8">
                        <h2 className="text-xl font-bold text-white">Benefits & Perks</h2>
                        <div className="mt-4 whitespace-pre-line leading-relaxed text-zinc-300">
                            {job.benefits}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}