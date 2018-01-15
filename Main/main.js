window.addEventListener("load", function () {
	var header = document.getElementById("header");
	var footer = document.getElementById("footer");

	header.innerHTML =
		'<ul>' +
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
						'<a href="faim.html" onclick="return false;" style="color: lightgray;">' +
							'<i class="fa fa-bullseye" aria-hidden="true"></i>' +
						'&nbsp;Fast Aim</a>' +
					'</div>' +
			'<li style="float: right;">' +
				'<a id="time"></a>' +
			'</li>' +
		'</ul>';

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