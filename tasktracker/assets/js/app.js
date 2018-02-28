// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import $ from "jquery";

function update_buttons() {
	console.log("Updating buttons");
	$('.work-button').each( (_, bb) => {
		let start_time = $(bb).data('start-time');
		if (start_time != "") {
			$(bb).text("Finish Working");
		} else {
			$(bb).text("Start Working");
		}
	});
}

function set_button(task_id, start_time) {
	console.log("Setting button");
	console.log(task_id);
	console.log(start_time);
	$('.work-button').each( (_, bb) => {
		if (task_id == $(bb).data('task-id')) {
			$(bb).data('start-time', start_time);
		}
	});
	update_buttons();
}

function start_work(task_id) {
	console.log("Inside start_work");
	let start_time = new Date();
	set_button(task_id, start_time);
}

function finish_work(task_id, start_time) {
	console.log("Inside finish_work");
	let end_time = new Date();
	
	let text = JSON.stringify({
		time_block: {
			task_id: task_id,
			start: start_time,
			end: end_time,
		}
	});

	$.ajax(timeblock_path, {
		method: "post",
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: text,
		success: (resp) => { set_button(task_id, ""); },
	});
}

function work_click(ev) {
	console.log("Detected work btn click");
	let btn = $(ev.target);
	let task_id = btn.data('task-id');
	let start_time = btn.data('start-time');

	if (start_time != "") {
		finish_work(task_id, start_time);
	} else {
		start_work(task_id);
	}
}

function init_work_button() {
	if (!$('.work-button')) {
		console.log("No work button found");
		return;
	}
	$(".work-button").click(work_click);

	update_buttons();
}

$(init_work_button);
