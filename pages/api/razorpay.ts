import { cors } from 'lib/middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
const { uuid } = require('uuidv4');
const Razorpay = require('razorpay');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  if (req.method == 'POST') {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: 20000, // Rs.200 -> 20000p
      currency: 'INR',
      receipt: uuid(),
      payment_capture: 1,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
