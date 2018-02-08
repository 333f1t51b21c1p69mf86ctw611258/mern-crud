const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

const config = require('./config/config');

const controllers = require('./api/controllers/index');
const models = require('./api/models');

// Instantiate express
const app = express();

// Don't touch this if you don't know it
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable('trust proxy');

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware
app.use(bodyParser.json());

// Enable cross-origin access through the CORS middleware
// NOTICE: For React development server only!
if (process.env.CORS) {
  app.use(cors());
}

// Initialize routes middleware
app.use('/api', controllers);


// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up socket.io
const io = socket(server);
let online = 0;
let sockets = [];

io.on('connection', (socket) => {
  online++;
  sockets.push(socket);

  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit('visitor enters', online);

  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));

  socket.on('disconnect', () => {
    online--;
    sockets = sockets.filter(function (el) {
      return el.id !== socket.id;
    });

    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit('visitor exits', online);
  });
});

models.product.hook('afterCreate', function (product) {
  // sockets.forEach(element => {
  //   element.emit('add', product);
  // });
});
models.product.hook('afterUpdate', function (product) {
  // sockets.forEach(element => {
  //   element.emit('update', product);
  // });
});
models.product.hook('afterDestroy', function (product) {
  // sockets.forEach(element => {
  //   element.emit('delete', product);
  // });
});