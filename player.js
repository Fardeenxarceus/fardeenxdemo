if (sessionStorage.getItem("data") == null) {
  window.location.replace("../../../index.html");
} else {
  let User = sessionStorage.getItem("data");
  let video = document.getElementById("vid");
  let playBtn = document.getElementById("playBtn");
  let pauseBtn = document.getElementById("pauseBtn");
  playBtn.onclick = function () {
    video.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  };
  pauseBtn.onclick = function () {
    video.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
  };

  video.ontimeupdate = function () {
    let tDuration = this.duration;
    let cDuration = this.currentTime;
    let timing = document.getElementById("timing");
    let progressBar = document.getElementById("progressBar");
    let sec = cDuration - parseInt(cDuration / 60);
    let tSec = tDuration - parseInt(tDuration / 60);
    timing.innerHTML =
      parseInt(cDuration / 60) +
      ":" +
      sec.toFixed(0) +
      "/" +
      parseInt(tDuration / 60) +
      ":" +
      tSec.toFixed(0);
    let slidePercentage = (cDuration * 100) / tDuration;
    progressBar.style.width = slidePercentage + "%";
    if (cDuration == tDuration) {
      pauseBtn.style.display = "none";
      playBtn.style.display = "block";
    }
  };
  // open and close video adding box !
  let wrongIcon = document.getElementById("wrongIcon");
  let blackBox = document.getElementById("addingBox");
  let plusIcon = document.getElementById("plusIcon");
  plusIcon.onclick = function () {
    blackBox.style.display = "block";
    plusIcon.style.display = "none";
    wrongIcon.style.display = "block";
  };
  wrongIcon.onclick = function () {
    blackBox.style.display = "none";
    wrongIcon.style.display = "none";
    plusIcon.style.display = "block";
  };
  // add video in local storage !
  let addButton = document.getElementById("submit");
  addButton.onclick = function () {
    let blackBox = document.getElementById("addingBox");
    let videoName = document.getElementById("videoName");
    let small = document.getElementById("p");
    let videoLink = document.getElementById("videoLink");
    if (videoLink.value != "" && videoName.value != "") {
      let videoText = {
        name: videoName.value,
        link: videoLink.value,
      };
      let videoObject = JSON.stringify(videoText);
      localStorage.setItem(User + "video" + videoName.value, videoObject);
      blackBox.style.display = "none";
      p.innerHTML = videoName.value;
    }
  };
}
let video = document.getElementById("vid");

// coding of videoBox in java script !
function loadVideo() {
  let f;
  for (f = 0; f < localStorage.length; f++) {
    let allKeys = localStorage.key(f);
    if (allKeys.match("video")) {
      let text = localStorage.getItem(allKeys);
      let videoObject = JSON.parse(text);
      let box = document.createElement("DIV");
      box.setAttribute("id", "videoBox");
      let p = document.createElement("P");
      p.setAttribute("id", "p");
      p.className = "vName";
      // let small = document.createElement("SMALL");
      // small.setAttribute("id", "show");
      p.innerHTML = videoObject.name;
      let playBtn = document.createElement("BUTTON");
      playBtn.setAttribute("id", "play");
      playBtn.setAttribute("type", "button");
      playBtn.setAttribute("url", videoObject.link);
      playBtn.className = "playButton";
      playBtn.innerHTML = "Play";
      let deleteBtn = document.createElement("BUTTON");
      deleteBtn.setAttribute("id", "delete");
      deleteBtn.className = "deleteButton";
      deleteBtn.setAttribute("type", "button");
      deleteBtn.innerHTML = "Delete";
      box.appendChild(p);
      box.appendChild(playBtn);
      box.appendChild(deleteBtn);
      let bottom = document.getElementById("bottom");
      bottom.appendChild(box);
    }
  }
}
loadVideo();
//onclick video play coding

function pVideo() {
  let allVideoPlayBtn = document.getElementsByClassName("playButton");
  let i;
  for (i = 0; i < allVideoPlayBtn.length; i++) {
    allVideoPlayBtn[i].onclick = function () {
      fardeen();
      let video = document.getElementById("vid");
      let vUrl = this.getAttribute("url");
      let vSrc = document.getElementById("vSrc");
      vSrc.setAttribute("src", vUrl);
      video.load();
      video.play();
      pauseBtn.style.display = "block";
      playBtn.style.display = "none";
      this.innerHTML = "Playing...";
    };
  }
}
pVideo();
function fardeen() {
  let allVideoPlayBtn = document.getElementsByClassName("playButton");
  let i;
  for (i = 0; i < allVideoPlayBtn.length; i++) {
    allVideoPlayBtn[i].innerHTML = "Play";
  }
}
function del() {
  let deleteButton = document.getElementsByClassName("deleteButton");
  let i;
  for (i = 0; i < deleteButton.length; i++) {
    deleteButton[i].onclick = function () {
      let User = sessionStorage.getItem("data");
      let parent = this.parentElement;
      parent.className = "animate__animated animate__flash";
      let parentElement = parent.getElementsByTagName("P")[0].innerHTML;
      localStorage.removeItem(User + "video" + parentElement);
      setTimeout(() => {
        parent.remove();
      }, 1000);
    };
  }
}
del();
// next button coding !
function next() {
  let nextBtn = document.getElementById("rightBtn");
  nextBtn.onclick = function () {
    let allPlayBtn = document.getElementsByClassName("playButton");
    let f;
    for (f = 0; f < allPlayBtn.length; f++) {
      if (allPlayBtn[f].innerHTML == "Playing...") {
        let parent = allPlayBtn[f].parentElement.nextSibling;
        let parentElement = parent.getElementsByClassName("playButton")[0];
        parentElement.click();
        return false;
      }
    }
  };
}
next();
function previous() {
  let nextBtn = document.getElementById("leftBtn");
  nextBtn.onclick = function () {
    let allPlayBtn = document.getElementsByClassName("playButton");
    let f;
    for (f = 0; f < allPlayBtn.length; f++) {
      if (allPlayBtn[f].innerHTML == "Playing...") {
        let parent = allPlayBtn[f].parentElement.previousSibling;
        let parentElement = parent.getElementsByClassName("playButton")[0];
        parentElement.click();
        return false;
      }
    }
  };
}
previous();
function volume() {
  let volumeBtn = document.getElementById("volume");
  volumeBtn.onclick = function () {
    let range = document.getElementById("range");
    if (range.style.display == "none") {
      range.style.display = "block";
      volumeBtn.style.marginLeft = "0px";
      range.oninput = function () {
        video.volume = this.value;
      };
    } else {
      volumeBtn.style.marginLeft = "95px";
      range.style.display = "none";
    }
  };
}
volume();
// fullscreen
let fullscreen = document.getElementById("fullscreen");
fullscreen.onclick = function () {
  video.requestFullscreen();
};
// progress bar coding !
let progressBox = document.getElementById("progressBox");
progressBox.onclick = function (event) {
  let per = event.offsetX / this.offsetWidth;
  video.currentTime = per * video.duration;
};
function speed() {
  let speedBtn = document.getElementById("speedIcon");
  speedBtn.onclick = function () {
    let range = document.getElementById("speedRange");
    if (range.style.display == "none") {
      range.style.display = "block";
      speedBtn.style.marginLeft = "0px";
      range.oninput = function () {
        video.playbackRate = this.value;
      };
    } else {
      speedBtn.style.marginLeft = "95px";
      range.style.display = "none";
    }
  };
}
speed();
function search() {
  let search = document.getElementById("search");
  search.oninput = function () {
    let videoTitle = document.getElementsByClassName("vName");
    let f;
    for (f = 0; f < videoTitle.length; f++) {
      if (
        videoTitle[f].innerHTML.toUpperCase().match(search.value.toUpperCase())
      ) {
        videoTitle[f].parentElement.style.display = "block";
      } else {
        videoTitle[f].parentElement.style.display = "none";
      }
    }
  };
}
search();
