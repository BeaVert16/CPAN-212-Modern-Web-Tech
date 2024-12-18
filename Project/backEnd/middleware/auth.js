const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
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

  return res.status(403).json({ error: "Forbidden: Admins only." });
};

const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.session.user,
    });
  }
  return res.status(401).json({
    isAuthenticated: false,
    error: "No active session.",
  });
};

module.exports = { auth, isAdmin, checkSession};
