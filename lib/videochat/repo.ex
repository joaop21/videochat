defmodule Videochat.Repo do
  use Ecto.Repo,
    otp_app: :videochat,
    adapter: Ecto.Adapters.Postgres
end
