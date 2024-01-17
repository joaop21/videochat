defmodule Videochat.OrganizerTest do
  use Videochat.DataCase

  alias Videochat.Organizer

  describe "rooms" do
    alias Videochat.Organizer.Room

    import Videochat.OrganizerFixtures

    @invalid_attrs %{title: nil, slug: nil}

    test "list_rooms/0 returns all rooms" do
      room = room_fixture()
      assert Organizer.list_rooms() == [room]
    end

    test "get_room!/1 returns the room with given id" do
      room = room_fixture()
      assert Organizer.get_room!(room.id) == room
    end

    test "create_room/1 with valid data creates a room" do
      valid_attrs = %{title: "some title", slug: "some slug"}

      assert {:ok, %Room{} = room} = Organizer.create_room(valid_attrs)
      assert room.title == "some title"
      assert room.slug == "some slug"
    end

    test "create_room/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Organizer.create_room(@invalid_attrs)
    end

    test "update_room/2 with valid data updates the room" do
      room = room_fixture()
      update_attrs = %{title: "some updated title", slug: "some updated slug"}

      assert {:ok, %Room{} = room} = Organizer.update_room(room, update_attrs)
      assert room.title == "some updated title"
      assert room.slug == "some updated slug"
    end

    test "update_room/2 with invalid data returns error changeset" do
      room = room_fixture()
      assert {:error, %Ecto.Changeset{}} = Organizer.update_room(room, @invalid_attrs)
      assert room == Organizer.get_room!(room.id)
    end

    test "delete_room/1 deletes the room" do
      room = room_fixture()
      assert {:ok, %Room{}} = Organizer.delete_room(room)
      assert_raise Ecto.NoResultsError, fn -> Organizer.get_room!(room.id) end
    end

    test "change_room/1 returns a room changeset" do
      room = room_fixture()
      assert %Ecto.Changeset{} = Organizer.change_room(room)
    end
  end
end
