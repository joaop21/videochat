defmodule Videochat.OrganizerFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Videochat.Organizer` context.
  """

  @doc """
  Generate a room.
  """
  def room_fixture(attrs \\ %{}) do
    {:ok, room} =
      attrs
      |> Enum.into(%{
        slug: "some slug",
        title: "some title"
      })
      |> Videochat.Organizer.create_room()

    room
  end
end
