import express from 'express'
const app = new express()
const port = 3000

console.log('Environment: ' + process.env.NODE_ENV)
const isProductionEnv = process.env.NODE_ENV === 'production'

if (!isProductionEnv) {
  const config = require('./webpack.config')
  const compiler = require('webpack')(config)
  app.use(require('webpack-hot-middleware')(compiler))
  app.use(require('webpack-dev-middleware')(compiler, {
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    publicPath: config.output.publicPath
  }))
} else {
  // in production setting webpack build result has to be exposed manually
  app.get('/dist/client.js', function(req, res) {
    res.status(200).sendFile(__dirname + '/dist/client.js')
  })
}

app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname + '/src/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==>  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
