if (sessionStorage.getItem("data") == null) {
  window.location.replace("../../../index.html");
} else {
  var User = sessionStorage.getItem("data");
  let circle = document.getElementById("profileImage");
  let url = localStorage.getItem(User + "image");
  circle.style.backgroundImage = "url(" + url + ")";
  circle.style.backgroundSize = "cover";

  circle.style.backgroundPosition = "center";
  var plusIcon = document.getElementById("addContactIcon");
  plusIcon.onclick = function () {
    var bgBlack = document.getElementById("blackBox");
    bgBlack.style.display = "block";
    var closeButton = document.getElementById("close");
    closeButton.onclick = function () {
      var bgBlack = document.getElementById("blackBox");
      bgBlack.style.display = "none";
    };
  };
  const addButton = document.getElementById("add");
  addButton.onclick = function () {
    let cName = document.getElementById("cName");
    let cNum = document.getElementById("cNum");
    if (cNum.value != "" && cName.value != "") {
      var contactInformation = { name: cName.value, number: cNum.value };
      var jsonText = JSON.stringify(contactInformation);
      localStorage.setItem(User + "_contact" + cName.value, jsonText);
    } else {
      let notice = document.getElementById("notice");
      notice.style.display = "block";
      return false;
    }
  };
  function addingContact() {
    var a;
    for (a = 0; a < localStorage.length; a++) {
      let allKeys = localStorage.key(a);
      if (allKeys.match(sessionStorage.getItem("data") + "_contact")) {
        let jsonText = localStorage.getItem(allKeys);
        let obj = JSON.parse(jsonText);
        let contactBox = document.createElement("DIV");
        contactBox.setAttribute("id", "contact");
        let nameP = document.createElement("P");
        nameP.setAttribute("class", "contactName");
        let nameI = document.createElement("I");

        nameI.setAttribute("class", "fa-solid fa-user");
        let toolDiv = document.createElement("DIV");
        toolDiv.setAttribute("id", "tool");
        let edit = document.createElement("I");
        edit.setAttribute("class", "fas fa-edit edit");
        let trash = document.createElement("I");
        trash.setAttribute("class", "fas fa-trash del");
        let hr = document.createElement("HR");
        hr.setAttribute("width", "75%");
        hr.setAttribute("size", "1");
        hr.setAttribute("color", "purple");
        let numberP = document.createElement("P");
        let numberI = document.createElement("I");

        numberI.setAttribute("class", "fas fa-mobile-alt");
        let allContactBox = document.getElementById("allContactBox");
        nameP.appendChild(nameI);
        nameP.innerHTML += obj.name;
        toolDiv.appendChild(edit);
        toolDiv.appendChild(trash);
        numberP.appendChild(numberI);
        numberP.innerHTML += obj.number;
        contactBox.appendChild(nameP);
        contactBox.appendChild(toolDiv);
        contactBox.appendChild(hr);
        contactBox.appendChild(numberP);
        allContactBox.appendChild(contactBox);
      }
    }
  }
  addingContact();
  let search = document.getElementById("search");
  search.oninput = function () {
    let allContactsName = document.getElementsByClassName("contactName");
    let i;
    for (i = 0; i < allContactsName.length; i++) {
      if (
        allContactsName[i].innerHTML
          .toUpperCase()
          .match(search.value.toUpperCase())
      ) {
        allContactsName[i].parentElement.style.display = "block";
      } else {
        allContactsName[i].parentElement.style.display = "none";
      }
    }
  };
  let del = document.getElementsByClassName("del");
  let i;
  for (i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      let User = sessionStorage.getItem("data");
      let parent = this.parentElement.parentElement;
      let pElement = parent.getElementsByClassName("contactName")[0];
      let userName = pElement.innerHTML.replace(
        '<i class="fa-solid fa-user"></i>',
        ""
      );
      localStorage.removeItem(User + "_contact" + userName.trim());
      parent.className = "animate__animated animate__flash";
      setTimeout(() => {
        parent.remove();
      }, 1000);
    };
  }
  function edit() {
    let edit = document.getElementsByClassName("edit");
    let i;
    for (i = 0; i < edit.length; i++) {
      edit[i].onclick = function () {
        let cName = document.getElementById("cName");
        let cNum = document.getElementById("cNum");
        let parent = this.parentElement.parentElement;
        let plusIcon = document.getElementById("addContactIcon");
        var closeButton = document.getElementById("close");
        let addButton = document.getElementById("add");
        let heading = document.getElementById("cHeading");
        let pera = parent.getElementsByTagName("P");
        let name = pera[0].innerHTML
          .replace('<i class="fa-solid fa-user"></i>', "")
          .trim();
        let number = pera[1].innerHTML
          .replace('<i class="fas fa-mobile-alt"></i>', "")
          .trim();
        cName.value = name;
        cNum.value = number;
        plusIcon.click();
        closeButton.style.display = "none";
        heading.innerHTML = "Edit Your Contact";
        addButton.innerHTML = "Update";
        localStorage.removeItem(User + "_contact" + name.trim());
      };
    }
  }
  edit();
}
