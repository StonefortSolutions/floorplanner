const express = require("express");
const Subscription = require("../db/subscription");
const app = express.Router();

module.exports = app;

app.post("/", async (req, res, next) => {
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
