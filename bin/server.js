const app = require('../src/app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('winston');

const clients = {};

const port = normalizaPort(process.env.PORT || '3000');

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}


io.on('connection', (client) => {
  client.on('join', (name) => {
    logger.debug(`Joined: ${name}`);
    clients[client.id] = name;
    client.emit('update', 'Você se conectou ao chat.');
    client.broadcast.emit('update', `${name} está on-line.`);
  });

  client.on('send', (msg) => {
    logger.debug(`Message: ${msg}`);
    client.broadcast.emit('chat', clients[client.id], msg);
  });

  client.on('disconnect', () => {
    logger.debug('Disconnect');
    io.emit('update', `${clients[client.id]} se desconectou.`);
    delete clients[client.id];
  });
});


http.listen(port, () => {
  logger.debug(`app listening on port ${port}`);
});
/* app.listen(port, () => {
  console.log(`app listening on port ${port}`);
}); */