// ##############################################################

import "phoenix_html";
import socket from "./socket";

//function form_init() {
//	let channel = socket.channel("games:" + window.gameName, {});
//	channel.join()
//		.receive("ok", resp => { console.log("Joined successfully", resp) })
//		.receive("error", resp => { console.log("Unable to join", resp) });
//
//	$('#game-button').click(() => {
//		let xx = $('#game-input').val();
//		channel.push("double", { xx: xx }).receive("doubled", msg => {
//			$('#game-output').text(msg.yy);
//		});
//	});
//}

import run_memory from "./memory";

function start() {
	let root = document.getElementById('root');
	if (root) {
		let channel = socket.channel("games:" + window.gameName, {});
		run_memory(root, channel);
	}

	if (document.getElementById('index-page')) {
		//form_init();
	}
}

$(start);

