const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./auth");

// const CLIENT_URL = "http://localhost:3000";
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// app.get("/", (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.json("Logged out");
});

app.get("/auth/google/failure", (req, res) => {
  res.json("Failed to authenticate");
});

app.listen(5000, () => console.log("listening on port: 5000"));
