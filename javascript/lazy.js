function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function navbarVert(action) {
  var navbarVertDisplay = document.getElementsByClassName(
    "navbar_vert-container"
  )[0];
  if (action) {
    document
      .getElementsByClassName("menu-button")[0]
      .classList.add("is-active");
    navbarVertDisplay.style.display = "block";

    if (params.page && params.page != "home") {
      var currentIcon = document
        .getElementsByClassName("navbar_vert")[0]
        .getElementsByClassName("nav_".concat(params.page))[0]
        .getElementsByClassName("navbar_vert-icon")[0];
      currentIcon.style.backgroundColor =
        "rgba(" + [254, 244, 224, 0.3].join(",") + ")";
      currentIcon.style.color = "rgb(" + [152, 0, 0].join(",") + ")";
      currentIcon.style.border = "3px solid rgb(" + [152, 0, 0].join(",") + ")";
    }
    // document.getElementsByTagName("html")[0].style.overflowY = "scroll";
  } else {
    navbarVertDisplay.style.display = "none";
    document
      .getElementsByClassName("menu-button")[0]
      .classList.remove("is-active");
    // document.getElementsByTagName("html")[0].style.overflowY = "hidden";
  }
}

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == 37) {
    pshImgToUrl(moveGallery(-1));
  }

  if (e.keyCode == 39) {
    pshImgToUrl(moveGallery(1));
  }
}


function pshImgToUrl(link) {
  if (!link) {
    return;
  }
  var source = link.getElementsByTagName("img")[0].src;
  subtitle = link;
  if (params.page) {
    window.location.hash += "&image=".concat(
      source.slice(source.lastIndexOf("/") + 1)
    );
  } else {
    window.location.hash += "page=home&image=".concat(
      source.slice(source.lastIndexOf("/") + 1)
    );
  }
  genInfo();
  gallery(true);
}

function moveGallery(number) {
  genInfo();
  imageButtons = [];
  document
    .getElementById(info.article)
    .querySelectorAll(".gallery-link")
    .forEach((item) => {
      imageButtons.push(item);
    });

  var imagesLength = imageButtons.length;
  for (var i = 0; i < imagesLength; i++) {
    var listSrc = imageButtons[i].getElementsByTagName("img")[0].src;
    var gallerySrc = document.getElementsByClassName("gallery-image")[0].src;

    if (listSrc == gallerySrc) {
      var newImgNum = i + number;
      if (newImgNum >= 0 && newImgNum < imagesLength) {
        window.location.hash = info.query.replace(
          "&image=".concat(encodeURIComponent(params.image)),
          ""
        );
        return imageButtons[newImgNum];
      }
    }
  }
}

function showAuthors() {
  var text = document.getElementsByClassName("footer-text")[0];
  var button = document.getElementById("showAuthors");

  if (text.classList.contains("on")) {
    text.style.display = "none";
    setTimeout(function () {
      button.classList.remove("on");
    }, 500);
    text.classList.remove("on");
  } else {
    text.style.display = "block";
    button.classList.add("on");
    text.classList.add("on");
  }
}