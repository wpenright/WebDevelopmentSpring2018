import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_memory(rooti, channel) {
	ReactDOM.render(<Memory channel={channel} />, root);
}

class Memory extends React.Component {
	// Set an initial empty state and connect to the channel to get the first view
 	constructor(props) {
		super(props);
		this.channel = props.channel;
		this.state = { cols: [], solved: [], turns: 0, click1: null, click2: null };

		this.channel.join()
			.receive("ok", this.gotView.bind(this))
			.receive("error", resp => { console.log("Unable to join", resp) });
	}

	// Update the current state based on the response from the server
	gotView(view) {
		console.log("New view", view);
		this.setState(view.game);

		// If this is after two click that arent a match, reset after 1.5s
		if (this.state.click1 != null && this.state.click2 != null) {
			var reset = this.resetClicks.bind(this);
			setTimeout(function(){reset()}, 1000);
		}
	}

	// Process that a tile has been clicked
	click(x, y) {
		this.channel.push("click", {x: x, y: y})
			.receive("ok", this.gotView.bind(this));
	}

	// Reset the state after a failed match
	resetClicks() {
		this.channel.push("resetClicks")
			.receive("ok", this.gotView.bind(this));
	}

	// Start a new game in the same session
	restartGame() {
		console.log("RESTARTING");
		this.channel.push("restartGame")
			.receive("ok", this.gotView.bind(this));
	}

	render() {
		var click = this.click.bind(this);
		var restartGame = this.restartGame.bind(this);
		return (
			<div>
				<h3>Turns: {this.state.turns}</h3>
				<div className="row">
					<Cell x={1} y={1} state={this.state} click={click}/>
					<Cell x={2} y={1} state={this.state} click={click}/>
					<Cell x={3} y={1} state={this.state} click={click}/>
					<Cell x={4} y={1} state={this.state} click={click}/>
				</div>
				<div className="row">
					<Cell x={1} y={2} state={this.state} click={click}/>
					<Cell x={2} y={2} state={this.state} click={click}/>
					<Cell x={3} y={2} state={this.state} click={click}/>
					<Cell x={4} y={2} state={this.state} click={click}/>
				</div>
				<div className="row">
					<Cell x={1} y={3} state={this.state} click={click}/>
					<Cell x={2} y={3} state={this.state} click={click}/>
					<Cell x={3} y={3} state={this.state} click={click}/>
					<Cell x={4} y={3} state={this.state} click={click}/>
				</div>
				<div className="row">
					<Cell x={1} y={4} state={this.state} click={click}/>
					<Cell x={2} y={4} state={this.state} click={click}/>
					<Cell x={3} y={4} state={this.state} click={click}/>
					<Cell x={4} y={4} state={this.state} click={click}/>
				</div>
				<RestartButton restartGame={restartGame}/>
			</div>);
	}
}

function compareClick(x, y, click) {
	if (click == null)
		return false;

	return x == click[0] && y == click[1];
		
}

// Restart the game with a new state in the same session
function RestartButton(params) {
	return <button onClick={ () => params.restartGame() }>RESTART</button>
}

// Dynamically generate the array of tiles based on the current state
function Cell(params) {
	var values = params.state.cols;
	var solved = params.state.solved;
	var click1 = params.state.click1;
	var click2 = params.state.click2;
	var x = params.x;
	var y = params.y;

	if (values.length == 0)
		var val = "x";
	else 
		var val = String(values[x-1][y-1]);

	var col;

	// If the given tile has already been solved (assumes each values pair only occurs once)
	// (Render the value, grayed out?)
	if (solved.indexOf(val) > -1) {
		col = (<div className="col cell solved">{val}</div>);
	}
	// If the given tile has been clicked
	// (Render the value)
	else if (compareClick(x, y, click1) || compareClick(x, y, click2)) {
		col = (<div className="col cell clicked">{val}</div>);
	}
	// The given tile has not been selected
	// (Render nothing)
	else {
		col = (<button className="col cell unselected" onClick={ () => params.click(x, y) }></button>);
	}

	return col;
}

