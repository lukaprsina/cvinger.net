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
		"imgsrc": "images/".concat(params.page, "/", params.image)
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

	document.querySelectorAll(".navbar_page-text").forEach(item => {
		item.style.backgroundColor = "";
	});

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
			document.getElementById(info.nav).style.backgroundColor = 'rgb(' + [211,135,135,0.8].join(',') + ')';
		}
		document.getElementById(info.article).style.display = "block";
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

function navbarVert(action) {
	var navbarVertDisplay = document.getElementsByClassName("navbar_vert-container")[0]
	if (action) {
		navbarVertDisplay.style.display = "block";
		document.getElementsByTagName("html")[0].style.overflowY = "scroll";
	} else {
		navbarVertDisplay.style.display = "none";
		document.getElementsByTagName("html")[0].style.overflowY = "hidden";
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
		document.getElementsByClassName("gallery-image")[0].src = info.imgsrc;
		document.getElementsByClassName("gallery-container")[0].style.display = "block";
		document.getElementsByTagName("html")[0].style.overflowY = "hidden";
	} else {
		document.getElementsByClassName("gallery-container")[0].style.display = "none";
		document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		window.location.hash = info.query.replace("&image=".concat(params.image), "");
	}
}


function pshImgToUrl(link) {
	var source = link.getElementsByTagName("img")[0].src;
	window.location.hash += '&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	genInfo();
	gallery(true);
}

function moveGallery(number) {
	genInfo();
	images = []
	document.getElementById(info.article).querySelectorAll(".gallery-link").forEach(item => {
		images.push(item)
	});

	var imagesLength = images.length;
	for (var i=0; i < imagesLength; i++) {
		var listSrc = images[i].getElementsByTagName("img")[0].src;
		var gallerySrc = document.getElementsByClassName("gallery-image")[0].src

		if (listSrc == gallerySrc) {
			var newImgNum = i + number;
			if (newImgNum >= 0 && newImgNum < imagesLength) {
				window.location.hash = info.query.replace("&image=".concat(params.image), "");
				console.log(newImgNum)
				pshImgToUrl(images[newImgNum]);
				return;
			} else {
				// tukaj pride koda za animacijo, če je slika
				// prva ali zadnja
			}
		}
	}
}
build(false);