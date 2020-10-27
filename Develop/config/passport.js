
//This connects to Passport.js which is Authentication Middleware for Node.js
var passport = require("passport");
//This allows Node.js to use Local Strategy which allows us to login with a username/email
var LocalStrategy = require("passport-local").Strategy;
// This allows our passport.js file to call upon our models that we created.
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      //find the email/password where;
      where: {
        //the email entered is equal to an element in the email column.
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        //return false
        return done(null, false, {
          //with the message "incorrect email"
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        //return false
        return done(null, false, {
          //with the message "incorrect password"
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
