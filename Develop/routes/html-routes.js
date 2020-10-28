// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//this exports the value of this function
module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      //this redircts them to the members page
      res.redirect("/members");
    }//this sends the infomration to the signup.html file
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//this "gets" the information form the login file
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      //this redirects to the members page
      res.redirect("/members");
    }
    //this will send the information to the login file
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
