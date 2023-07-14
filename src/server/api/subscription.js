const express = require("express");
const Subscription = require("../db/subscription");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const app = express.Router();

module.exports = app;

app.post("/", ClerkExpressRequireAuth({}), async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const subscription = await Subscription.create({
      userId: req.auth.userId,
      subscriptionId: sessionId,
    });
    res.send(subscription);
  } catch (error) {
    next(error);
  }
});
