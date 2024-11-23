const express = require("express");
const router = express.Router();

const home=require("../controllers/home");
const { login, signup } = require("../controllers/loginsignup");
const { changePassword } = require("../controllers/changePassword");
const showprofile = require("../controllers/profile");
const { addPost, editProperty, savePost } = require("../controllers/property");
const { upload, setUploadType } = require("../controllers/upload");
const editProfile =require("../controllers/editprofile");
const uplaodPic=require("../controllers/uploadProfilePicture");
const logout=require("../controllers/logout");
const Propertydetails=require("../controllers/propertyDetails");
const Propertydelete=require("../controllers/propertyDelete");


// Define routes

//home
router.get("/",home);
//signup
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", signup);
//login
router.get("/login", (req, res) => res.render("login"));
router.post("/login", login);
//change password
router.get("/changePassword", (req, res) => res.render("changePassword"));
router.post("/changePassword", changePassword);
//edit property
router.get("/property/edit/:id", editProperty);
router.post("/property/edit",setUploadType("property"),upload.single("propertyPictures"),savePost);
// Route for adding a property with image upload
router.get("/addProperty", (req, res) => res.render("add"));
router.post("/addProperty",setUploadType("property"),upload.single("propertyPictures"),addPost );
// Update profile picture
router.get("/uploadProfilePicture", (req, res) => res.render("uploadProfilePicture"));
router.post("/uploadProfilePicture",setUploadType("profile"),upload.single("profilePicture"),uplaodPic);

//view details
router.get("/property/details/:id", Propertydetails);

router.get("/property/delete/:id", Propertydelete);

// profile
router.get("/profile", showprofile);
//profile edit
router.get("/profile/edit", (req, res) => res.render("editprofile"));
router.post("/profile/edit",editProfile);
//logout
router.get("/logout",logout);
module.exports = router;
