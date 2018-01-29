import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_memory(root) {
	ReactDOM.render(<Memory />, root);
}

class Memory extends React.Component {
 	constructor(props) {
		super(props);

		var possible_vals = "AABBCCDDEEFFGGHH".split("");
		var cols = new Array();

		// Walk over the grid of tiles, randomly assigning one of the remaining values
		for (var x = 1; x < 5; x++) {
			var rows = new Array();
			for (var y = 1; y < 5; y++) {
				// Get a random element from the remaining vals
				var val = possible_vals.splice(Math.floor(Math.random()*possible_vals.length), 1);
				rows[y] = val;
			}
			cols[x] = rows;
		}

		this.state = { values: cols, solved: [], turns: 0, click1: null, click2: null};
	}

	// Reset the state after a failed match
	resetClicks() {
		var newState = _.extend(this.state, {click1: null, click2: null});
		this.setState(newState);
	}

	// Process that a tile has been clicked
	click(x, y) {
		var click1 = this.state.click1;
		var click2 = this.state.click2;

		// If both click states are already occupied, we are in the post-click delay, do nothing
		if (click1 != null && click2 != null) {
			return;
		}
		
		// If this is the first click
		if (click1 === null) {
			// Update the state to reflect the first click
			var newState = _.extend(this.state, {turns: this.state.turns + 1, click1: [x,y], click2: null});
			this.setState(newState);
		}
		// If this is the second click
		else {
			// Compare the values of the two clicked tiles
			var first_click = this.state.click1;
			var x1 = Number(first_click[0]);
			var y1 = Number(first_click[1]);
			var val1 = String(this.state.values[x1][y1]);
			var val2 = String(this.state.values[x][y]);
			var solved = this.state.solved
			var match = false;

			// If match
			if (val1 == val2) {
				// Add value of match to solved
				solved.push(val1);

				// Update the state to reflect the match
				var newState = _.extend(this.state, {solved: solved, turns: this.state.turns + 1, click1: null, click2: null});
				this.setState(newState);
			}
			// If not a match, give the player one second before hiding values again
			else {
				// Update the state to reflect the second click
				var newState = _.extend(this.state, {turns: this.state.turns + 1, click2: [x,y]});
				this.setState(newState);

				// Reset the clicks on screen after 1.5 seconds
				var reset = this.resetClicks.bind(this);
				setTimeout(function(){reset()}, 1500);
			}
		}
	}

	render() {
		var click = this.click.bind(this);
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
				<button onClick={() => {location.reload()}}> RESTART </button>
			</div>);
	}
}

function compareClick(x, y, click) {
	if (click == null)
		return false;
	if (x == click[0] && y == click[1])
		return true;
	else
		return false;
}

// Dynamically generate the array of tiles based on the current state
function Cell(params) {
	var values = params.state.values;
	var solved = params.state.solved;
	var click1 = params.state.click1;
	var click2 = params.state.click2;
	var x = params.x;
	var y = params.y;

	var val = String(values[x][y]);
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
		col = (<button className="col cell unselected" onClick={ () => params.click(x, y) }>{val}</button>);
	}

	return col;
}

