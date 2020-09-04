function init() {
	genInfo();
	document.querySelectorAll("#article_literatura a").forEach(item => {
		item.setAttribute("target", "_blank");
	});

	document.querySelectorAll(".gallery-link").forEach(item => {
		item.onclick = function(){pshImgToUrl(this)};
	});

	document.getElementsByClassName("gallery-image")[0].onload = function() {
		document.getElementsByClassName("gallery-control")[0].style.width = String(document.getElementsByClassName("gallery-image")[0].width).concat("px");
		document.getElementsByClassName("gallery-control")[0].style.height = String(document.getElementsByClassName("gallery-image")[0].height).concat("px");
	};

	document.querySelectorAll(".navbar_page a, .navbar_home a").forEach(item => {
		item.onclick = function() {scrollToTop();};
	});

	document.querySelectorAll(".tabs").forEach(item => {
		switchTab(item.getElementsByClassName("tab")[0], 0);
	});

	minWidth = 1100;


	subtitle = "";
	markers = [
		{x:282, y:210, text:"Uvodna tabla Meniška vas"},
		{x:525, y:224, text:"Vmesna tabla Meniška vas"},
		{x:813, y:233, text:"Uvodna tabla osnovna šola"},
		{x:585, y:276, text:"Vmesna tabla osnovna šola"},
		{x:468, y:294, text:"Informativna tabla prazgodovinsko gradišče"},
		{x:520, y:285, text:"Informativna tabla apnenice"},
		{x:510, y:310, text:"Informativna tabla Cvingerska jama"},
		{x:525, y:383, text:"Vmesna tabla utrjen vhod"},
		{x:520, y:411, text:"Informativna tabla utrjen vhod"},
		{x:522, y:501, text:"Informativna tabla talilniško območje"},
		{x:643, y:633, text:"Informativna tabla gomilno grobišče"},
		{x:831, y:664, text:"Uvodna tabla pokopališče"}
	];
}

function scrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

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
		var images = document.getElementById("article_home").getElementsByClassName("image");
	} else {
		var images = document.getElementById(info.article).getElementsByClassName("image");
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
	new Cocoen(document.querySelector('.cocoen'));
	build();
}

function navbarVert(action) {
	var navbarVertDisplay = document.getElementsByClassName("navbar_vert-container")[0]
	if (action) {
		document.getElementsByClassName("menu-button")[0].classList.add("is-active");
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
		document.getElementsByClassName("menu-button")[0].classList.remove("is-active");
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

function gallery(action) {
	if (action) {
		// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
		document.getElementsByClassName("gallery-image")[0].src = info.imgsrc;
		if (subtitle) {
			var caption = subtitle.parentElement.getElementsByTagName("figcaption")[0].innerHTML;
			document.getElementsByClassName("gallery-subtitle")[0].innerHTML = caption;		
		}
		document.getElementsByClassName("gallery-container")[0].style.display = "block";
	} else {
		genInfo();
		// document.getElementsByTagName("html")[0].style.overflowY = "scroll";
		document.getElementsByClassName("gallery-container")[0].style.display = "none";
		window.location.hash = decodeURIComponent(info.query).replace("&image=".concat(params.image), "");
	}
}

function pshImgToUrl(link) {
	if (!link) {return;}
	var source = link.getElementsByTagName("img")[0].src;
	subtitle = link
	if (params.page) {
		window.location.hash += '&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	} else {
		window.location.hash += 'page=home&image='.concat(source.slice(source.lastIndexOf("/") + 1));
	}
	genInfo();
	gallery(true);
}

function moveGallery(number) {
	genInfo();
	imageButtons = [];
	document.getElementById(info.article).querySelectorAll(".gallery-link").forEach(item => {
		imageButtons.push(item);
	});

	var imagesLength = imageButtons.length;
	for (var i=0; i < imagesLength; i++) {
		var listSrc = imageButtons[i].getElementsByTagName("img")[0].src;
		var gallerySrc = document.getElementsByClassName("gallery-image")[0].src

		if (listSrc == gallerySrc) {
			var newImgNum = i + number;
			if (newImgNum >= 0 && newImgNum < imagesLength) {
				window.location.hash = info.query.replace("&image=".concat(encodeURIComponent(params.image)), "");
				return imageButtons[newImgNum];
			}
		}
	}
}

function showAuthors() {
	var text = document.getElementsByClassName("footer-text")[0];
	var button = document.getElementById("showAuthors");
	if (text.classList.contains("on")) {
		setTimeout(function(){button.classList.remove("on");}, 500);
		text.classList.remove("on");
	} else {
		button.classList.add("on");
		text.classList.add("on");
	}
}

function onloadBuild() {

	function openPDF(e) {
		window.open("documents/table/".concat(e.target._tooltip._content.replace(/ /g,"_"), ".pdf"));
	}

	function test(e) {
		console.log(e)
	}

	hidePages = ["jama", "zemljevid"]
	if (hidePages.indexOf(params.page) != -1) {
		hidePages.splice(hidePages.indexOf(params.page), 1);
	}
	
	hidePagesLength = hidePages.length;
	for (var i=0; i < hidePagesLength; i++) {
		document.getElementById("article_".concat(hidePages[i])).style.visibility = "hidden";
		document.getElementById("article_".concat(hidePages[i])).style.display = "block";
	}

	new Cocoen(document.querySelector('.cocoen'));

	bounds = [[0,0], [937,1201]];
	map = L.map('zemljevid', {
		crs: L.CRS.Simple,
		tileSize: 2000,
		zoomDelta: 0.5,
		maxZoom: 2,
	});

	var image = L.imageOverlay('images/zemljevid/zemljevid.jpg', bounds).addTo(map);
	map.fitBounds(bounds);

	var markersLength = markers.length;
	var offset = 9;
	for (var i=0; i < markersLength; i++) {
		info = L.circle([bounds[1][0] - markers[i].y - offset, markers[i].x + offset], {
    		color: 'blue',
    		fillColor: 'lightblue',
    		fillOpacity: 0.5,
    		radius: 10
		}).addTo(map);
		
		info.bindTooltip(markers[i].text, {
			direction: "right",
			offset: [20,0],
		});

		info.on("click", openPDF);
	}

	for (var i=0; i < hidePagesLength; i++) {
		document.getElementById("article_".concat(hidePages[i])).style.display = "none";
		document.getElementById("article_".concat(hidePages[i])).style.visibility = "visible";
	}
}

function switchTab(element, number) {
	var tabs = element.parentElement.getElementsByClassName("tab");
	var tabsLength = tabs.length;

	for (var i=0; i < tabsLength; i++) {
		if (number != i) {
			tabs[i].classList.remove("on");
			element.parentElement.parentElement.querySelectorAll(".tabs-content>*")[i].style.display = "none";
		} else {
			tabs[i].classList.add("on");
			element.parentElement.parentElement.querySelectorAll(".tabs-content>*")[i].style.display = "block";
		}
	}
}

init();
build();