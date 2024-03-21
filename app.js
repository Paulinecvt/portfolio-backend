// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// CORS 
const cors = require("cors");
app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const logger = require("morgan");
app.use(logger('dev'));

app.use(express.static('public'));
app.use(express.json());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Connection to DB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio-backend")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

// Index
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
// Design
const designRoutes = require("./routes/Design.routes");
app.use("/design", designRoutes);
// Web
const webRoutes = require("./routes/Web.routes");
app.use("/web", webRoutes);

// Error handling
require("./error-handling")(app);



module.exports = app;
