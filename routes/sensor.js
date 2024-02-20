// 센서값 받아오는 라우트
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('sensorData', (data)=>{
    console.log(data);
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = express.Router();