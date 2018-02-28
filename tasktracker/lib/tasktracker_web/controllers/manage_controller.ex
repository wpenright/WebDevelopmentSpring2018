defmodule TasktrackerWeb.ManageController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.Manage

  def index(conn, _params) do
    manages = Accounts.list_manages()
    render(conn, "index.html", manages: manages)
  end

  def new(conn, params) do
    changeset = Accounts.change_manage(%Manage{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"manage" => manage_params}) do
    case Accounts.create_manage(manage_params) do
      {:ok, manage} ->
		user = Accounts.get_user(manage_params["underling_id"])
        conn
        |> put_flash(:info, "Manage created successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    manage = Accounts.get_manage!(id)
    render(conn, "show.html", manage: manage)
  end

  def edit(conn, %{"id" => id}) do
    manage = Accounts.get_manage!(id)
    changeset = Accounts.change_manage(manage)
    render(conn, "edit.html", manage: manage, changeset: changeset)
  end

  def update(conn, %{"id" => id, "manage" => manage_params}) do
    manage = Accounts.get_manage!(id)

    case Accounts.update_manage(manage, manage_params) do
      {:ok, manage} ->
        conn
        |> put_flash(:info, "Manage updated successfully.")
        |> redirect(to: manage_path(conn, :show, manage))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", manage: manage, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    manage = Accounts.get_manage!(id)
    {:ok, _manage} = Accounts.delete_manage(manage)

	user = Accounts.get_user(manage.underling_id)
    conn
    |> put_flash(:info, "Manage deleted successfully.")
    |> redirect(to: user_path(conn, :show, user))
  end

end
