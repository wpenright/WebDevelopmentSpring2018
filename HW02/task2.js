
(function () {
	"use strict";
	
	var my_value = document.getElementById("my_value");

	function showValue() {
		alert(my_value.innerHTML);
	}

	function incrementValue() {
		var tmp = Number(my_value.innerHTML);
		my_value.innerHTML = tmp + 1;
	}

	function appendParagraph() {
		// Create the new paragraph and text objects
		var p = document.createElement("p");
		var content = document.createTextNode(my_value.innerHTML);

		// Add the content to the new p
		p.appendChild(content);

		// Add the p to the log at the bottom of the page
		var log = document.getElementById("val_log");
		log.appendChild(p);
	}

	var alert_button = document.getElementById("alert_button");
	alert_button.addEventListener("click", showValue);

	var increment_button = document.getElementById("increment_button");
	increment_button.addEventListener("click", incrementValue);

	var append_button = document.getElementById("append_button");
	append_button.addEventListener("click", appendParagraph);

})();
