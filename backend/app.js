const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./auth");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.0.1:3001",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/google/failure",
//   })
// );

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/protected");
  }
);

// router.get(
//   "/oauth2/redirect/google",
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

app.get("/protected", isLoggedIn, (req, res) => {
  res.json(req.user.displayName);
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
