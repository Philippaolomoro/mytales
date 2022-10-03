require("dotenv").config();
const path = require("path");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connectDB = require("./config/database");
const { truncate, stripTags } = require("./helpers/handebarsHelpers");
const morganUtils = require("./utils/morgan")
const logger = require("./utils/logger")

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morganUtils);

// Handlebars
app.engine(
  ".hbs",
  engine({
    helpers: { truncate, stripTags },
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", ".hbs");

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static(path.join(__dirname, "/public")));

// routes compression
app.use(compression());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);

server.on("listening", () => {
  logger.debug(`Tales app listening on port ${server.address().port}`);
});
