$(document).ready(function() {
  //This creates a variable for the hook into the login form.
  var loginForm = $("form.login");
  //this creates a variable for the hook into the email input.
  var emailInput = $("input#email-input");
  //this creates a variable for the hook into the password email.
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    //this prevents the form on going back tot default.
    event.preventDefault();
    //this creates a variable for the user data being imported.
    var userData = {
      //this defines the email column within the table as the input for the email input it also adjusts it to remove spaces.
      email: emailInput.val().trim(),
      //this defines the password column in the table as being the same as the input for the password input area, it also reduces spacing for easy recongition.
      password: passwordInput.val().trim()
    };
    //this checks it the user email matched with the user password, if they don't.
    if (!userData.email || !userData.password) {
      //this will just return that it was not certifed
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    //this clears the email value
    emailInput.val("");
    //this clears the password input value
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    //this will pull up and post the information for the login information
    $.post("/api/login", {
      //the email field in the table is the same as the logged in user email.
      email: email,
      //the password field in the table is equal to the logged in password
      password: password
    })//then this function happens after the information is gathered
      .then(function() {
        //this is changing the webpage to the new updated members page.
        window.location.replace("/members");
        // If there's an error, log the error
      })
      //this will reports and errors
      .catch(function(err) {
        //this will log the error
        console.log(err);
      });
  }
});
