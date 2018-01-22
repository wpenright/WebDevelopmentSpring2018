
(function () {
	"use strict";

	// Taken from https://en.wikipedia.org/wiki/Lorem_ipsum
	var lorem_ipsem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

	var third_content = "This is the third thing";
	
	// Taken from https://en.wikipedia.org/wiki/99_Bottles_of_Beer
	var bottles_verse_1 = "99 bottles of beer on the wall, 99 bottles of beer. Take one down, pass it around, 98 bottles of beer on the wall..."
	var bottles_verse_2 = "98 bottles of beer on the wall, 98 bottles of beer. Take one down, pass it around, 97 bottles of beer on the wall..."
	var bottles_verse_3 = "97 bottles of beer on the wall, 97 bottles of beer. Take one down, pass it around, 96 bottles of beer on the wall..."
	var bottles_verse_4 = "96 bottles of beer on the wall, 96 bottles of beer. Take one down, pass it around, 95 bottles of beer on the wall..."

	var right_col = document.getElementById("right_col");

	function showLorem() {
		// Clear the current content of the right col
		right_col.innerHTML = '';

		for (var i=0; i<4; i++) {
			var p = document.createElement("p");
			var content = document.createTextNode(lorem_ipsem);
			p.appendChild(content);
			right_col.appendChild(p);
		}
	}

	function showBottles() {
		// Clear the current content of the right col
		right_col.innerHTML = '';

		// Create each new paragraph and add it to the right col
		var p = document.createElement("p");
		var content = document.createTextNode(bottles_verse_1);
		p.appendChild(content);
		right_col.appendChild(p)

		p = document.createElement("p");
		content = document.createTextNode(bottles_verse_2);
		p.appendChild(content);
		right_col.appendChild(p)

		p = document.createElement("p");
		content = document.createTextNode(bottles_verse_3);
		p.appendChild(content);
		right_col.appendChild(p)

		p = document.createElement("p");
		content = document.createTextNode(bottles_verse_4);
		p.appendChild(content);
		right_col.appendChild(p)
	}

	function showThird() {
		right_col.innerHTML = third_content;
	}

	// Populate the initial value for the right col
	showLorem();

	var lorem_link = document.getElementById("lorem_link");
	lorem_link.addEventListener("click", showLorem);

	var bottles_link = document.getElementById("bottles_link");
	bottles_link.addEventListener("click", showBottles);

	var third_link = document.getElementById("third_link");
	third_link.addEventListener("click", showThird);

})();
