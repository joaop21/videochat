defmodule VideochatWeb.Presence do
  use Phoenix.Presence,
    otp_app: :videochat,
    pubsub_server: Videochat.PubSub
end
