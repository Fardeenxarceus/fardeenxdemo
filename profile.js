if (sessionStorage.getItem("data") == null) {
  location.replace("../index.html");
} else {
  // logout coding !
  let logout = document.getElementById("logout");
  logout.onclick = function () {
    let logoutText = document.getElementById("logoutText");
    sessionStorage.clear();
    logoutText.innerHTML = "Please wait....";
    location.replace("../index.html");
  };
  // profile name coding !
  var userEmail = sessionStorage.getItem("data");
  let userData = localStorage.getItem(userEmail);
  let userText = JSON.parse(userData);
  let userName = userText.username;
  let profileName = document.getElementById("username");
  profileName.innerHTML = userName;
  document.getElementById("userName").innerHTML = userName;
  // profile picture coding
  var profilePicture = document.getElementById("circle");
  var imgUrl = localStorage.getItem(userEmail + "image");
  profilePicture.style.backgroundImage = "url(" + imgUrl + ")";
  profilePicture.style.backgroundSize = "cover";
  profilePicture.style.backgroundPosition = "center";

  if (localStorage.getItem(userEmail + "image") != null) {
    let container = document.getElementById("container");
    container.style.display = "none";
  }
  // image uploader coding !
  var uploader = document.getElementById("file");

  uploader.onchange = function () {
    var file = new FileReader();
    file.readAsDataURL(uploader.files[0]);
    file.onload = function () {
      let picBox = document.getElementById("pic_box");
      let userIcon = document.getElementById("user_icon");
      var button = document.getElementById("next");
      let fileName = file.result;
      picBox.style.backgroundImage = "url(" + fileName + ")";
      picBox.style.backgroundSize = "cover";
      userIcon.style.display = "none";
      button.style.display = "block";
      button.onclick = function () {
        localStorage.setItem(userEmail + "image", fileName);
        let container = document.getElementById("container");
        container.style.display = "none";
        window.location = location.href;
      };
    };
  };
}
