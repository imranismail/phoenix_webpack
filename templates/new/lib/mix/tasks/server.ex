defmodule Mix.Tasks.<%= application_module %>.Server do
  use Mix.Task

  def run(args) do
    hot  = Enum.find(args, false, &(&1 == "--hot"))
    args = List.delete(args, hot)
    if !!hot, do: update_node_args([hot])
    Mix.Tasks.Phoenix.Server.run(args)
  end

  def update_node_args(new_args \\ []) do
    updated_env =
      Application.get_env(:lancer, <%= application_module %>.Endpoint)
      |> Keyword.update!(:watchers, fn([{:node, args}]) ->
           [node: args ++ new_args]
         end)

    Application.put_env(:lancer,
                        <%= application_module %>.Endpoint,
                        updated_env,
                        persistent: true)
  end
end
