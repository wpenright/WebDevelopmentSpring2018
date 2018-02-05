
defmodule Calc do

	def main() do
		# Prompt for user input
		input = IO.gets "> "

		# Evaluate and output the result
		IO.puts eval(input)

		# Recurse to show the next prompt
		main()
	end

	def eval(s) do
		# Make sure whitespace is stripped
		s = String.strip(s)
		
		cond do
			# If just a number, return it (parsed from string)
			Regex.match?(~r/^\d*\.?\d*$/, s) ->
				{result, _} = Float.parse(s)
				result

			# If any perens, evaluate any inner-most pairs
			Regex.match?(~r/\([\d\.\+\-\*\/\s]*\)/, s) ->
				s = Regex.replace(~r/\(([\d\.\+\-\*\/\s]*)\)/, s, fn _, x -> "#{eval(x)}" end)
				eval(s)

			# Split and evaluate on "+"
			String.contains?(s, "+") ->
				String.split(s, "+")
				|> Enum.map(fn x -> eval(x) end)
				|> List.foldl(0, fn(x, acc) -> x + acc end)

			# Split and evaluate on "-"
			String.contains?(s, "-") ->
				terms = String.split(s, "-")
				[head | tail]  = Enum.map(terms, fn x -> eval(x) end)
				List.foldr(tail, head, fn(x, acc) -> acc - x end)
			
			# Split and evaluate on "*"
			String.contains?(s, "*") ->
				String.split(s, "*")
				|> Enum.map(fn x -> eval(x) end)
				|> List.foldr(1, fn(x, acc) -> x * acc end)

			# Split and evaluate on "/"
			String.contains?(s, "/") ->
				terms = String.split(s, "/")
				[head | tail]  = Enum.map(terms, fn x -> eval(x) end)
				List.foldr(tail, head, fn(x, acc) -> acc / x end)
			
			
			# If no match, invalid string
			true ->
				raise ArgumentError, message: "invalid format"
		end
		
	end

end
