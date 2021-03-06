defmodule TasktrackerWeb.Router do
  use TasktrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
	plug TasktrackerWeb.SessionPlugs
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasktrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
	resources "/users", UserController
	resources "/tasks", TaskController
	resources "/manages", ManageController

	post "/session", SessionController, :create
	delete "/session", SessionController, :delete
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TasktrackerWeb do
    pipe_through :api
	post  "/timeblocks/start", TimeBlockController, :start
	resources "/timeblocks", TimeBlockController, except: [:new, :edit]
  end
end
