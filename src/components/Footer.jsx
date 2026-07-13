import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi2";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-linear-to-b from-zinc-950 to-black px-6 pt-16 pb-10 text-slate-400 md:px-16">

            {/* Background Glow */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[140px]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Brand */}
                <div className="mb-14">

                    <div className="flex items-center gap-4">

                        <Image
                            src="/logo2.png"
                            alt="HireLoop Logo"
                            width={70}
                            height={70}
                            className="animate-logo-float"
                        />

                        <div>

                            <h2 className="text-4xl font-black tracking-tight text-white">
                                <span className="text-sky-500">Hire</span>
                                <span className="text-orange-500">Loop</span>
                            </h2>

                            <p className="text-sm text-slate-500">
                                Find • Hire • Grow
                            </p>

                        </div>

                    </div>

                    <p className="mt-6 max-w-2xl leading-8 text-slate-400">
                        HireLoop is a modern recruitment platform that connects talented
                        job seekers with trusted employers. Explore career opportunities,
                        discover top companies, post jobs, manage applications, and build
                        meaningful professional connections—all from one powerful platform.
                    </p>

                </div>

                {/* Footer Grid */}

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

                    {/* Newsletter */}

                    <div>

                        <h3 className="mb-4 font-semibold uppercase tracking-wider text-white">
                            Stay Updated
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-slate-400">
                            Subscribe to receive career tips, new job alerts,
                            recruitment trends, and HireLoop product updates.
                        </p>

                        <div className="flex items-center rounded-xl border border-slate-700 bg-zinc-900/70 px-4 py-3 transition focus-within:border-sky-500">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                            />

                            <button
                                className="ml-3 rounded-lg bg-sky-500 p-2 text-white transition hover:bg-sky-600"
                            >
                                <HiPaperAirplane size={18} />
                            </button>

                        </div>

                    </div>

                    {/* Job Seekers */}

                    <div>

                        <h3 className="mb-4 font-semibold uppercase tracking-wider text-white">
                            Job Seekers
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    href="/jobs"
                                    className="transition hover:text-sky-400"
                                >
                                    Browse Jobs
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/companies"
                                    className="transition hover:text-sky-400"
                                >
                                    Companies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/pricing"
                                    className="transition hover:text-sky-400"
                                >
                                    Pricing
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/signin"
                                    className="transition hover:text-sky-400"
                                >
                                    Sign In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/signup"
                                    className="transition hover:text-sky-400"
                                >
                                    Create Account
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Employers */}

                    <div>

                        <h3 className="mb-4 font-semibold uppercase tracking-wider text-white">
                            Employers
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    href="/post-job"
                                    className="transition hover:text-sky-400"
                                >
                                    Post a Job
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/pricing"
                                    className="transition hover:text-sky-400"
                                >
                                    Recruiter Plans
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/companies"
                                    className="transition hover:text-sky-400"
                                >
                                    Find Talent
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/signup"
                                    className="transition hover:text-sky-400"
                                >
                                    Recruiter Account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-sky-400"
                                >
                                    Employer Support
                                </Link>
                            </li>

                        </ul>

                    </div>
                    {/* Company */}

                    <div>

                        <h3 className="mb-4 font-semibold uppercase tracking-wider text-white">
                            Company
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-sky-400"
                                >
                                    About HireLoop
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-sky-400"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/careers"
                                    className="transition hover:text-sky-400"
                                >
                                    Careers
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/blog"
                                    className="transition hover:text-sky-400"
                                >
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/faq"
                                    className="transition hover:text-sky-400"
                                >
                                    FAQ
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-4 font-semibold uppercase tracking-wider text-white">
                            Contact
                        </h3>

                        <ul className="space-y-4 text-sm">

                            <li className="flex items-start gap-3">
                                <span>📍</span>
                                <span>Chattogram, Bangladesh</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <span>📧</span>
                                <span>support@hireloop.com</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <span>📞</span>
                                <span>+880 1234-567890</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <span>🕒</span>
                                <span>24/7 Customer Support</span>
                            </li>

                        </ul>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

                    <p className="text-center text-sm text-slate-500">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-white">
                            HireLoop
                        </span>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">

                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-700 p-3 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                            <FaGithub size={18} />
                        </a>

                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-700 p-3 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                            <FaLinkedin size={18} />
                        </a>

                        <a
                            href="https://facebook.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-700 p-3 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                            <FaFacebook size={18} />
                        </a>

                        <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-700 p-3 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                            <FaInstagram size={18} />
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;