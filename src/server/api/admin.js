require("dotenv/config");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const clerk = require("@clerk/clerk-sdk-node");
const express = require("express");
const app = express.Router();
const axios = require("axios");

module.exports = app;

app.get("/users", ClerkExpressRequireAuth({}), async (req, res, next) => {
  const user = await clerk.users.getUser(req.auth.userId);
  const { publicMetadata } = user;
  try {
    if (req.auth.userId && req.auth.sessionId && publicMetadata.isAdmin) {
      const users = await clerk.users.getUserList();
      res.send(users);
    } else {
      res.status(401).send({ error: "Unauthenticated!" });
    }
  } catch (ex) {
    next(ex);
  }
});

app.get("/stats", ClerkExpressRequireAuth({}), async (req, res, next) => {
  const user = await clerk.users.getUser(req.auth.userId);
  const { publicMetadata } = user;
  try {
    if (req.auth.userId && req.auth.sessionId && publicMetadata.isAdmin) {
      const userCount = await clerk.users.getCount();
      const stats = {
        users: userCount,
      };
      res.send(stats);
    } else {
      res.status(401).send({ error: "Unauthenticated!" });
    }
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send({ error: "Unauthenticated!" });
});
