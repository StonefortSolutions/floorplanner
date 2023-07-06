const express = require("express");
const Floorplan = require("../db/floorplan");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const e = require("express");
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
    if (!floorplan) {
      res.status(404).send({ error: "Floorplan not found!" });
    } else {
      res.send(floorplan);
    }
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
      name: "Name Your Floorplan",
      userId: req.auth.userId,
    });
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

app.put("/:id", async (req, res, next) => {
  try {
    const floorplan = await Floorplan.findByPk(req.params.id);
    const updatedFloorplan = await floorplan.update(req.body);
    res.send(updatedFloorplan);
  } catch (error) {
    next(error);
  }
});
