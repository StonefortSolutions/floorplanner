const express = require("express");
const app = express.Router();
const { checkJwt } = require("../utils.js");

module.exports = app;

app.get("/", checkJwt, (req, res, next) => {
  console.log("HERE");
  console.log(req);
  console.log(req.body);
  try {
    res.send({
      msg: "Your access token was successfully validated!",
    });
  } catch (ex) {
    next(ex);
  }
});
