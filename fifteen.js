"use strict";

/*Alex Gilbert
CSE 154 AH
Winter 2016

This is the javascript page which adds functionality (and some style) 
to my Fifteen Puzzle.

Extra feature implemented: background chooser/multiple backgrounds */

(function() {
	var EMPTY_ROW = 3; //row position of the empty square
	var EMPTY_COLUMN = 3; //column position of the empty square
	var NUM_RC = 4; //total number of rows and columns
	var SIZE = 100; //size of each div/square (including the borders)

	//On page load, this populates the tiles and adds a dropdown menu for
	//selecting the background image.
	//It also shuffles the tiles upon clicking the shuffle button.
	window.onload = function() {
		populateTiles();
		document.getElementById("shufflebutton").onclick = shuffleTiles;
		dropDown();
		document.getElementById("selector").onchange = changeBackground;
	};

	//This function creates and positions the tiles inside the puzzle area.
	//It also styles each square and can change the pointer and colors
	//inside each square.
	function populateTiles() {
		var tileHeight = 0;
		for (var i = 0; i < 15; i++) {
			var tile = document.createElement("div");
			tile.className = "tile";
			tile.style.position = "absolute";
			var tilePosition = i + 1;
			tileHeight = 0;
			//the algorithm here allows me to assign positions correctly
			while (tilePosition > NUM_RC) { //after placing the 4th tile
				tilePosition -= NUM_RC; //reset the counter to 1
				tileHeight++; //keeps track of the new row
			}
			var xpos = ((tilePosition - 1) * SIZE); //assigns a position based tile #
			var ypos = (tileHeight * SIZE);
			//the next line assigns an id based on position
			tile.id = "square_" + xpos/SIZE + "_" + ypos/SIZE; 
			tile.style.left = xpos + "px";
			tile.style.top = ypos + "px";
			tile.style.backgroundImage = "url('background.jpg')";
			tile.style.backgroundPosition = (xpos * -1) + "px " + (ypos * -1) + "px";
			tile.appendChild(document.createTextNode(i + 1));
			document.getElementById("puzzlearea").appendChild(tile);
			//These will add event handlers to every tile
			document.getElementById(tile.id).onmouseover = color;
			document.getElementById(tile.id).onmouseout = uncolor;
			document.getElementById(tile.id).onclick = moveToEmpty;
		}
	}

	//This function shuffles the tiles by moving a random square that is
	//adjacent to the blank square into that square... over and over.
	function shuffleTiles() {
		for (var j = 0; j < 1000; j++) {
			var neighbors = [];
			var movable = document.querySelectorAll(".tile");
			for (var i = 0; i < movable.length; i++) {
				if (adjacentToEmpty(movable[i].id)) {
					neighbors.push(movable[i].id); //adds adjacent squares to an array
				}
			}
			var rand = parseInt(Math.random() * (neighbors.length));
			moveToEmpty(neighbors[rand]); //randomly picks a square from the array to move
		}

	}

	//This function, after checking whether the square is adjacent to
	//a blank space, swaps the square with the blank space
	//and upates the square's id.
	//It either takes in a parameter or is called on event.
	function moveToEmpty(squareID) {
		var square = this;
		var isParameter = false;
		//This if statement checks whether the user has already won.
		//If so, it clears the congratulatory message.
		if (document.getElementById("winner")){
			var element = document.getElementById("winner");
			element.parentNode.removeChild(element);
			document.body.style.backgroundImage = "url('backgroundimage.jpg')";
			document.body.style.color = "white";
		}
		//This if statement checks whether it's taking in a parameter
		//or being called as response to an .onclick
		if ((typeof squareID) == "string") {
			square = document.getElementById(squareID);
			isParameter = true;
		}
		var oldEmptyRow = EMPTY_ROW;
		var oldEmptyColumn = EMPTY_COLUMN;
		var currentTileRow = square.id.substring(7, 8);
		var currentTileColumn = square.id.substring(9);
		if (adjacentToEmpty(square.id)) {
			square.style.left = EMPTY_ROW * SIZE + "px"; //repositions the tile
			square.style.top = EMPTY_COLUMN * SIZE + "px";
			EMPTY_ROW = currentTileRow; //updated with the new empty position
			EMPTY_COLUMN = currentTileColumn;
			square.id = "square_" + oldEmptyRow + "_" + oldEmptyColumn;
			if (!isParameter) {
				if (checkSolved()) {
					//alert("u win");
					displayWin();
				}
			}
		}
		
	}

	//Colors the number and border and changes the pointer
	//when the mouse hovers over a tile adjacent to the blank space.
	function color() {
		if (adjacentToEmpty(this.id)) {
			this.style.color = "red";
			this.style.cursor = "pointer";
			this.style.border = "5px solid red";
		} else {
			this.style.cursor = "default";
		}
		
	}

	//Turns the number, border, and pointer back to default
	//for a square that has been colored.
	function uncolor() {
		if (adjacentToEmpty(this.id)) {
			this.style.color = "black";
			this.style.cursor = "default";
			this.style.border = "5px solid black";
		}
	}

	//Creates the dropdown menu and its options, as well as its 
	//own div between the puzzle area and the shuffle button.
	function dropDown() {
		//This adds a div with a selector after the puzzle & before the shuffle button
		var newDiv = document.createElement("div");
		newDiv.id = "selectImage";
		var selector = document.createElement("select");
		selector.id = "selector";
		newDiv.appendChild(document.createTextNode("Choose a background!"));
		newDiv.appendChild(document.createElement("br"));
		newDiv.appendChild(selector);
		document.body.insertBefore(newDiv, document.getElementById("controls"));
		//Here, we'll add options to the dropwdown menu
		var originalBackground = document.createElement('option');
		originalBackground.value = "background.jpg";
		originalBackground.innerHTML = "background.jpg";
		originalBackground.selected = "selected";
		selector.appendChild(originalBackground);
		//adding additional backgrounds using absolute URLs
		var websterURL = "https://webster.cs.washington.edu/students/agilbe/hw4/";
		var numAdditionalBackgrounds = 4;
		for (var i = 1; i <= numAdditionalBackgrounds; i++) {
		    var opt = document.createElement('option');
		    opt.value = websterURL + "background" + (i + 1) + ".gif";
		    opt.innerHTML = "background" + (i + 1) + ".gif";
		    selector.appendChild(opt);
		}
	}

	//Changes the background of each of the tiles based on
	//the selected dropdown value.
	function changeBackground() {
		var tiles = document.querySelectorAll(".tile");
		var imageName = document.getElementById("selector").value;
		for (var i = 0; i <= tiles.length; i++) {
			tiles[i].style.backgroundImage = "url('" + imageName + "')";
		}
	}

	//Checks if the square passed in is adjacent to the empty
	//tile by comparing IDs and checking whether it's one
	//away horizontally or vertically - but not both, because that'd be a diagonal.
	function adjacentToEmpty(squareID) {
		var horizontal = Math.abs(EMPTY_ROW - squareID.substring(7, 8));
		var vertical = Math.abs(EMPTY_COLUMN - squareID.substring(9));
		if (horizontal <= 1 && vertical <= 1) {
			if (horizontal != vertical) {
				return true;
			}
		}
	}

	//This function checks if the puzzle has been solved by comparing the innerHTML of
	//each square to a counter, returning false if there is a null (indicating that
	//the tile('s id) doesn't exist)) 
	function checkSolved() {
		var counter = 1;
		for (var i = 0; i < NUM_RC; i++) {
			for (var j = 0; j < NUM_RC; j++) {
				if (NUM_RC*NUM_RC > counter) {
					var tile = document.getElementById("square_" + j + "_" + i)
					if (!tile || tile.innerHTML != counter)  {
						return false;
					}
				}
			counter++
			}
		}
		return true;
	}

	//This function adds a div if the puzzle has been completed
	//in order to congratulate the user.
	function displayWin() {
		var newDiv = document.createElement("div");
		newDiv.id = "winner";
		newDiv.appendChild(document.createTextNode("Congratulations, a winner is you!"));
		document.body.insertBefore(newDiv, document.getElementById("selectImage"));
		document.body.style.backgroundImage = "url('http://i.imgur.com/rn0jwDl.png')";
		//document.body.style.backgroundAttachment = "fixed";
		document.body.style.color = "black";
	}

})();

