import { cors } from 'lib/middleware';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment_failure`,
      });
      res.json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
