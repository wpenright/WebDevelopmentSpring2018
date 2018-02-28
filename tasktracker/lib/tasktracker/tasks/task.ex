defmodule Tasktracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Tasks.Task


  schema "tasks" do
    field :description, :string
    field :time, :integer
    field :title, :string
	belongs_to :user, Tasktracker.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time, :user_id])
    |> validate_required([:title, :description, :time, :user_id])
  end
end
