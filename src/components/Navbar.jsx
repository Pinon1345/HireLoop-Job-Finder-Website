"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    HiBars3,
    HiXMark,
    HiBriefcase,
    HiBuildingOffice2,
    HiCurrencyDollar,
} from "react-icons/hi2";

const navLinks = [
    {
        title: "Browse Jobs",
        href: "/jobs",
        icon: HiBriefcase,
    },
    {
        title: "Companies",
        href: "/companies",
        icon: HiBuildingOffice2,
    },
    {
        title: "Pricing",
        href: "/pricing",
        icon: HiCurrencyDollar,
    },
];

export default function Navbar() {
    const pathname = usePathname();

    const [mobileMenu, setMobileMenu] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "pt-3" : "pt-6"
                    }`}
            >
                <div
                    className={`mx-auto flex w-[95%] max-w-7xl items-center justify-between rounded-3xl border border-white/10
          
          bg-zinc-950/70
          backdrop-blur-2xl

          transition-all duration-500

          ${scrolled
                            ? "h-16 shadow-2xl shadow-blue-500/5"
                            : "h-20 shadow-xl shadow-black/30"
                        }
          `}
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-3 pl-6">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo2.png"
                                alt="HireLoop"
                                width={90}
                                height={90}
                                priority
                            />

                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-3xl font-black tracking-tight mb-1">
                                    <span className="text-sky-500">Hire</span>
                                    <span className="text-orange-500">Loop</span>
                                </h2>

                                <p className="-mt-1 text-xs text-zinc-400">
                                    Find • Hire • Grow
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* CENTER */}
                    <div className="hidden lg:block">
                        <ul className="flex items-center rounded-full border border-white/10 bg-white/5 p-2">
                            {navLinks.map((item) => {
                                const Active = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`relative mx-1 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300

                      ${Active
                                                    ? "bg-white text-zinc-900 shadow-lg"
                                                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                                                }
                      `}
                                        >
                                            <Icon className="text-lg" />

                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="hidden items-center gap-3 pr-5 lg:flex">
                        <Link
                            href="/signin"
                            className="rounded-full px-5 py-3 font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/jobs"
                            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10"
                        >
                            Find Jobs
                        </Link>

                        <Link
                            href="/post-job"
                            className="rounded-full bg-linear-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-sky-500/50"
                        >
                            GET STARTED
                        </Link>
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="mr-5 rounded-xl border border-white/10 p-2 transition hover:bg-white/10 lg:hidden"
                    >
                        {mobileMenu ? (
                            <HiXMark className="text-3xl" />
                        ) : (
                            <HiBars3 className="text-3xl" />
                        )}
                    </button>
                </div>

                {/* MOBILE MENU */}
                <div
                    className={`overflow-hidden transition-all duration-500 lg:hidden ${mobileMenu ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="mx-auto mt-3 w-[95%] max-w-7xl rounded-3xl border border-white/10 bg-zinc-950/90 p-5 backdrop-blur-xl">
                        <ul className="space-y-2">
                            {navLinks.map((item) => {
                                const Active = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenu(false)}
                                            className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition

                      ${Active
                                                    ? "bg-white text-zinc-900"
                                                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                                                }
                      `}
                                        >
                                            <Icon className="text-xl" />

                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="my-5 h-px bg-white/10"></div>

                        <div className="space-y-3">
                            <Link
                                href="/signin"
                                className="block rounded-2xl border border-white/10 py-3 text-center font-semibold hover:bg-white/10"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/jobs"
                                className="block rounded-2xl border border-white/10 bg-white/5 py-3 text-center font-semibold"
                            >
                                Find Jobs
                            </Link>

                            <Link
                                href="/post-job"
                                className="block rounded-2xl bg-linear-to-r from-sky-500 to-indigo-600 py-3 text-center font-bold text-white"
                            >
                                GET STARTED
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer */}
            <div className="h-28"></div>
        </>
    );
}