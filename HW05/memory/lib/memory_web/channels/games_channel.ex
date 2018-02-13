defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  # Handle the initial connection by the client (associate name and game with socket)
  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
	  game = Memory.GameBackup.load(name) || Game.new()
	  socket = socket
	  |> assign(:game, game)
	  |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("click", %{"x" => x, "y" => y}, socket) do
	game = Game.click(socket.assigns[:game], x, y)
	Memory.GameBackup.save(socket.assigns[:name], game)
	socket = assign(socket, :game, game)
	{:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("resetClicks", _, socket) do
	game = Game.resetClicks(socket.assigns[:game])
	Memory.GameBackup.save(socket.assigns[:name], game)
	socket = assign(socket, :game, game)
	{:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("restartGame", _, socket) do
	game = Game.restartGame(socket.assigns[:game])
	Memory.GameBackup.save(socket.assigns[:name], game)
	socket = assign(socket, :game, game)
	{:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
