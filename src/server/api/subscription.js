const express = require("express");
const Subscription = require("../db/subscription");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const app = express.Router();

module.exports = app;

app.post("/session", async (req, res, next) => {
  try {
    const subscription = await Subscription.findAll({
      where: {
        subscriptionId: req.body.sessionId,
      },
    });
    res.send(subscription);
  } catch (error) {
    next(error);
  }
});

app.get("/user", ClerkExpressRequireAuth({}), async (req, res, next) => {
  try {
    const subscription = await Subscription.findAll({
      where: {
        userId: req.auth.userId,
      },
    });
    res.send(subscription);
  } catch (error) {
    next(error);
  }
});
