import Path from "path"
import CopyWebpackPlugin from "copy-webpack-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const ENV = process.env.MIX_ENV || "dev"
const PROD = ENV === "prod"
const PATHS = {
  web: Path.join(__dirname, "web/static"),
  priv: Path.join(__dirname, "priv/static")
}

const CONFIG = {
  entry: [
    Path.join(PATHS.web, "js", "app.js"),
    Path.join(PATHS.web, "css", "app.css")
  ],

  output: {
    path: PATHS.priv,
    filename: Path.join("js", "app.js")
  },

  resolve: {
    extensions: ["", ".js", ".css"],
    root: PATHS.web,
    alias: {
      phoenix_html:
        Path.join(__dirname, "deps/phoenix_html/web/static/js/phoenix_html.js"),
      phoenix:
        Path.join(__dirname, "deps/phoenix/web/static/js/phoenix.js")
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css" +
          "?sourceMap" +
          "!resolve-url")
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: "url",
        include: PATHS.web
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file",
        include: PATHS.web
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin(Path.join("css", "app.css")),
    new CopyWebpackPlugin([
      {
        from: Path.join(PATHS.web, "assets")
      }
    ])
  ]
}

if (!PROD) {
  CONFIG.devtool = "source-map"
}

export default CONFIG
