﻿window.addEventListener("load", function () {
	var header = document.getElementById("header");
	var navSidebar = document.getElementById("mySidenav");
	var footer = document.getElementById("footer");

	header.innerHTML =
		'<ul>' +
			'<li>' +
				'<a href="javascript:void(0)" onclick="openNavigation()">' +
					'<i class="fa fa-align-justify" aria-hidden="true"></i>' +
				'</a> ' +
			'</li>' +
			'<li>' +
				'<a href="index.html">' +
					'<i id="icon" class="fa fa-home" aria-hidden="true"></i>' +
				'&nbsp;Home</a>' +
			'</li>' +
			'<li>' +
				'<a href="hrt.html">' +
					'<i id="icon" class="fa fa-user" aria-hidden="true"></i>' +
				'&nbsp;Reaction Test</a>' +
			'</li>' +
			'<li>' +
				'<a href="ctc.html">' +
					'<i id="icon" class="fa fa-circle-o" aria-hidden="true"></i>' +
				'&nbsp;Catch Circles</a>' +
			'</li>' +
			'<li style="float: right;">' +
				'<a id="time"></a>' +
			'</li>' +
            '<li>' +
                '<a href="faim.html" onclick="return false;" style="color: lightgray;">' +
                    '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>' +
                '&nbsp;Fast Aim</a>' +
            '</li>' +
		'</ul>';

	navSidebar.innerHTML =
		'<a href="javascript:void(0)" class="sidenavBarClose" style="padding: 8px 12px;" onclick="closeNavigation()">' +
			'<i class="fa fa-times"></i>' +
		'</a>' +
		'<a href="troubleshoot.html">Troubleshoot</a>' +
		'<a href="license.html">License</a>' +
		'<a href="https://github.com/Frontear/gameSite" target="_blank">GitHub</a>';

	footer.innerHTML =
		'<ul>' +
			'<li>' +
				'<a href="troubleshoot.html">' +
					'<i class="fa fa-question-circle-o" aria-hidden="true"></i>' +
				'&nbsp;Troubleshoot</a>' +
			'</li>' +
			'<li style="float: right;">' +
				'<a href="license.html">' +
					'<i id="icon" class="fa fa-info-circle" aria-hidden="true"></i>' +
				'&nbsp;License</a>' +
			'</li>' +
		'</ul>';
});

// This function is necessary for buttons. All the buttons I use link to some url, and href isn't a property they have.
function redirectToSite(urlOfSite) {
	window.open(urlOfSite, "_blank"); // Open a new tab with the specified url
}

// These two functions control the Navigation sidebar.
function openNavigation() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("mySidenav").style.border = "solid";
	document.getElementById("mainContent").style.marginLeft = "250px";
}

function closeNavigation() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("mySidenav").style.border = "hidden";
	document.getElementById("mainContent").style.marginLeft = "0";
}