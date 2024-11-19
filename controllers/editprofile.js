const users = require('../models/user');

const editProfile = async (req, res) => {
    try {
        // Fetch the user using the session data
        const user = await users.findById(req.session.users._id);
        const { name, age, sex } = req.body;

        if (user) {
            // Update the user fields
            user.name = (name !== null && name !== undefined && name !== '') ? name : user.name;
            user.age = (age !== null && age !== undefined && age !== '') ? age : user.age;
            user.sex = (sex !== null && sex !== undefined && sex !== '') ? sex : user.sex;

            
            // Save the updated user to the database
            await user.save();

            // Redirect to the profile page
            return res.redirect('/profile');
        } else {
            return res.status(404).send("Profile not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editing profile");
    }
};

module.exports = editProfile;
