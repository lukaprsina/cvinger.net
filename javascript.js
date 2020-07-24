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

	var query = window.location.hash.substr(1);
	var params = getParams();
	var page = params.page;
	var image = params.image;

	if (!page || page == "home") {
		if (window.innerWidth >= 1100) {
			document.getElementsByClassName("navbar_home-container")[0].style.display = "block";
		}
		document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
		document.getElementById("article_home").style.display = "block";

	} else {
		var selected = "nav_".concat(page);
		var article = "article_".concat(page);
		document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
		if (window.innerWidth >= 1100) {
			document.getElementsByClassName("navbar_page-container")[0].style.display = "block";
			document.getElementById(selected).getElementsByClassName("selected_page")[0].style.visibility = "visible";
		}
		document.getElementById(article).style.display = "block";
	}

	if (params.image) {
		gallery(true);
	} else {
		gallery(false);
	}

	document.querySelectorAll(".gallery-link").forEach(item => {
		item.onclick = function(){pshImgToUrl(this)};
	});
}

function chkWidth() {
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
		document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		menu_open = false
	} else {
		document.getElementsByClassName("navbar_vert-container")[0].style.display = "block";
		document.getElementsByTagName("html")[0].style.overflowY = "hidden";
		menu_open = true
	}
}

function gallery(action) {
	var params = getParams();
	if (action) {
		var imgsrc = "images/".concat(params.page, "/", params.image);
		document.getElementsByClassName("gallery-image")[0].src = imgsrc;
		document.getElementsByClassName("gallery-container")[0].style.display = "block";
		// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
	} else {
		var query = window.location.hash.substr(1);
		document.getElementsByClassName("gallery-container")[0].style.display = "none";
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		window.location.hash = query.replace("&image=".concat(params.image), "");
	}
}

function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == 37) {
		moveGallery(-1);	
	}

	if (e.keyCode == 39) {
		moveGallery(1);
	}
}

function moveGallery(number) {
	var params = getParams();
	let list = [...document.getElementsByClassName("gallery-link")];
	var newImage = list.indexOf(element) + number; //če ravno naložiš stran, element še ne obstaja
	if (newImage >= 0 && newImage < list.length) {
		console.log(list[newImage]);
	}
}

function pshImgToUrl(link) {
	var params = getParams();
	var image = params.image;
	element = link; //global variable
	if (!image) {
		var source = link.getElementsByTagName("img")[0].src;
		window.location.hash += '&image='.concat(source.slice(source.lastIndexOf("/") + 1));
		gallery(true);
	}
}

function getParams() {
	params = {};
	var query = window.location.hash.substr(1);
	var vars = query.split('&');
	for (var i=0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
}

var menu_open = false;
build();