const auth = (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    return next(); // ✅ bypass auth in tests
  }
  
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Unauthorized" });
  };

module.exports = auth;