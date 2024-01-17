defmodule Videochat.Organizer.Room do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rooms" do
    field :title, :string
    field :slug, :string

    timestamps(type: :utc_datetime)
  end

  @required_fields [:title, :slug]
  @fields @required_fields

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
    |> format_slug()
    |> unique_constraint(:slug)
  end

  defp format_slug(%Ecto.Changeset{changes: %{slug: _}} = changeset) do
    changeset
    |> update_change(:slug, fn slug ->
      slug
      |> String.downcase()
      |> String.replace(" ", "-")
    end)
  end

  defp format_slug(changeset), do: changeset
end
