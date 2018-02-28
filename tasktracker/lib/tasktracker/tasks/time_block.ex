defmodule Tasktracker.Tasks.TimeBlock do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Tasks.TimeBlock


  schema "timeblocks" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    field :task_id, :id

    timestamps()
  end

  @doc false
  def changeset(%TimeBlock{} = time_block, attrs) do
    time_block
    |> cast(attrs, [:start, :end, :task_id])
    |> validate_required([:start, :end, :task_id])
  end
end
