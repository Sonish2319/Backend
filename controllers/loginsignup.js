const collection = require("../models/user");
const session = require("express-session");

const login = async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (!check) {
      return res.send("User not found");
    }

    if (check.password === req.body.password) {
      req.session.users = check; // Store user in session
      console.log("Session set:", req.session.users); // Log session data to debug
      res.redirect("/");
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.send("Error during login, please try again later.");
  }
};

const signup = async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  res.render("home"); //redirect to the home page
};

module.exports = {
  login,
  signup,
};
