require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
  console.log('Usuário conectado', socket.id);
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => console.log('Application running ...'));
