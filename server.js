const express = require( 'express');
const fs  = require('fs');
const path = require( 'path');
const React = require( 'react');
const port = process.env.PORT || 3000;

const app = express();
if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'debug'
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));

  app.use(express.static(path.join(__dirname, 'src', 'assets', 'static')));

  app.listen(port, () => {
    console.log(`listening on port: ${port}`)
  });

} else {
  fs.readFile('./static/index.html', 'utf8', function (err, data) {
    if (err) throw err;
    const App = require('./static/bundle').default;
    const ReactDOMServer = require( 'react-dom/server');

    function handleRender(req, res) {
      const context = {};
      const html = ReactDOMServer.renderToString(React.createFactory(App({req, context})));
      const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
      if (context.url) {
        res.writeHead(301, {
          Location: context.url
        });
        res.end();
      } else {
        res.write(document);
        res.end();
      }
    }

    app.use('^/$', handleRender);
    app.use(express.static(path.join(__dirname, 'static')));
    app.use('*', handleRender);

    app.listen(port, () => {
      console.log(`listening on production port: ${port}`)
    });
  });
}
