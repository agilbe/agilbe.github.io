"use strict";

/*Alex Gilbert
CSE 154 AH
Winter 2016

This is the JavaScript file which provides functionality
for the Speedreader website.*/

var count = 0; //variable which counts elements in the word list
var speed = 171; //variable for speed at which words are played
var inputArea; //variable for the input box
var wordOut; //variable for the list of words
var timer; //variable for setInterval's timing
var alreadyUsed = false; //variable to check whether punctuation
						//was already fixed

//This loads with the page, allowing
//size and speed to be changed and setting buttons
//to start the process
window.onload = function() {
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	stopButton.disabled = true;
	startButton.onclick = printIndividual;
	document.getElementById("sizeBox").onchange = changeFontSize;
	document.getElementById("speedy").onchange = changeSpeed;
};

//This function begins the printing via setInterval,
//splits words, and disables buttons
function printIndividual() {
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	inputArea = document.getElementById("inputArea");
	startButton.disabled = true;
	stopButton.disabled = false;
	inputArea.disabled = true;
	wordOut = inputArea.value.split(/[ \t\n]+/);
	timer = setInterval(intervalText, speed);
}

//This function changes the animation based on the speed,
//and checks for punctuation at the end of the word
//(but only once!) It also clears the box at the end of
//the animation.
function intervalText() {
	clearInterval(timer);
	timer = setInterval(intervalText, speed);
	if (count < wordOut.length) {
		if (wordOut[count].match(/[,.!?;:]$/) && alreadyUsed === false) {
	    	wordOut[count] = wordOut[count].slice(0, -1);
	    	alreadyUsed = true;
	    	document.getElementById('outputArea').innerHTML = wordOut[count];
	    } else {
	    	alreadyUsed = false;
	    	document.getElementById('outputArea').innerHTML = wordOut[count++];
	    }
		document.getElementById("stopButton").onclick = function() {
			clearBox();
	    };
	} else {
		clearBox();
	}
}

//This function is used to empty the output box.
function clearBox() {
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	count = 0; 
	clearInterval(timer);
	document.getElementById('outputArea').innerHTML = "";
	startButton.disabled = false;
	stopButton.disabled = true;
	inputArea.disabled = false;
}

//This function is used to change font size based on
//the selected radio button.
function changeFontSize() {
    var medium = document.getElementById("medium");
	var big = document.getElementById("big");
	var bigger = document.getElementById("bigger");
	if (medium.checked){
		document.getElementById("outputArea").style.fontSize = "36pt";
	}
	if (big.checked){
		document.getElementById("outputArea").style.fontSize = "48pt";
	}
	if (bigger.checked){
		document.getElementById("outputArea").style.fontSize = "60pt";
	}
} 

//This function is used to change speed based on
//the selected dropdown value.
function changeSpeed() {
	speed = document.getElementById("speedy").value;
}