const User = require("../models/user");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Ensure the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New passwords do not match." });
    }

    // Find the user by username
    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    
    if (oldPassword != user.password) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    // Hash the new password and save it
    user.password = newPassword; // The password will be hashed automatically by the 'pre-save' hook

    // Save the updated user
    await user.save();
    res.json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

module.exports = { changePassword };
