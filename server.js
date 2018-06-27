const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  server.post('/memberships/new', (req, res) => {
    console.log(req.body);
    return app.render(req, res, '/memberships/new', { cmsUrl: req.body.cmsUrl })
  });

  server.post('/memberships/:address', (req, res) => {
    console.log(req.body);
    return app.render(req, res, '/memberships/show', { userID: req.body.userID , address: req.body.cid})
  });

  server.get('*', (req, res) => {
    return handler(req, res);
  });

  server.listen(8000, (err) => {
    if (err) throw err;
    console.log('Ready on localhost:8000');
  });

  //  createServer(handler).listen(8000, err => {
  //    if (err) throw err;
  //    console.log('Ready on localhost:8000');
  //  });
});
