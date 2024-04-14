// Import dependencies
const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const routermain = require("./events/route.js");
const routerapi = require("./events/api.js");
const routertal = require("./events/talents.js");
const Confession = require("./models/confession.js");
const app = express();
const http = require("./socket.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "css")));

app.use("/", routermain);
app.use("/api", routerapi);
app.use("/talents", routertal);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
