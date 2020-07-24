function genInfo() {
	var vars = window.location.hash.substr(1).split('&');
	var varsLength = vars.length
	params = {};

	for (var i=0; i < varsLength; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}

	info = {
		"article": "article_".concat(params.page),
		"query": window.location.hash.substr(1)
	};
}

function build(reload) {
	genInfo();
	// if (reload) {return;} 'ustavi funkcijo, da ne builda preveč (galerija pa to)'
	if (params.image) {
		gallery(true);
	} else {
		gallery(false);
	}

	document.querySelectorAll(".article").forEach(item => {
		item.style.display = "none";
	});

	if (!params.page || params.page == "home") {
		if (window.innerWidth >= minWidth) {
			document.getElementsByClassName("navbar_home-container")[0].style.display = "block";
		}
		document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
		document.getElementById("article_home").style.display = "block";

	} else {
		document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
		if (window.innerWidth >= minWidth) {
			document.getElementsByClassName("navbar_page-container")[0].style.display = "block";
		}
		document.getElementById(info.article).style.display = "block";
	}

	document.querySelectorAll(".gallery-link").forEach(item => {
		item.onclick = function(){getImgSrc(this)};
	});
}

function chkWidth() {
	if (window.innerWidth >= minWidth) {
		build()
	} else {
		document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
		document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
	}
}

function navbarVert(action) {
	var navbarVertDisplay = document.getElementsByClassName("navbar_vert-container")[0].style.display
	// if (navbarVertDisplay == "block") {
	if (action) {
		navbarVertDisplay = "block";
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
	} else {
		navbarVertDisplay = "none";
		// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
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

function gallery(action) {
	if (action) {
		var imgsrc = "images/".concat(params.page, "/", params.image);
		document.getElementsByClassName("gallery-image")[0].src = imgsrc;
		document.getElementsByClassName("gallery-container")[0].style.display = "block";
		// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
	} else {
		document.getElementsByClassName("gallery-container")[0].style.display = "none";
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		window.location.hash = info.query.replace("&image=".concat(params.image), "");
	}
}

function getImgSrc(link) {
	if (!params.image) {
		var source = link.getElementsByTagName("img")[0].src;
		pshSrcToUrl(source);
	}
}

function pshSrcToUrl(source) {
	window.location.hash += '&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	genInfo();
	gallery(true);
}

function moveGallery(number) {
	params.image
}

var minWidth = 1100;
build(false);