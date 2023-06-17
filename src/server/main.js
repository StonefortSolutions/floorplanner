require("dotenv").config();
const express = require("express");
const ViteExpress = require("vite-express");
const app = express();
const port = process.env.PORT || 3000;
const { verifyAuthSetup, checkJwt } = require("./utils");
const { syncAndSeed } = require("./db/index");

//AUTH0 CONFIG
verifyAuthSetup();

//MIDDLEWARE
app.use(express.json());

//API
app.use("/api/auth", require("./api/auth"));

ViteExpress.listen(app, port, async () => {
  try {
    await syncAndSeed();
    console.log("SERVER: listening on port 3000...");
  } catch (ex) {
    throw ex;
  }
});
