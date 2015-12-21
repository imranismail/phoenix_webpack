var Path              = require("path")
var CopyWebpackPlugin = require("copy-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var Webpack           = require("webpack")

var ENV    = process.env.MIX_ENV || "dev"
var PROD   = ENV === "prod"
var PATHS  = {
  web: Path.join(__dirname, "web/static"),
  priv: Path.join(__dirname, "priv/static"),
  public: "http://localhost:4001/"
}

var CONFIG = {
  entry: [
    Path.join(PATHS.web, "js", "app.js"),
    Path.join(PATHS.web, "css", "app.css")
  ],

  output: {
    path: PATHS.priv,
    filename: Path.join("js", "app.js"),
    publicPath: PATHS.public
  },

  resolve: {
    extensions: ["", ".js", ".jsx", ".css"],
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
        test: /\.jsx?$/,
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
  //// Enable sourcemap
  CONFIG.devtool = "source-map"

  //// add HMR
  CONFIG.plugins.push(new Webpack.HotModuleReplacementPlugin(),
                      new Webpack.NoErrorsPlugin())

  //// add hmr to entry
  CONFIG.entry.unshift(
    "webpack-dev-server/client?" + PATHS.public,
    "webpack/hot/only-dev-server")
}

module.exports = CONFIG
