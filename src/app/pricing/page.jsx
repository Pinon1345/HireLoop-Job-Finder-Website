'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCheck, FaChevronDown, FaUserTie, FaBuilding, FaCrown, FaQuestionCircle } from 'react-icons/fa';

export default function PricingPage() {
    const [role, setRole] = useState('seekers'); // 'seekers' | 'recruiters'
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Job Seekers Pricing Data

    const seekerPlans = [
        {
            id: 'seeker_free',
            name: 'Free',
            price: '$0',
            period: '/forever',
            description: 'Ideal for getting started and exploring opportunities.',
            popular: false,
            buttonText: 'Get Started Free',
            features: [
                'Browse & save up to 10 jobs',
                'Apply to up to 3 jobs per month',
                'Basic candidate profile',
                'Standard email alerts',
            ],
        },
        {
            id: 'seeker_pro',
            name: 'Pro',
            price: '$19',
            period: '/month',
            description: 'Perfect for active job seekers looking for consistent applications.',
            popular: true,
            buttonText: 'Upgrade to Pro',
            features: [
                'Apply to up to 30 jobs per month',
                'Unlimited saved jobs',
                'Application status tracking',
                'Comprehensive salary insights',
                'Priority email alerts',
            ],
        },
        {
            id: 'seeker_premium',
            name: 'Premium',
            price: '$39',
            period: '/month',
            description: 'For candidates aiming to maximize visibility and land jobs fast.',
            popular: false,
            buttonText: 'Get Premium',
            features: [
                'Everything in Pro',
                'Unlimited job applications',
                'Profile boost directly to recruiters',
                'Early access to newly posted jobs',
                '24/7 Priority support',
            ],
        },
    ];

    // Recruiters Pricing Data

    const recruiterPlans = [
        {
            id: 'recruiter_free',
            name: 'Free',
            price: '$0',
            period: '/forever',
            description: 'Great for small teams or a company’s first year of hiring.',
            popular: false,
            buttonText: 'Post First Job',
            features: [
                'Up to 3 active job posts',
                'Basic applicant management',
                'Standard job listing visibility',
                'Basic candidate messaging',
            ],
        },
        {
            id: 'recruiter_growth',
            name: 'Growth',
            price: '$49',
            period: '/month',
            description: 'Designed for growing companies actively scaling their team.',
            popular: true,
            buttonText: 'Start Free Trial',
            features: [
                'Up to 10 active job posts',
                'Full applicant tracking system (ATS)',
                'Basic recruitment analytics',
                'Dedicated email support',
                'Candidate filter tools',
            ],
        },
        {
            id: 'recruiter_enterprise',
            name: 'Enterprise',
            price: '$149',
            period: '/month',
            description: 'Full-featured power for high-volume hiring and enterprise teams.',
            popular: false,
            buttonText: 'Contact Sales',
            features: [
                'Up to 50 active job posts',
                'Advanced analytics dashboard',
                'Featured job listings',
                'Multi-user team collaboration',
                'Custom company branding',
                'Dedicated account manager & priority support',
            ],
        },
    ];

    const currentPlans = role === 'seekers' ? seekerPlans : recruiterPlans;

    // FAQ Items

    const faqs = [
        {
            question: 'Can I cancel my subscription at any time?',
            answer:
                'Yes, absolutely! You can cancel your subscription at any point from your Account Settings page. You will retain full access to your paid features until the end of your current billing period.',
        },
        {
            question: 'What is your refund policy?',
            answer:
                'We offer a 7-day money-back guarantee for all new paid subscriptions if you are unsatisfied with our service. Simply reach out to support within 7 days of purchase.',
        },
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept all major credit and debit cards including Visa, MasterCard, and American Express. We also support PayPal and Google Pay for convenience.',
        },
        {
            question: 'How do I switch between plans?',
            answer:
                'You can upgrade or downgrade your plan directly from your billing dashboard. When upgrading, the prorated difference will be calculated instantly.',
        },
    ];

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Section */}

                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-800/50">
                        Flexible & Transparent
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight mt-8">
                        Simple Pricing for <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400">Everyone</span>
                    </h1>
                    <p className="text-zinc-400 text-base sm:text-lg">
                        Choose the right plan designed to power your career search or boost your hiring team.
                    </p>
                </div>

                {/* Toggle Bar */}
                <div className="flex justify-center">
                    <div className="bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-md flex items-center space-x-2 shadow-lg shadow-blue-950/10">
                        <button
                            onClick={() => setRole('seekers')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${role === 'seekers'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <FaUserTie className="w-4 h-4" />
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setRole('recruiters')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${role === 'recruiters'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            <FaBuilding className="w-4 h-4" />
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                    {currentPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col justify-between rounded-2xl bg-zinc-900/60 border p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${plan.popular
                                ? 'border-blue-500 shadow-xl shadow-blue-950/40 ring-1 ring-blue-500'
                                : 'border-zinc-800/80 hover:border-zinc-700'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                                    <FaCrown className="w-3 h-3" /> Most Popular
                                </div>
                            )}

                            {/* Card Header */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-zinc-100">{plan.name}</h3>
                                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
                                <div className="flex items-baseline gap-1 pt-2">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-zinc-400 font-medium text-sm">{plan.period}</span>
                                </div>

                                <div className="border-t border-zinc-800/80 my-6" />

                                {/* Features List */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                            <div className="p-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mt-0.5 shrink-0">
                                                <FaCheck className="w-3 h-3" />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Button */}

                            <div className="pt-8">

                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <button
                                            type="submit"
                                            role="link"
                                            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all text-center block shadow-md ${plan.popular
                                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                                }`}
                                        >
                                            Checkout
                                        </button>
                                    </section>
                                </form>

                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section */}
                <div className="pt-16 max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex p-3 bg-blue-600/10 rounded-full border border-blue-500/20 text-blue-500 mb-2">
                            <FaQuestionCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            Have questions? We’re here to help you understand how our pricing works.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-zinc-200 hover:text-white transition-colors"
                                    >
                                        <span>{faq.question}</span>
                                        <FaChevronDown
                                            className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-5 text-zinc-400 text-sm border-t border-zinc-800/50 pt-3 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}