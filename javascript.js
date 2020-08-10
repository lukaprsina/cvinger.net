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
		"nav": "nav_".concat(params.page),
		"query": window.location.hash.substr(1),
		"imgsrc": "images/".concat(params.page, "/", params.image),
	};
}

function build() {
	genInfo();

	if (params.image) {
		gallery(true);
	} else {
		gallery(false);
	}
	
	document.querySelectorAll(".article").forEach(item => {
		if (item != document.getElementById(info.article)) {
			item.style.display = "none";
		}
	});

	document.querySelectorAll(".navbar_page-text").forEach(item => {
		item.style.backgroundColor = "";
	});

	document.querySelectorAll(".navbar_vert-icon").forEach(item => {
		item.style.backgroundColor = "";
		item.style.color = "";
		item.style.border = "";
	});

	if (!params.page) {
		var images = document.getElementById("article_home").getElementsByTagName("figure");
	} else {
		var images = document.getElementById(info.article).getElementsByTagName("figure");
	}

	var imagesLength = images.length;
	for (var i=0; i < imagesLength; i++) {
		images[i].getElementsByTagName("img")[0].src = images[i].getElementsByTagName("img")[0].alt;
	}
	
	if (!params.page || params.page == "home") {
		if (window.innerWidth >= 1100) {
			document.getElementsByClassName("navbar_home-container")[0].style.display = "block";
		}
		document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
		document.getElementById("article_home").style.display = "block";

	} else {
		document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
		if (window.innerWidth >= 1100) {
			document.getElementsByClassName("navbar_page-container")[0].style.display = "block";
			document.getElementsByClassName("navbar_page")[0].getElementsByClassName(info.nav)[0].style.backgroundColor = 'rgba(' + [254, 244, 224, 0.3].join(',') + ')';
			document.getElementsByClassName("navbar_page")[0].getElementsByClassName(info.nav)[0].style.transition = "box-shadow 0.2s";
		}
		document.getElementById(info.article).style.display = "block";
	}
}

function checkWidth() {
	if (window.innerWidth <= minWidth) {
		document.getElementsByClassName("navbar_page-container")[0].style.display = "none";
		document.getElementsByClassName("navbar_home-container")[0].style.display = "none";
		navbarVert(false);
	}
	build();
}

function navbarVert(action) {
	var navbarVertDisplay = document.getElementsByClassName("navbar_vert-container")[0]
	if (action) {
		navbarVertDisplay.style.display = "block";

		if (params.page && params.page != "home") {
			var currentIcon = document.getElementsByClassName("navbar_vert")[0].getElementsByClassName("nav_".concat(params.page))[0].getElementsByClassName("navbar_vert-icon")[0]
			currentIcon.style.backgroundColor = 'rgba(' + [254, 244, 224, 0.3].join(',') + ')';
			currentIcon.style.color = 'rgb(' + [152, 0, 0].join(',') + ')';
			currentIcon.style.border = '3px solid rgb(' + [152, 0, 0].join(',') + ')';
		}
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
	} else {
		navbarVertDisplay.style.display = "none";
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
		// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
		document.getElementsByClassName("gallery-image")[0].src = info.imgsrc;
		document.getElementsByClassName("gallery-container")[0].style.display = "block";
	} else {
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		document.getElementsByClassName("gallery-container")[0].style.display = "none";
		window.location.hash = info.query.replace("&image=".concat(params.image), "");
	}
}


function pshImgToUrl(link) {
	var source = link.getElementsByTagName("img")[0].src;
	if (params.page) {
		window.location.hash += '&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	} else {
		window.location.hash += 'page=home&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	}
	genInfo();
	gallery(true);
}

function moveGallery(number) {
	images = [];
	document.getElementById(info.article).querySelectorAll(".gallery-link").forEach(item => {
		images.push(item);
	});

	var imagesLength = images.length;
	for (var i=0; i < imagesLength; i++) {
		var listSrc = images[i].getElementsByTagName("img")[0].src;
		var gallerySrc = document.getElementsByClassName("gallery-image")[0].src

		if (listSrc == gallerySrc) {
			var newImgNum = i + number;
			if (newImgNum >= 0 && newImgNum < imagesLength) {
				window.location.hash = info.query.replace("&image=".concat(params.image), "");
				pshImgToUrl(images[newImgNum]);
				return;
			} else {
				// tukaj pride koda za animacijo, če je slika
				// prva ali zadnja
			}
		}
	}
}

function imageBuild() {
	document.getElementsByTagName("footer")[0].style.display = "block";
	hidePages = ["jama", "zemljevid"]
	if (hidePages.indexOf(params.page) != -1) {
		hidePages.splice(hidePages.indexOf(params.page), 1);
	} else {
		console.log("NOT FOUND");
	}
	
	hidePagesLength = hidePages.length
	for (var i=0; i < hidePagesLength; i++) {
		// document.getElementById("article_".concat(hidePages[i])).style.visibility = "hidden";
		document.getElementById("article_".concat(hidePages[i])).style.display = "block";
	}

	new Cocoen(document.querySelector('.cocoen'));
	document.getElementById("sketchfab").height = document.getElementById("sketchfab").offsetWidth;

	var map = L.map('zemljevid', {crs: L.CRS.Simple});
	var bounds = [[0,0], [936,1200]];
	var image = L.imageOverlay('images/zemljevid/zemljevid1.jpg', bounds).addTo(map);
	map.fitBounds(bounds);

	for (var i=0; i < hidePagesLength; i++) {
		document.getElementById("article_".concat(hidePages[i])).style.display = "none";
		document.getElementById("article_".concat(hidePages[i])).style.visibility = "visible";
	}
}

document.querySelectorAll(".gallery-link").forEach(item => {
	item.onclick = function(){pshImgToUrl(this)};
});

document.getElementsByClassName("gallery-image")[0].onload = function() {
	document.getElementsByClassName("gallery-control")[0].style.width = String(document.getElementsByClassName("gallery-image")[0].width).concat("px");
	document.getElementsByClassName("gallery-control")[0].style.height = String(document.getElementsByClassName("gallery-image")[0].height).concat("px");
};

var minWidth = 1100;
build();
// navbarVert(true);