module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/feed");
    }
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin') {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
