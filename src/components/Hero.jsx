"use client";

import Image from "next/image";
import { HiBriefcase } from "react-icons/hi2";
import CountUp from "react-countup";
import {
    HiBuildingOffice2,
    HiUsers,
    HiStar,
} from "react-icons/hi2";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">

                <Image
                    src="/assets/images/globe.png"
                    alt="HireLoop Hero Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center animate-globe opacity-30 blur-[2px]"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/30"></div>

            </div>

            {/* Decorative Glow */}
            <div className="absolute left-20 top-32 h-72 w-72 rounded-full bg-sky-500/10 blur-[150px]" />

            <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[150px]" />

            {/* Small Dots */}
            <div className="absolute inset-0 opacity-25">

                <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-sky-400"></div>
                <div className="absolute left-[35%] top-[70%] h-1 w-1 rounded-full bg-sky-400"></div>
                <div className="absolute left-[65%] top-[15%] h-1 w-1 rounded-full bg-sky-400"></div>
                <div className="absolute left-[85%] top-[55%] h-1 w-1 rounded-full bg-sky-400"></div>

                <div className="absolute left-[20%] top-[50%] h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                <div className="absolute left-[55%] top-[80%] h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                <div className="absolute left-[75%] top-[35%] h-1.5 w-1.5 rounded-full bg-indigo-400"></div>

            </div>

            {/* Content */}

            <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">

                {/* Announcement Badge */}

                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl mt-8">

                    <div className="rounded-full bg-orange-500/20 p-2">

                        <HiBriefcase className="text-orange-400" />

                    </div>

                    <p className="text-sm font-semibold tracking-wider text-white">

                        <span className="text-orange-400">50,000+</span>

                        <span className="mx-2 text-slate-500">|</span>

                        NEW JOBS AVAILABLE

                    </p>

                </div>

                {/* Heading */}

                <h1 className="mt-10 max-w-5xl text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">

                    Find Your

                    <span className="block bg-linear-to-r from-sky-400 via-blue-500 to-orange-400 bg-clip-text text-transparent">

                        Dream Job Today

                    </span>

                </h1>

                {/* Description */}

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">

                    HireLoop connects talented professionals with trusted companies.

                    Discover thousands of verified job opportunities, connect with

                    recruiters, and take the next step toward your dream career.

                </p>

                {/* Search Bar will start here in Part 2 */}
                {/* Search Box */}

                <div className="mt-14 w-full max-w-5xl">

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl shadow-2xl shadow-black/30">

                        <div className="flex flex-col gap-3 lg:flex-row">

                            {/* Job Title */}

                            <div className="flex flex-1 items-center rounded-2xl border border-white/5 bg-white/5 px-5 py-4">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-4 h-6 w-6 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-4.3-4.3m0 0A7.5 7.5 0 105.4 5.4a7.5 7.5 0 0011.3 11.3z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Job title, keyword or company"
                                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                                />

                            </div>

                            {/* Location */}

                            <div className="flex flex-1 items-center rounded-2xl border border-white/5 bg-white/5 px-5 py-4">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-4 h-6 w-6 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                                />

                            </div>

                            {/* Search Button */}

                            <button
                                className="rounded-2xl bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/30"
                            >
                                Search Jobs
                            </button>

                        </div>

                    </div>

                </div>

                {/* Trending */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

                    <span className="text-sm text-slate-400">
                        Trending:
                    </span>

                    {[
                        "Frontend",
                        "Backend",
                        "React",
                        "Next.js",
                        "Remote",
                        "UI/UX",
                        "Marketing",
                        "Full Stack",
                    ].map((item) => (
                        <button
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300"
                        >
                            {item}
                        </button>
                    ))}

                </div>

                {/* Statistics will start in Part 3 */}


                {/* Statistics */}

                <div className="relative mt-24 w-full max-w-7xl">

                    {/* Heading */}

                    <div className="mb-16 text-center">

                        <h2 className="text-3xl font-semibold leading-relaxed text-white md:text-5xl">

                            Assisting over{" "}

                            <span className="text-sky-400">
                                15,000
                            </span>{" "}

                            job seekers

                            <br />

                            find their dream positions.

                        </h2>

                    </div>

                    {/* Cards */}

                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 md:mx-4">

                        {/* Card */}

                        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:bg-white/10">

                            <HiBriefcase className="mb-10 text-2xl text-slate-400 transition group-hover:text-sky-400" />

                            <h2 className="text-5xl font-black text-white">

                                <CountUp
                                    end={50}
                                    duration={3}
                                    enableScrollSpy
                                />

                                K

                            </h2>

                            <p className="mt-3 text-slate-400">

                                Active Jobs

                            </p>

                        </div>

                        {/* Card */}

                        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:bg-white/10">

                            <HiBuildingOffice2 className="mb-10 text-2xl text-slate-400 transition group-hover:text-sky-400" />

                            <h2 className="text-5xl font-black text-white">

                                <CountUp
                                    end={12}
                                    duration={2.5}
                                    enableScrollSpy
                                />

                                K

                            </h2>

                            <p className="mt-3 text-slate-400">

                                Companies

                            </p>

                        </div>

                        {/* Card */}

                        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:bg-white/10">

                            <HiUsers className="mb-10 text-2xl text-slate-400 transition group-hover:text-sky-400" />

                            <h2 className="text-5xl font-black text-white">

                                <CountUp
                                    end={2}
                                    duration={2.5}
                                    decimals={0}
                                    enableScrollSpy
                                />

                                M

                            </h2>

                            <p className="mt-3 text-slate-400">

                                Job Seekers

                            </p>

                        </div>

                        {/* Card */}

                        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/30 hover:bg-white/10">

                            <HiStar className="mb-10 text-2xl text-slate-400 transition group-hover:text-orange-400" />

                            <h2 className="text-5xl font-black text-white">

                                <CountUp
                                    end={97}
                                    duration={2.5}
                                    enableScrollSpy
                                />

                                %

                            </h2>

                            <p className="mt-3 text-slate-400">

                                Satisfaction Rate

                            </p>

                        </div>

                    </div>

                </div>



                {/* Scroll Indicator */}

                <div className="mt-20 flex flex-col items-center">

                    <span className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
                        Scroll Down
                    </span>

                    <div className="flex h-12 w-7 justify-center rounded-full border border-white/20">

                        <div className="mt-2 h-3 w-1 rounded-full bg-sky-400 animate-bounce"></div>

                    </div>

                </div>

            </div>

        </section>
    );
}