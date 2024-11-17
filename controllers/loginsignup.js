const collection = require("../models/user");

const login = async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong deataials");
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
