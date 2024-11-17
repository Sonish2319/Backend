const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/loginsignup");
const { changePassword } = require("../controllers/changePassword");
const { addPost, editProperty, savePost } = require("../controllers/property");
const upload = require("../controllers/upload");
const User = require("../models/user");

// Define POST routes for login, signup, and changePassword
router.post("/signup", signup);
router.post("/login", login);
router.post("/changePassword", changePassword);
router.post("/addPost", addPost);
router.post("/editProperty", editProperty);
router.post("/savePost", savePost);
// router.get("/", savePost);

// Update profile picture
router.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      // Check if session is available
      if (!req.session.users) {
        return res.status(400).send("User session not found. Please log in.");
      }

      const profilePicturePath = req.file
        ? `/uploads/profilePictures/${req.file.filename}`
        : "";

      console.log("User session:", req.session.users); // Log session data

      // Get user from the session
      const user = await User.findOne({ name: req.session.users.name });

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Update user's profile picture in the database
      user.profilePicture = profilePicturePath;
      await user.save();

      console.log(`Profile picture uploaded by user: ${user.name}`);

      // Redirect or send a success response
      res.redirect(`/profile/${user._id}`);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
