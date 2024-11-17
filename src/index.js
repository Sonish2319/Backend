const express = require("express");
const app = express();
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const path = require("path");
const hbs = require("hbs");
const Property = require("../models/property");
const session = require("express-session");

// Session configuration
app.use(
  session({
    secret: "secret", // You can change this to any secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // For development, use `false`. Set to `true` for production with HTTPS
  })
);

// Connect to the database
connectDB();

const templatePath = path.join(__dirname, "../tempelates");
const staticpath = path.join(__dirname, "../uploads/profilePictures");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use("/uploads", express.static(staticpath));

// Home route with property listing
app.get("/", async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();

    // Render home view with properties
    res.render("home", { properties });
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res.status(500).send("Error retrieving properties");
  }
});

// Static routes for login/signup/add/edit views
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/changePassword", (req, res) => res.render("changePassword"));
app.get("/add", (req, res) => res.render("add"));
app.get("/edit/:id", (req, res) => res.render("edit"));
app.get("/profilePicture", (req, res) => res.render("profilePicture"));

// Use user routes for handling login/signup POST requests
app.use("/", userRoutes);

// Start server
app.listen(9000, () => {
  console.log("Server running on port 9000");
});
