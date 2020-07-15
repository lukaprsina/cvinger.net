function build() {
    if (menu_open) {
        menu()
    }
    document.querySelectorAll(".article").forEach(item => {
        item.style.display = "none";
    });

    document.querySelectorAll(".selected_page").forEach(item => {
        item.style.visibility = "hidden";
    });

    var full_href = window.location.href;
    var query = full_href.substring(full_href.indexOf("#") + 1);

    if (query == full_href || query == "home") {
        if (window.innerWidth >= 1100) {
            document.getElementsByClassName("navbar_home-container")[0].style.display = "block";
        }
        document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
        document.getElementById("article_home").style.display = "block";

    } else {
        var selected = "nav_".concat(query);
        var article = "article_".concat(query);
        document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
        if (window.innerWidth >= 1100) {
            document.getElementsByClassName("navbar_page-container")[0].style.display = "block";
            document.getElementById(selected).getElementsByClassName("selected_page")[0].style.visibility = "visible";
        }
        document.getElementById(article).style.display = "block";
    }
}

function chk_width() {
    if (window.innerWidth >= 1100) {
        build()
    } else {
        document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
        document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
    }
}

function menu() {
    if (menu_open) {
        document.getElementsByClassName("navbar_vert-container")[0].style.display = "none";
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
        menu_open = false
    } else {
        document.getElementsByClassName("navbar_vert-container")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        menu_open = true
    }
}

function gallery(image) {
    if (image) {
        document.getElementsByClassName("gallery-image")[0].src = image;
        document.getElementsByClassName("gallery-container")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else {
        document.getElementsByClassName("gallery-container")[0].style.display = "none";
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }
}

var menu_open = false;
build();