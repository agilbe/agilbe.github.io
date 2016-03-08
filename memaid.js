(function() {
	"use strict";

	var keyArray = [];
	var defArray = [];
	

	window.onload = function() {
		loadTeams();
		document.onclick = showTeams;
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
		ajaxHelper(populateTeams, "http://agilbe.github.io/memaid.json");
	}

	function populateTeams() {
		var team = JSON.parse(this.responseText);
		keyArray = Object.keys(team);
		for (var i = 0; i < keyArray.length; i++) {
			defArray.push(team[keyArray[i]]);
		}
		showTeams();
	}

	function showTeams() {
		$("main").innerHTML = "";
		var rando = Math.round(Math.floor(Math.random() * keyArray.length)); 
		//alert(rando);
		var titleDiv = document.createElement("div");
		titleDiv.id = "keyword";
		titleDiv.style.textAlign = "center";
		titleDiv.innerHTML = keyArray[rando];
		var defDiv = document.createElement("div");
		defDiv.id = "def";
		defDiv.style.textAlign = "center";
		defDiv.innerHTML = defArray[rando];
		titleDiv.style.position = "absolute";
		titleDiv.style.top = "40%";
		titleDiv.style.width = "100%";
		titleDiv.style.textAlign = "center";
		titleDiv.style.fontSize = "50pt";
		defDiv.style.position = "absolute";
		defDiv.style.top = "60%";
		defDiv.style.width = "100%";
		defDiv.style.textAlign = "center";
		$("main").appendChild(titleDiv);
		$("main").appendChild(defDiv);
	}

})();