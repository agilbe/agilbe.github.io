(function() {
	"use strict";

	window.onload = function() {
		document.onclick = showAlert;
	};

	function $(element) {
		return document.getElementById(element);
	}

	function showAlert() {
		var r = confirm("Do you agree to our terms and condititions?");
		if (r == true) {
			showBigBrother();
		} else {
			alert("No! You must agree to our terms to continue.");
		}
	}

	function showBigBrother() {
		var person = prompt("Please enter your name:");
		if (person != "" && person!= null) {
			$("main").innerHTML = "Welcome, " + person + ", to your new home."
			var div = document.createElement("div");
			var image = document.createElement("img");
			image.src = "https://elliotchan.files.wordpress.com/2016/03/big_brother_is_watching_wide.png";
			div.appendChild(image);
			$("main").appendChild(div);
			

		}
	}
	

})();