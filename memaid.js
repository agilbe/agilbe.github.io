(function() {
	"use strict";


	

	window.onload = function() {
		
		loadTeams();
		//document.onclick = loadTeams;
	};

	function $(element) {
		return document.getElementById(element);
	}

	function ajaxHelper(f, link) {
		var ajax = new XMLHttpRequest();
		ajax.onload = f;
		ajax.open("GET", link, true);
		ajax.send(null);
	}

	function loadTeams() {
		ajaxHelper(displayTeams, "/memaid.json");
	}

	function displayTeams() {
		alert("hello");
		teamJSON = JSON.parse(this.responseText);
		alert(teamJSON[0]);
	}

})();