const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// module 여러개 받는 방법
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const {receiveSensorData, sensorRouter} = require('./routes/sensor');


app.set('port', process.env.PORT || 8000);

// path, cors, body-parser require 정의
const path = require('path');
const cors = require('cors'); // cors : 비동기통신(react->node 요청 시 비동기로 한다.)할 때 필요
const bodyParser = require('body-parser');

// 정적인 파일을 가져오기 위한 미들웨어 
// 나중에 폴더이름 바뀌면 react-project 여기 부분 바꾸면 된다.
app.use(express.static(path.join(__dirname, 'react-project', 'build')));

// cors 오류 해결을 위한 미들웨어 
// 1) cors 모듈 설치 : npm i cors 
// 2) require 
// 3) 사용 
app.use(cors());
app.use(express.json());

// body-parser 미들웨어 대체 express 내장 모듈 
app.use(express.urlencoded({extended : true}));

// router 
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/sensor', sensorRouter);

// let temperature = 0;
// let humidity = 0;
// let fire = 0;
// let battery = 0;

/************** sensor값 받아오기 *************/
let sensorData;

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('sensorData', (data)=>{
    console.log(data);
    // 여기에서 받아온 값을 변수에 넣어서 여기저기 보내주자!!
    // 각자 보낼지, 묶어서 보낼지 고민중...(어차피 다 띄울거니깐 묶어서 보내자!)
    // temperature = data.temperature;
    // humidity = data.humidity;
    // fire = data.fire;4
    // battery = data.battery;

    sensorData = data
    receiveSensorData(sensorData) // index.js에 있는 함수
    
    // module.exports = sensorData;
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// app.listen(app.get('port'), ()=>{
  //   console.log(`Server is listening on port${app.get('port')}`);
  // })
  
  
  
  server.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    console.log('server is fine')
  });
  
