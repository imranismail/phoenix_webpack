var Webpack          = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var CONFIG           = require('./webpack.config')

var SERVER_CONFIG    = {
  hot: true,
  contentBase: 'http://localhost:4002',
  publicPath: CONFIG.output.publicPath,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:4000'
  },
  stats: {
    chunks: false,
    colors: true
  }
}

new WebpackDevServer(Webpack(CONFIG), SERVER_CONFIG)
  .listen(4002, '0.0.0.0', function (err, result) {
    if (err) console.error(err)
    console.log('[info]', `Running Webpack development server hot using http on port 4002`)
})

// Exit on end of STDIN
process.stdin.resume()
process.stdin.on('end', function () {
  process.exit(0)
})
