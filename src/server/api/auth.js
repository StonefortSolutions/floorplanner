const express = require("express");
const app = express.Router();
const { checkJwt } = require("../utils");
const { Examples } = require("../db");

module.exports = app;

app.get("/", checkJwt, async (req, res, next) => {
  try {
    const examples = await Examples.findAll();
    res.send(examples);
  } catch (ex) {
    next(ex);
  }
});
