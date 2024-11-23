const property = require("../models/property");
const Property = require("../models/property");

const home = async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();

    // Check if a user is logged in based on session data
    const isLoggedIn = req.session.users ? true : false;

    // Render home view with properties and login status
    // res.render("home", { properties: properties, status: isLoggedIn });
    res.json({properties});
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res.status(500).send("Error retrieving properties");
  }
};

module.exports = home;
