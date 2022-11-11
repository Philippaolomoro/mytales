require("dotenv").config();
const path = require("path");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const expresslayouts = require("express-ejs-layouts")
const MongoStore = require("connect-mongo")(session);

const connectDB = require("./config/database");
const morganUtils = require("./utils/morgan");
const logger = require("./utils/logger");

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morganUtils);

app.use(expresslayouts)
app.set("view engine", "ejs");

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(flash())

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static(path.join(__dirname, "/public")));

// routes compression
app.use(compression());

// Routes
app.use("/", require("./routes/index"))

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);

server.on("listening", () => {
  logger.debug(`Tales app listening on port ${server.address().port}`);
});
