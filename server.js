const express = require('express');
const helmet = require('helmet');
const server = express();

const projectRouter = require('./routers/projectsRouter');
const actionRouter = require('./routers/actionsRouter');

function logger(req, res, next) {
    const timestamp = new Date();
    console.log(`${req.method} to ${req.originalUrl} on ${timestamp}`);
    next();
  }

  server.use(helmet());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge</h2>`);
});

server.use('/api/projects',helmet(), projectRouter);
server.use('/api/actions', helmet(), actionRouter);


module.exports = server;

