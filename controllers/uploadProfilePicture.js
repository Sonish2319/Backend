const User=require('../models/user');

const uplaodPic=async (req, res) => {
    try {
      // Check if session is available
      if (!req.session.users) {
        return res.status(400).send("User session not found. Please log in.");
      }

      const profilePicturePath = req.file
        ? `/uploads/profilePictures/${req.file.filename}`
        : "";
      console.log(req.file.filename);
      console.log("User session:", req.session.users); // Log session data

      // Get user from the session
      const user = await User.findOne({ _id: req.session.users._id });

      if (!user) {
        return redirect('/login');
      }

      // Update user's profile picture in the database
      user.profilePicture = profilePicturePath;
      await user.save();

      console.log(`Profile picture uploaded by user: ${user.name}`);

      // Redirect or send a success response
      // res.redirect(`/profile/${user._id}`);
      res.redirect(`/profile`);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).send("Server error");
    }
  }

  module.exports=uplaodPic;