// signupform coding start !
const signupform = document.getElementById("signup_form");
signupform.onsubmit = function () {
  var email = document.getElementById("signup_email").value;
  var password = document.getElementById("signup_password").value;
  var username = document.getElementById("signup_username").value;
  var number = document.getElementById("signup_phone").value;
  var user_obj_data = {
    email: email,
    password: password,
    username: username,
    number: number,
  };
  var user_text_data = JSON.stringify(user_obj_data);
  if (email != "" && password != "" && username != "" && number != "") {
    var signup_button = document.getElementById("signup_button");
    localStorage.setItem(email, user_text_data);
    signup_button.style.backgroundColor = "#14b129";
    signup_button.innerHTML =
      "<i class='fa-solid fa-circle-check'></i>  Sign up successful";
    setTimeout(() => {
      signup_button.style.backgroundColor = "rgb(127, 0, 255)";

      signup_button.innerHTML = "Sign Up";
      signupform.reset();
    }, 3000);

    return false;
  }
};
// signupform coding end !
// signup email validation coding start !
var emailInput = document.getElementById("signup_email");
emailInput.onchange = function () {
  let email = document.getElementById("signup_email").value;
  let emailNotice = document.getElementById("signup_email_notice");
  let signup_button = document.getElementById("signup_button");

  if (localStorage.getItem(email) != null) {
    emailInput.style.borderBottomColor = "red";
    emailNotice.style.display = "block";
    signup_button.disabled = true;
    signup_button.style.backgroundColor = "grey";
    emailInput.onclick = function () {
      emailInput.value = "";
      signup_button.disabled = false;
      signup_button.style.backgroundColor = "rgb(127, 0, 255)";
      emailInput.style.borderBottomColor = "#ccc";
      emailNotice.style.display = "none";
    };
  }
};
// signup email validation coding end !
// login form vaidation coding start !
var loginForm = document.getElementById("login_form");
loginForm.onsubmit = function () {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;
  if (localStorage.getItem(email) == null) {
    var emailNotice = document.getElementById("login_email_notice");
    emailNotice.style.display = "block";
    let Email = document.getElementById("login_email");
    Email.onclick = function () {
      Email.value = "";
      emailNotice.style.display = "none";
    };
  } else {
    let userTextData = localStorage.getItem(email);
    let userObjData = JSON.parse(userTextData);
    let correctPassword = userObjData.password;
    let correctEmail = userObjData.email;
    if (email == correctEmail) {
      if (password == correctPassword) {
        sessionStorage.setItem("data", email);
        location.replace("./profile/profile.html");
      } else {
        var passwordNotice = document.getElementById("login_password_notice");
        passwordNotice.style.display = "block";
        var Password = document.getElementById("login_password");
        Password.onclick = function () {
          Password.value = "";
          passwordNotice.style.display = "none";
        };
      }
    }
  }
  return false;
};
// login form vaidation coding end !
