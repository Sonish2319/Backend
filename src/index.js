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

const templatePath = path.join(__dirname, "../templates");
// const staticpath = path.join(__dirname, "../uploads/profilePictures");
const staticpath = path.join(__dirname, "../");
console.log(staticpath);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", templatePath);
// app.use("/uploads", express.static(staticpath));
app.use(express.static(staticpath));

// Home route with property listing





// Use user routes for handling login/signup POST requests
app.use("/", userRoutes);



// Start server
app.listen(9000, () => {
  console.log("Server running on port 9000");
});
