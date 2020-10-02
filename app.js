const path = require("path");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");

const session = require("express-session");
const MongoStore= require("connect-mongo")(session)
const getPort = require("get-port");

const connectDB = require("./config/database");
const handlebars = require("./helpers/handlebars")


// Load Config
dotenv.config();

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(helmet())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Morgan-Login
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}


// Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", ".hbs");

// sessions
app.use(
	session({
		secret: "diamond phil",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({mongooseConnection: mongoose.connection})
	})
);

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static(path.join(__dirname, "public")));

// routes compression
app.use(compression())

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"))

const PORT = process.env.PORT;

const server = app.listen(PORT);

server.on("listening", () => {
	if (process.env.NODE_ENV === "development"){
		console.log(`Tales app listening on port ${server.address().port}`)
	}
});
