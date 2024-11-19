const users = require("../models/user");
const session = require("express-session");

const showprofile = async (req, res) => {
  try{
    const userinfo=await users.findOne({_id:req.session.users._id});
    if (userinfo) {
      // User is logged in, render the profile
      res.render("profile", { user: userinfo });
    } else {
      // User is not logged in, redirect to login
      res.redirect("/login");
    }
  }catch(error){
    return res.redirect("/login");
  }
};
module.exports = showprofile;
