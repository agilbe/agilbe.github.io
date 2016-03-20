(function() {
	"use strict";

	window.onload = function() {
		//addBack();
		loadToC();
	};
	
	function $(element) {
		return document.getElementById(element);
	}

	function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function addBack() {
		var rand = Math.round(Math.floor(Math.random() * 4));
		rand++;
		document.body.style.backgroundImage = "url('Elegant_Background-" + rand + ".jpg')";
		//document.body.style.backgroundColor = "blue";
	}

	function loadToC() {
		var examples = document.querySelectorAll(".example");
		for (var i = 0; i < examples.length; i++) {
			//alert(examples[i].id);
			var content = document.createElement("span");
			content.style.width = 80/examples.length + "%";
			/*var link = document.createElement("link");
			link.href = "#" + examples[i].id;
			link.innerHTML = "test";
			alert(link.innerHTML);
			content.appendChild(link);*/
			content.innerHTML = "<a href=\"#" + examples[i].id + "\">" + examples[i].id + "</a>";
			//alert(content.innerHTML);
			content.className = "content";
			$("tableofcontents").appendChild(content);
		}
	}

})();