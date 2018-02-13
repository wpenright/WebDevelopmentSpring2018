defmodule Memory.Game do

	# Get a new initial state
	def new do 
		vals = Enum.shuffle(String.graphemes("AABBCCDDEEFFGGHH"))
		#cols = %{
		#	0 => %{0 => "x", 1 => "x", 2 => "x", 3 => "x"},
		#	1 => %{0 => "x", 1 => "x", 2 => "x", 3 => "x"},
		#	2 => %{0 => "x", 1 => "x", 2 => "x", 3 => "x"},
		#	3 => %{0 => "x", 1 => "x", 2 => "x", 3 => "x"}
		#}

		cols = [
			["x","x","x","x"],
			["x","x","x","x"],
			["x","x","x","x"],
			["x","x","x","x"],
		]

		{cols, _} = Enum.map_reduce cols, vals, fn(x, acc) ->
			Enum.map_reduce x, acc, fn(cell, [hd | tl]) ->
				{hd, tl}
			end
		end

		%{
			cols: cols,
			solved: [],
			turns: 0,
			click1: nil,
			click2: nil
		}
	end 

	# Render the client view based on the given state
	def client_view(game) do
		game
	end

	# Process a user click with given coords
	def click(game, x, y) do
		c1 = game.click1
		c2 = game.click2
		cols = game.cols
		solved = game.solved
		turns = game.turns

		cond do
			# If two clicks are already registered, we are in post-click delay
			c1 != nil and c2 != nil ->
				game
			
			# If this is the first click
			c1 == nil ->
				%{
					cols: cols,
					solved: solved,
					turns: turns + 1,
					click1: [x, y],
					click2: nil
				}
			
			# Then must be the second click
			true ->
				[x1, y1] = c1
				#val1 = cols[x1][y1]
				#val2 = cols[x][y]
				val1 = Enum.at(Enum.at(cols, x1-1), y1-1)
				val2 = Enum.at(Enum.at(cols, x-1), y-1)
			
				cond do
					# Chosen tiles match
					val1 == val2 ->
						%{
							cols: cols,
							solved: [val1 | solved],
							turns: turns + 1,
							click1: nil,
							click2: nil
						}
					# No match
					true ->
						%{
							cols: cols,
							solved: solved,
							turns: turns + 1,
							click1: c1,
							click2: [x, y]
						}
				end
		end
	end

	# Reset the stored clicks after a failed match
	def resetClicks(game) do
		%{
			cols: game.cols,
			solved: game.solved,
			turns: game.turns,
			click1: nil,
			click2: nil
		}
	end

	# Set the state for a new game, with a new tile layout and reset score
	def restartGame(game) do
		new()
	end

end
