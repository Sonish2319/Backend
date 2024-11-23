const Property = require("../models/property");
const Propertydetails = async (req, res) => {
    const propertyId = req.params.id; // Get the property ID from the URL
    try {
        // Fetch the property from the database
    
        const property = await Property.findOne({ _id: propertyId });
    
        if (!property) {
          return res.status(404).send("Property not found");
        }
        res.json( { property });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching property");
      }
};

module.exports = Propertydetails;