(function() {
	"use strict";

	var keyArray = [];
	var defArray = [];
	var images = ['pr0.png', 'pr1.png', 'pr2.png', 'pr3.png', 'pr4.png', 'pr5.png'];
	var count = 0;
	

	window.onload = function() {
		loadTeams();
		document.onclick = showTeams2;
		$("mute").onclick = muteMusic;
		$("play").onclick = playMusic;
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

	function muteMusic() {
		$("video").innerHTML = "";
		$("mute").style.display = "none";
		$("play").style.display = "block";
	}


	function playMusic() {
		var randomSong = Math.round(Math.floor(Math.random() * 2));
		if (count == 1) {
			$("video").innerHTML = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/DGEiRFK0Tpo?autoplay=1&start=3&loop=1&playlist=DGEiRFK0Tpo" frameborder="0" allowfullscreen></iframe>';
		} else if (randomSong == 1) { 
			$("video").innerHTML = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/3IcEBZuju5E?autoplay=1&start=79&loop=1&playlist=3IcEBZuju5E" frameborder="0" allowfullscreen></iframe>';
		} else {
			$("video").innerHTML = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/DGEiRFK0Tpo?autoplay=1&start=3&loop=1&playlist=DGEiRFK0Tpo" frameborder="0" allowfullscreen></iframe>';
		}
		$("play").style.display = "none";
		$("mute").style.display = "block";
	}

	function showTeams2() {
		$("main").innerHTML = "";
		showTeams();
		if (count > 0) {
			showPic();	
		}
		if (count == 1) {
			playMusic();
		}
		count++;
	}

	function showPic() {
		var randomImage = Math.round(Math.floor(Math.random() * images.length));
		var prDiv = document.createElement("div");
		var prImg = document.createElement("img");
		prImg.src = images[randomImage];
		prDiv.appendChild(prImg);
		prDiv.style.display = "inline=block";
		prDiv.style.position = "absolute";
		prDiv.style.top = Math.round(Math.floor(Math.random() * 850)) + "px";
		var test = Math.round(Math.floor(Math.random() * 3));
		if (test == 1) {
			prDiv.style.left =  Math.round(Math.floor(Math.random() * 1000)) - 2000 + "px";
		} else if (test == 2) {
			prDiv.style.left =  Math.round(Math.floor(Math.random() * 1000)) - 750 + "px";
		} else {
			prDiv.style.left =  Math.round(Math.floor(Math.random() * 1000)) + "px";
		}
		//prDiv.style.left =  Math.round(Math.floor(Math.random() * 1000)) - 1000 + "px";
		prDiv.style.height = "100px";
		prDiv.style.width = "100px";
		$("header").appendChild(prDiv);
	}

	function showTeams() {
		var rando = Math.round(Math.floor(Math.random() * keyArray.length)); 
		//alert(rando);
		var titleDiv = document.createElement("div");
		titleDiv.id = "keyword";
		titleDiv.style.textAlign = "center";
		titleDiv.innerHTML = "<span>" + keyArray[rando] + "</span>";
		var defDiv = document.createElement("div");
		defDiv.id = "def";
		defDiv.style.textAlign = "center";
		defDiv.innerHTML = "<span>" + defArray[rando] + "</span>";
		titleDiv.style.position = "absolute";
		titleDiv.style.top = "40%";
		titleDiv.style.width = "100%";
		titleDiv.style.textAlign = "center";
		titleDiv.style.fontSize = "50pt";
		defDiv.style.position = "absolute";
		defDiv.style.top = "60%";
		defDiv.style.width = "100%";
		defDiv.style.textAlign = "center";
		defDiv.style.fontSize = "20pt";
		defDiv.style.fontStyle = "italic";
		$("main").appendChild(titleDiv);
		$("main").appendChild(defDiv);
	}

})();