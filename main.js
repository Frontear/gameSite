window.addEventListener("load", function () {
	var header = document.getElementById("header");
	var navSidebar = document.getElementById("mySidenav");

	header.innerHTML =
		'<ul>' +
			'<li>' +
				// Navigation button
				'<a href="javascript:void(0)" onclick="openNavigation()">' +
					'<i class="fa fa-align-justify" aria-hidden="true"></i>' +
				'</a> ' +
			'</li>' +
			'<li>' +
				// Home button
				'<a href="index.html">' +
					'<i id="icon" class="fa fa-home" aria-hidden="true"></i>' +
				'&nbsp;Home</a>' +
			'</li>' +
			// Creation of Dropdown
			'<li class="dropdown">' +
				'<a href="javascript:void(0)" class="dropbtn">' +
					'<i class="fa fa-gamepad" aria-hidden="true"></i>' +
				'&nbsp;Games</a>' +
			// Content within dropdown
			'<div class="dropdown-content">' +
				// Reaction Time
				'<a href="hrt.html">' +
					'<i id="icon" class="fa fa-user" aria-hidden="true"></i>' +
				'&nbsp;Reaction Test</a>' +
				// Catch the Circles
				'<a href="ctc.html">' +
					'<i id="icon" class="fa fa-circle-o" aria-hidden="true"></i>' +
				'&nbsp;Catch Circles</a>' +
				// Fast Aim
				'<a href="faim.html">' +
					'<i class="fa fa-bullseye" aria-hidden="true"></i>' +
				'&nbsp;Fast Aim</a>' +
				// Breakout
                '<a href="breakout.html" style="color: lightgray;" onclick="return false;">' +
                    '<i class="fa fa-window-minimize" aria-hidden="true"></i>' +
                '&nbsp;Breakout</a>' +
			'</div>' +
			'<li style="float: right;">' +
				// The Time
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
	document.getElementById("mySidenav").style.width = "100%"; // Fully cover the screen
}

function closeNavigation() {
	document.getElementById("mySidenav").style.width = "0"; // Go back to nothing
}

/// - CodeHS Functions

// Creates a graphic text string
function createText(text, font, cX, cY, array) {
	// If the array is already defined, define it again. You may also add a remove element in the array, but removeAll() handles that for me already.
	if (array !== null && array.length == 1) { array.pop(); }
	var pText = { // This object is pushed to an array for control
		t: new Text(text, font),
	};

	// Set its x position based on the xCoordinate subtract its width divided by 2, which usually centers it at x param. Same thing for y, except divided 2 would not be needed
	pText.t.setPosition(cX - pText.t.getWidth() / 2, cY + pText.t.getHeight());
	pText.t.setColor(Color.black);

	// This is done if this function isn't supposed to push to an array (if the element won't be managed afterwards)
	// This just prevents any errors
	if (array !== null) {
		array.push(pText);
	}

	add(pText.t);
}

// Creates a smooth button, with text inside it, where c = container, and t = text
function createButton(text, font, cWidth, cHeight, cX, cY, array) {
	// If the array is already defined, define it again. You may also add a remove element in the array, but removeAll() handles that for me already.
	if (array !== null && array.length == 1) { array.pop(); }
	var pButton = { // Big nice object, which has a lot of elements
		t: new Text(text, font),
		c: new Rectangle(cWidth, cHeight),
		c1: new Circle(cHeight / 2),
		c2: new Circle(cHeight / 2),
	};

	// Center the text based on the rectangle dimensions, and self dimensions
	pButton.t.setPosition(cX - pButton.t.getWidth() / 2, cY + pButton.c.getHeight() / 2 + (pButton.t.getHeight() / 3));
	pButton.t.setColor(Color.black);

	// Set the two circles based on the rectangle x and y, making sure they dont end up offscreen or not attached correctly.
	pButton.c1.setPosition(cX - pButton.c.getWidth() / 2, cY + pButton.c.getHeight() / 2);
	pButton.c2.setPosition(cX + pButton.c.getWidth() / 2, cY + pButton.c.getHeight() / 2);

	pButton.c1.setColor(Color.gray);
	pButton.c2.setColor(Color.gray);

	pButton.c.setPosition(cX - pButton.c.getWidth() / 2, cY);
	pButton.c.setColor(Color.gray);

	// This is done if this function isn't supposed to push to an array (if the element won't be managed afterwards)
	// This just prevents any errors
	if (array !== null) {
		array.push(pButton);
	}

	// Add the big list of elements
	add(pButton.c1);
	add(pButton.c2);
	add(pButton.c);
	add(pButton.t);
}

// Returns numerous values, within an array, compared to one variable
function buttonIndex(array, compare) {
				// Derived from https://stackoverflow.com/a/13737101
				try {
					return ([array.t, array.c, array.c1, array.c2].indexOf(compare));
				}
				catch (err) { console.log(err); } // This is done if you press something that isn't within an array (pText or pButton).
			}

/// - CodeHS Functions