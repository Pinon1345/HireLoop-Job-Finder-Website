import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaCheck, FaEnvelope, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import { stripe } from '@/lib/stripe';
import { createSubscription } from '@/lib/action/subscriptions';


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    const { status, customer_details, metadata } = session;
    const customerEmail = customer_details?.email;

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {

        const subscriptionInfo = {
            email: customerEmail,
            planId: metadata.planId
        }

        // Update the user table about the new plan.

        const result = await createSubscription(subscriptionInfo)
        console.log(result);

        return (
            <section id="success" className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-blue-950/30 text-center space-y-6 relative overflow-hidden">

                    {/* Glowing Top Decorator */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Success Animated Check Badge */}
                    <div className="flex justify-center relative">
                        <div className="p-4 bg-blue-600/10 rounded-full border border-blue-500/30 text-blue-500 shadow-inner">
                            <div className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-600/40">
                                <FaCheck className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Headline & Title */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/40">
                            Payment Successful
                        </span>
                        <h1 className="mt-8 mb-4 text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                            Thank You for Your Subscription!
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            We appreciate your step and are excited to have you on board.
                        </p>
                    </div>

                    {/* Receipt / Confirmation Card */}
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 text-left space-y-3">
                        <div className="flex justify-center items-center gap-3 text-zinc-300 text-xs sm:text-sm">
                            <FaEnvelope className="text-blue-500 w-4 h-4 shrink-0" />
                            <span>
                                Confirmation sent to:{' '}
                                <strong className="text-zinc-100 font-semibold block sm:inline break-all">
                                    {customerEmail}
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                        <Link
                            href="/jobs"
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                        >
                            Start Browsing Jobs
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                            href="mailto:orders@example.com"
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 font-medium text-sm rounded-xl border border-zinc-700/50 transition-all"
                        >
                            <FaQuestionCircle className="w-4 h-4 text-zinc-400" />
                            Need help? Contact Support
                        </a>
                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-zinc-500 pt-2">
                        Order Reference: <span className="font-mono text-zinc-400">{session_id.slice(0, 18)}...</span>
                    </p>

                </div>
            </section>
        );
    }
}