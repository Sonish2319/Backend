const mongoose = require("mongoose");

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  sex: {
    type: String,
    enum: ["m", "f"], // Only allows 'm' or 'f'
    required: false, // Make it optional
  },
  profilePicture: {
    type: String, // Will store the file path
    default: "",
  },
});

const collection = new mongoose.model("user", LogInSchema);

module.exports = collection;
