const auth = (req, res, next) => {
  console.log(req.session.user);
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized, please log in" });
};

module.exports = auth;