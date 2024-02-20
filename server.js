const net = require('net');

const server = net.createServer(socket => {
  // console.log('라즈베리파이가 연결되었습니다.');

  socket.on('data', data => {
    console.log('라즈베리파이에서 온습도 데이터를 수신했습니다:', data.toString());
  });

  // socket.on('end', () => {
  //   console.log('라즈베리파이와의 연결이 종료되었습니다.');
  // });

  socket.on('error', err => {   
    console.error('라즈베리파이와의 연결 중 오류가 발생했습니다:', err);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 대기 중입니다.`);
});