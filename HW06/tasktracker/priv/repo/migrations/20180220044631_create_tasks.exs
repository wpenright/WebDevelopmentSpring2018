defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :text
      add :time, :integer
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
