import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TwKaMAx3SEU946cVCkzQruP',
    'seeker_premium': 'price_1TwLNSAx3SEU946cIA5Y6vZR',
    'recruiter_growth': 'price_1TwLQ7Ax3SEU946crmzyPkDp',
    'recruiter_enterprise': 'price_1TwLRqAx3SEU946c0NZDi0DF'
}