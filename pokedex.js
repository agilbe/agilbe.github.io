(function() {
	"use strict";

	var BASE_URL = "http://pokeapi.co/api/v2/";
	var BASE_URL_OLD = "http://pokeapi.co/api/v1/";
	var CHANGED_URL = "http://pokeapi.co/api/v2/pokemon/?limit=100000";

	window.onload = function() {
		loadPokes();
	};

	function $(element) {
		return document.getElementById(element);
	}

	function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function printUntil(string, char) {
		return string.split(char)[0];
	}

	function ajaxHelper(f, link) {
		var ajax = new XMLHttpRequest();
		ajax.onload = f;
		ajax.open("GET", link, true);
		ajax.send(null);
	}

	function loadPokes() {
		ajaxHelper(displayPokes, CHANGED_URL);
	}

	function displayPokes() {
		var pokeInfo = JSON.parse(this.responseText).results;
		var pokeArray = [];
		var urlArray = [];
		for (var i = 0; i < pokeInfo.length; i++) {
			pokeArray.push(pokeInfo[i].name);
			urlArray.push(pokeInfo[i].url);
			
		}
		for (var i = 0; i < pokeInfo.length; i++) {
			if (urlArray[i].slice(33,-1) >= 10000) {
				return;
			}
			var pokeDiv = document.createElement("div");
			var pokeTitle = document.createElement("span");
			var pokeName = pokeArray[i]
			if (pokeArray[i]=="nidoran-f"||pokeArray[i]=="nidoran-m"||pokeArray[i]=="mr-mime"||pokeArray[i]=="mime-jr"||pokeArray[i]=="porygon-z"){
				pokeTitle.innerHTML = capitalizeFirstLetter(printUntil(pokeArray[i], "-")) + "-" + capitalizeFirstLetter(pokeArray[i].split("-")[1]);
			} else if (pokeArray[i]=="ho-oh") {
				pokeTitle.innerHTML = capitalizeFirstLetter(pokeArray[i]);
			} else {
				pokeTitle.innerHTML = capitalizeFirstLetter(printUntil(pokeArray[i], "-"));
			}
			if (pokeName=="nidoran-f"||pokeName=="nidoran-m") {
				pokeName = printUntil(pokeArray[i], "-") + pokeArray[i].split("-")[1];
			}
			if (pokeName=="deoxys-normal"||pokeName=="wormadam-plant"||pokeName=="giratina-altered"||pokeName=="shaymin-land"||pokeName=="basculin-red-striped"||
				pokeName=="darmanitan-standard"||pokeName=="tornadus-incarnate"||pokeName=="thundurus-incarnate"||pokeName=="landorus-incarnate"||
				pokeName=="keldeo-ordinary"||pokeName=="meloetta-aria"||pokeName=="meowstic-male"||pokeName=="aegislash-shield"||pokeName=="pumpkaboo-average"||
				pokeName=="gourgeist-average") {
				pokeName = printUntil(pokeName, "-");
			}
			//pokeDiv.innerHTML = pokeArray[i];
			pokeDiv.id = urlArray[i].slice(33,-1);
			var pokeImg = document.createElement("img");
			pokeImg.src = "http://www.pokestadium.com/sprites/xy/" + pokeName + ".gif";
			pokeImg.alt = pokeArray[i];
			//$("picker").appendChild(pokeImg);
			$("picker").appendChild(pokeDiv);
			pokeDiv.appendChild(pokeImg);	
			pokeDiv.appendChild(pokeTitle);
			pokeDiv.onmouseover = point;
			pokeDiv.onmouseout = unpoint;
			pokeDiv.onclick = showData;
		}
	}

	function point() {
		this.style.cursor = "pointer";
	}

	function unpoint() {
		this.style.cursor = "default";	
	}

	function showData() {
		alert(this.id);
	}



})();