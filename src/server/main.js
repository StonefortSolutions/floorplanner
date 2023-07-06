require("dotenv").config();
const express = require("express");
const ViteExpress = require("vite-express");
const app = express();
const port = process.env.PORT || 3000;
const { syncAndSeed } = require("./db/index");
const path = require("path");

//Static Files
app.use(
  express.static(path.join(__dirname, "..", "..", "public", "furniture"))
);
app.use(
  "/ItemPictures",
  express.static(path.join(__dirname, "..", "..", "public", "ItemPictures"))
);
app.use(
  "/environment",
  express.static(path.join(__dirname, "..", "..", "public", "environment"))
);
app.use(
  "/normals",
  express.static(path.join(__dirname, "..", "..", "public", "normals"))
);

//MIDDLEWARE
app.use(express.json({ limit: "50mb" }));

//API
app.use("/api/auth", require("./api/auth"));
app.use("/api/floorplan", require("./api/floorplan"));
app.use("/api/admin", require("./api/admin"));

ViteExpress.listen(app, port, async () => {
  try {
    await syncAndSeed();
    console.log("SERVER: listening on port 3000...");
  } catch (ex) {
    throw ex;
  }
});
