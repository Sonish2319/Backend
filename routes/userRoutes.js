const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/loginsignup");
const { changePassword } = require("../controllers/changePassword");
const { addPost, editProperty, savePost } = require("../controllers/property");

const { showPost } = require("../controllers/showPost");

// Define POST routes for login, signup, and changePassword
router.post("/signup", signup);
router.post("/login", login);
router.post("/changePassword", changePassword);
router.post("/addPost", addPost);
router.post("/editProperty", editProperty);
router.post("/savePost", savePost);
// router.get("/", savePost);

module.exports = router;
