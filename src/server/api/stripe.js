const express = require("express");
const app = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: "price_1NRGsNKF9OfVALVcFTtbHmg8",
          quantity: 1,
        },
      ],
      success_url: `${process.env.SERVER_URL}/confirmation`,
      cancel_url: `${process.env.SERVER_URL}/declined`,
    });
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});
