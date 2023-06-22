require("dotenv").config();
const express = require("express");
const ViteExpress = require("vite-express");
const app = express();
const port = process.env.PORT || 3000;
const { syncAndSeed } = require("./db/index");
const path = require('path')

//Static Files
app.use(express.static(path.join(__dirname, '..','..',"public",'furniture')));
app.use('/ItemPictures',express.static(path.join(__dirname, "..", "..", "public", "ItemPictures")));

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
