const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    // Corrected field name
    type: String,
  },
  description: {
    // Property description
    type: String,
    required: true,
  },
  googleMapLink: {
    // Link to Google Maps
    type: String,
  },
  contacts: {
    // Contacts as an array of strings (phone numbers, emails, etc.)
    type: [String],
  },
  video: {
    // Link to video (could be YouTube or any other video URL)
    type: String,
  },
  facilities: {
    // List of facilities (e.g., 'Pool', 'Gym', 'Parking')
    type: [String],
  },
  status: {
    type: String,
    enum: ["Available", "Booked"], // Only allows 'Available' or 'Booked'
    required: false,
  },
  propertyPictures: {
    // Image or URL to property picture
    type: String,
    default: "",
  },
});

const property = new mongoose.model("Property", PropertySchema);

module.exports = property;
