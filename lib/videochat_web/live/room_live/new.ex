defmodule VideochatWeb.RoomLive.New do
  use VideochatWeb, :live_view

  alias Videochat.Organizer
  alias Videochat.Organizer.Room

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, form: build_room_form())}
  end

  @impl true
  def handle_event("validate", %{"room" => room_params}, socket) do
    {:noreply, assign(socket, form: build_room_form(room_params))}
  end

  def handle_event("save", %{"room" => room_params}, socket) do
    case Organizer.create_room(room_params) do
      {:ok, room} ->
        {:noreply,
         socket
         |> push_redirect(to: ~p"/room/#{room.slug}")}

      {:error, changeset} ->
        {:noreply,
         socket
         |> assign(form: build_room_form(changeset))
         |> put_flash(:error, "Could not save the room.")}
    end
  end

  def build_room_form(params \\ %{})

  def build_room_form(%Ecto.Changeset{} = changeset), do: to_form(changeset)

  def build_room_form(params) do
    %Room{}
    |> Room.changeset(params)
    |> to_form(as: :room)
  end
end
