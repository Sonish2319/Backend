const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// // Hash password before saving user to database
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// Model
const User = mongoose.model("collectio2", UserSchema);

module.exports = User;
