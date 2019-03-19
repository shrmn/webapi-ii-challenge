const express = require('express');

const router = require('./router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>API is working!</h2>`)
});

server.use('/api/posts', router);

module.exports = server;