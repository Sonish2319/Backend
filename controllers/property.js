const property = require("../models/property");

const addPost = async (req, res) => {
  const {
    title,
    price,
    address,
    description,
    googleMapLink,
    contacts,
    video,
    facilities,
    status,
    propertyPictures,
  } = req.body;

  // Prepare the property data
  const newProperty = new property({
    title,
    price,
    address,
    description,
    googleMapLink,
    contacts: contacts.split(",").map((contact) => contact.trim()), // Convert contacts to an array
    video,
    facilities: facilities.split(",").map((facility) => facility.trim()), // Convert facilities to an array
    status,
    propertyPictures,
  });

  try {
    // Save the new property to the database
    await newProperty.save();

    // Redirect to the newly added property or another page
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting property");
  }
};

const editProperty = async (req, res) => {
  const propertyId = req.params.id; // Get the property ID from the URL

  try {
    // Fetch the property from the database
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }
    property.isAvailable = property.status === "Available";
    property.isBooked = property.status === "Booked";
    // Render the form and pass the property data to the view
    res.render("edit", { property });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching property");
  }
};

const savePost = async (req, res) => {
  const {
    propertyId,
    title,
    price,
    address,
    description,
    googleMapLink,
    contacts,
    video,
    facilities,
    status,
    propertyPictures,
  } = req.body;

  try {
    // Find the property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    // Update the property details with the new values from the form
    property.title = title;
    property.price = price;
    property.address = address;
    property.description = description;
    property.googleMapLink = googleMapLink;
    property.contacts = contacts ? contacts.split(",") : [];
    property.video = video;
    property.facilities = facilities ? facilities.split(",") : [];
    property.status = status;
    property.propertyPictures = propertyPictures;

    // Save the updated property back to the database
    await property.save();

    // Redirect to the updated property page or the listing page
    res.send("successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating property");
  }
};

module.exports = {
  addPost,
  editProperty,
  savePost,
};
