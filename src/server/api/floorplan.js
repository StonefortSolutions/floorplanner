const express = require("express");
const Floorplan = require("../db/floorplan");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const floorplan = await Floorplan.findAll();
    res.send(floorplan);
  } catch (error) {
    next(error);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const floorplan = await Floorplan.findByPk(req.params.id);
    res.send(floorplan);
  } catch (error) {
    next(error);
  }
});

app.post("/", ClerkExpressRequireAuth({}), async (req, res, next) => {
  //if < 3 and free tier or pro
  //else error
  try {
    if (!req.auth.userId && !req.auth.sessionId) {
      res.status(401).send({ error: "Unauthenticated!" });
    }
    const floorplan = await Floorplan.create({
      name: "untitled",
      userId: req.auth.userId,
    });
    console.log("API Floorplan", floorplan);
    res.send(floorplan);
  } catch (error) {
    next(error);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const floorplan = await Floorplan.findByPk(req.params.id);
    await floorplan.destroy();
    res.send(floorplan);
  } catch (error) {
    next(error);
  }
});
