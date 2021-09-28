const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check if user authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const { tokenCookie } = req.cookies;
  if (!tokenCookie) {
    res.status(401).json({
      errMessage: "Please login first",
    });
  }
  const decoded = jwt.verify(tokenCookie.token_user, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

// check role
exports.authorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        errMessage: `Role ${req.user.role} is not allow to access`,
      });
    }
    next();
  };
