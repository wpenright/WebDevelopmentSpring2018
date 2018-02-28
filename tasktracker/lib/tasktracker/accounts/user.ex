defmodule Tasktracker.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Accounts.User

  alias Tasktracker.Accounts.Manage

  schema "users" do
    field :email, :string
    field :name, :string
	has_many :manager_manages, Manage, foreign_key: :manager_id
	has_many :underling_manages, Manage, foreign_key: :underling_id
	has_many :managers, through: [:underling_manages, :manager]
	has_many :underlings, through: [:manager_manages, :underling]

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :name])
	|> unique_constraint(:email)
    |> validate_required([:email, :name])
  end
end
