const user = require("../models/user");
const session = require("express-session");

const showprofile = async (req, res) => {
  if (req.session.users) {
    // User is logged in, render the profile
    res.render("profile", { user: req.session.users });
  } else {
    // User is not logged in, redirect to login
    res.redirect("/login");
  }
};
module.exports = showprofile;
