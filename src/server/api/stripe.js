const express = require("express");
const app = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Subscription = require("../db/subscription");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

module.exports = app;

app.post("/", ClerkExpressRequireAuth({}), async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: "price_1NRGsNKF9OfVALVcFTtbHmg8",
          quantity: 1,
        },
      ],
      success_url: `${process.env.SERVER_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SERVER_URL}/declined`,
    });
    const subscription = await Subscription.create({
      userId: req.auth.userId,
      subscriptionId: session.id,
    });
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});
