defmodule Videochat.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :title, :string
      add :slug, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:rooms, :slug)
  end
end
