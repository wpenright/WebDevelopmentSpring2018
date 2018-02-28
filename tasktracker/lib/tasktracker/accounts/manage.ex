defmodule Tasktracker.Accounts.Manage do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.Manage

  alias Tasktracker.Accounts.User

  schema "manages" do
    belongs_to :manager, User
    belongs_to :underling, User

    timestamps()
  end

  @doc false
  def changeset(%Manage{} = manage, attrs) do
    manage
    |> cast(attrs, [:manager_id, :underling_id])
    |> validate_required([:manager_id, :underling_id])
  end
end
