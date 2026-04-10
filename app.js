// // REQUIRE STATEMENTS
// require("dotenv").config();
// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const connectDB = require("./database/db");

// connectDB();

// const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
// }

// app.use(express.urlencoded({ extended: true }))
//     .use(express.json())
//     .use((req, res, next) => {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         next();
//     })
//     .use("/", require("./routes"));

// process.on("uncaughtException", (err, origin) => {
//     console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
// });

// app.listen(port, console.log(`Web server is listening at http://localhost:${port}`));


require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const session = require("express-session");
const passport = require("./config/passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("MONGO_URL:", process.env.MONGO_URL ? "OK" : "MISSING");
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID ? "OK" : "MISSING");
console.log("SESSION_SECRET:", process.env.SESSION_SECRET ? "OK" : "MISSING");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use("/", require("./routes"));

module.exports = app; // ✅ export only