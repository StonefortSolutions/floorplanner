require("dotenv/config");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const express = require("express");
const app = express.Router();
const { Examples } = require("../db");

module.exports = app;

app.get("/", ClerkExpressRequireAuth({}), async (req, res, next) => {
  try {
    if (
      // !req.auth.userId && !req.auth.sessionId
      false
    ) {
      res.status(401).send({ error: "Unauthenticated!" });
    }
    const examples = await Examples.findAll();
    res.send(examples);
  } catch (ex) {
    next(ex);
  }
});

app.post("/postregistration", async (req, res, next) => {
  console.log("postregistration", req.body);
  try {
    res.send(req.body);
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send({ error: "Unauthenticated!" });
});
