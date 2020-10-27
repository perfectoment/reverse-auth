$(document).ready(function() {
  //this creates a variable for the signup file
  var signUpForm = $("form.signup");
  //this creates a variable for the email input field
  var emailInput = $("input#email-input");
  //this creates a variable for the input field for the password.
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    //this prevents the function form reverting to default
    event.preventDefault();
    //this creates a variable for the inputed data
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
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    //this resets the email input field to blank
    emailInput.val("");
    //this resets the email input field to blank
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    //this will pull up and post the information for the login information    
    $.post("/api/signup", {
    //the email field in the table is the same as the logged in user email.
      email: email,
    //the password field in the table is equal to the logged in password  
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    //this hooks into the field for alert and it sends a json response for the error
    $("#alert .msg").text(err.responseJSON);
    //this hooks into a alert and it fades in 500 seconds
    $("#alert").fadeIn(500);
  }
});
