// controllers/loginsignup.js

const logout = (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error("Error while logging out: ", err);
            return res.status(500).send("Logout failed. Please try again.");
        }
        
        // Optionally, clear cookies if used for authentication
        res.clearCookie('sessionId'); // Replace 'sessionId' with your cookie name if necessary
        
        // Redirect to the login page or send a success message
        res.redirect('/login'); // Redirect to the login page
    });
};
module.exports=logout;