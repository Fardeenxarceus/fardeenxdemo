var sign = document.getElementById("sign");
var log = document.getElementById("log");
var login = document.getElementById("login");
var signup = document.getElementById("signup");
sign.onclick = function () {
  login.style.display = "none";
  signup.style.display = "block";
};
log.onclick = function () {
  signup.style.display = "none";
  login.style.display = "block";
};
