const whitelistedPaths = process.env.WHITELISTED_PATHS
  ? process.env.WHITELISTED_PATHS.split(",")
  : [];

const auth = (req, res, next) => {
  if (whitelistedPaths.includes(req.path)) {
    return next();
  }

  if (req.session && req.session.user) {
    return res
      .status(200)
      .json({ isAuthenticated: true, user: req.session.user });
  }
  return res.status(401).json({
    isAuthenticated: false,
    error: "I though of that. Login Bozo",
  });
};

const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: Admins only" });
};

(module.exports = auth), isAdmin;
