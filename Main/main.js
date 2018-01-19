window.addEventListener("load", function () {
	var header = document.getElementById("header");
	var navSidebar = document.getElementById("mySidenav");

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
			'<li class="dropdown">' +
				'<a href="javascript:void(0)" class="dropbtn">' +
					'<i class="fa fa-gamepad" aria-hidden="true"></i>' +
				'&nbsp;Games</a>' +
					'<div class="dropdown-content">' +
						'<a href="hrt.html">' +
							'<i id="icon" class="fa fa-user" aria-hidden="true"></i>' +
						'&nbsp;Reaction Test</a>' +
						'<a href="ctc.html">' +
							'<i id="icon" class="fa fa-circle-o" aria-hidden="true"></i>' +
						'&nbsp;Catch Circles</a>' +
						'<a href="faim.html">' +
							'<i class="fa fa-bullseye" aria-hidden="true"></i>' +
						'&nbsp;Fast Aim</a>' +
					'</div>' +
			'<li style="float: right;">' +
				'<a id="time" style="cursor: default;"></a>' +
			'</li>' +
		'</ul>';

	navSidebar.innerHTML =
		'<a href="javascript:void(0)" class="sidenavBarClose" style="padding: 8px 12px;" onclick="closeNavigation()">' +
			'<i class="fa fa-times"></i>' +
		'</a>' +
		'<a href="troubleshoot.html">Troubleshoot</a>' +
		'<a href="license.html">License</a>' +
		'<a href="https://github.com/Frontear/gameSite" target="_blank">GitHub</a>';
});

// This function is necessary for buttons. All the buttons I use link to some url, and href isn't a property they have.
function redirectToSite(urlOfSite) {
	window.open(urlOfSite, "_blank"); // Open a new tab with the specified url
}

// These two functions control the Navigation sidebar.
function openNavigation() {
	document.getElementById("mySidenav").style.width = "100%";
}

function closeNavigation() {
	document.getElementById("mySidenav").style.width = "0";
}