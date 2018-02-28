
# Skeleton taken from class presentation code

defmodule TasktrackerWeb.SessionController do
	use TasktrackerWeb, :controller

	alias Tasktracker.Accounts

	# Create a new session for the given email
	def create(conn, %{"email" => email}) do
		user = Accounts.get_user_by_email(email)
		if user do
			conn
			|> put_session(:user_id, user.id)
			|> put_flash(:info, "Logged in as #{user.name}")
			|> redirect(to: task_path(conn, :index))
		else
			conn
			|> put_flash(:error, "Failed to create session")
			|> redirect(to: page_path(conn, :index))
		end
	end

	# Delete the current session
	def delete(conn, _params) do
		conn
		|> delete_session(:user_id)
		|> put_flash(:info, "Logged Out")
		|> redirect(to: page_path(conn, :index))
	end

end
