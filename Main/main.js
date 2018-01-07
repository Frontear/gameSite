window.onload = function () {
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");

    header.innerHTML =
        '<ul>' +
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
}