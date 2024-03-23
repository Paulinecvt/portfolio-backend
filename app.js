// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();


const logger = require("morgan");
app.use(logger('dev'));

app.use(express.static('public'));
app.use(express.json());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

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
