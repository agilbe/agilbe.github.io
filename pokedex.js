(function() {
	"use strict";

	var BASE_URL = "http://pokeapi.co/api/v2/";
	var BASE_URL_OLD = "http://pokeapi.co/api/v1/";
	var CHANGED_URL = "http://pokeapi.co/api/v2/pokemon/?limit=100000";
	var pokeArray = [];
	var urlArray = [];
	var nameArray = [];
	var currentSpeciesInfo = "";
		
	
	window.onload = function() {
		loadPokes();
		$("search").oninput = searchPokes;
		document.onclick = focusBox;
	};

	function focusBox() {
		$("search").focus();
	}

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
			pokeTitle.className = "pokeSpan";
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
			nameArray.push(pokeName);
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
		//alert("fuck you, this Pokemon is #" + this.id + " in the national Pokedex");
		$("search").value = '';
		$("search").focus();
		ajaxHelper(displayInfo, BASE_URL + "pokemon/" + this.id + "/");
	}

	function displayInfo() {
		var specPokeInfo = JSON.parse(this.responseText);
		$("tester").innerHTML = "";
		//$("tester").innerHTML = this.responseText;
		$("main").innerHTML = "";
		//alert(specPokeInfo.id - 1);
		loadSpeciesInfo(specPokeInfo.id);
		//$("tester").innerHTML = currentSpeciesInfo;
		//var currentSpeciesJson = JSON.parse(currentSpeciesInfo);
		//alert(currentSpeciesJson.id);
		var overviewDiv = document.createElement("div");
		overviewDiv.id = "overview";
		overviewDiv.style.textAlign = "center";
		//overviewDiv.style.fontWeight = "bold";
		var overviewSpan = document.createElement("h2");
		var overviewImg = document.createElement("img");
		overviewImg.src = "http://www.pokestadium.com/assets/img/sprites/official-art/large/" + nameArray[specPokeInfo.id - 1] + ".png";
		//overviewImg.src = "http://www.pokestadium.com/sprites/xy/" + nameArray[specPokeInfo.id - 1] + ".gif"
		overviewImg.alt = nameArray[specPokeInfo.id - 1];
		overviewImg.style.width = "25%";
		overviewImg.style.height = "25%";
		var overviewDesc = document.createElement("div");
		//overviewDesc.innerHTML = currentSpeciesInfo.flavor_text_entries;
		overviewSpan.innerHTML = capitalizeFirstLetter(nameArray[specPokeInfo.id - 1]);
		overviewDiv.appendChild(overviewSpan);
		overviewDiv.appendChild(overviewImg);
		$("main").appendChild(overviewDiv);
	}

	function loadSpeciesInfo(id) {
		ajaxHelper(pullSpecies, BASE_URL + "pokemon-species/" + id + "/"); 
	}

	function pullSpecies() {
		currentSpeciesInfo = this.responseText;
		//$("tester").innerHTML = currentSpeciesInfo;
	}

	function searchPokes() {
		//alert ("hi");
		var searchName = this.value.toLowerCase();
		var allNames = document.querySelectorAll(".pokeSpan");
		//var allNames = document.getElementsByClassName("pokeSpan");
		//alert(this.value);
		//alert(allNames[0].innerHTML);
		for (var i = 0; i < allNames.length; i++) {
			if (allNames[i].innerHTML.toLowerCase().indexOf(searchName) > -1) {
				//alert(allNames[i].innerHTML);
				//alert(i+1);
				$(i+1).style.display = "block";

			} else {
				$(i+1).style.display = "none";
			}
		}
	}


})();