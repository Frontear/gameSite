window.onload = function () {
    document.getElementById("header").innerHTML =
        '<ul>' +
            '<li>' +
                '<a href="index.html">' +
                    '<i id="icon" class="fa fa-home" aria-hidden="true"></i>' +
                '&nbsp;Home</a>' +
            '</li>' +
            '<li>' +
                '<a href="hrt.html">' +
                    '<i id="icon" class="fa fa-user" aria-hidden="true"></i>' +
                '&nbsp;Human Reaction</a>' +
            '</li>' +
            '<li>' +
                '<a href="ctc.html">' +
                    '<i id="icon" class="fa fa-circle-o" aria-hidden="true"></i>' +
                '&nbsp;Catch Circles</a>' +
            '</li>' +
            '<li style="float: right;">' +
                '<a id="time"></a>' +
            '</li>' +
		'</ul>';

	document.getElementById("footer").innerHTML =
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
}