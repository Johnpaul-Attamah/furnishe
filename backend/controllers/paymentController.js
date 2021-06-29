import dotenv from 'dotenv';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import Stripe from 'stripe';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: 'backend/config/config.env' });
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Process Stripe payments
 * @async route => /api/v1/payment/process
 * @function processPayment
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the payment data
 */
export const processPayment = catchAsyncErrors(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment'}
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})


/**
 * Send Api Key to frontend
 * @async route => /api/v1/stripeapi
 * @function registerUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the payment data
 */
export const sendStripApi = catchAsyncErrors(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})