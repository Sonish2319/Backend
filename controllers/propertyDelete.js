const Property = require("../models/property");

const Propertydelete = async (req, res) => {
    const propertyId = req.params.id; // Get the property ID from the URL
    try {
        // Find and delete the property
        const deletedProperty = await Property.findByIdAndDelete(propertyId);

        if (!deletedProperty) {
            return res.status(404).send("Property not found");
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting property");
    }
};

module.exports = Propertydelete;
