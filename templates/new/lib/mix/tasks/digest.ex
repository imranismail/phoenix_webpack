defmodule Mix.Tasks.<%= application_module %>.Digest do
  use Mix.Task

  def run(args) do
    <%= if webpack do %>Mix.Shell.IO.cmd "node_modules/.bin/webpack --progress --colors"<% end %>
    :ok = Mix.Tasks.Phoenix.Digest.run(args)
  end
end
