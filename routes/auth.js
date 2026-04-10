const router = require("express").Router();
const passport = require("passport");

// Step 1: Redirect to GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Step 2: Callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    res.send("GitHub Auth Successful");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out");
  });
});

module.exports = router;