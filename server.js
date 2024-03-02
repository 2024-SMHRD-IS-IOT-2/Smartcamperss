const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// module 여러개 받는 방법
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// *******notice 모듈 추가 *******
const noticeRouter = require('./routes/notice');

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

// *******notice router 추가 *******
app.use('/notice', noticeRouter);

// let temperature = 0;
// let humidity = 0;
// let fire = 0;
// let battery = 0;

/************** sensor값 받아오기 *************/

// ============= 가데이터 보내기 ===================
// let sensorData={}
let sensorData = {
  smhrd1 : {
    '1':{
      camp_id : 'smhrd1',
      deck_num : 1,
      temperature : 20,
      humidity : 10,
      battery : 450,
      fire_1 : 90,
      fire_2 : 1200,
      air : 200,
      co : 70,
      btn : 0
    }
  }
};

setInterval(() => {

  receiveSensorData(sensorData)
  
}, 5000);

// =========================================================

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('sensorData', (data)=>{
    // 여기에서 받아온 값을 변수에 넣어서 여기저기 보내주자!!
    // 각자 보낼지, 묶어서 보낼지 고민중...(어차피 다 띄울거니깐 묶어서 보내자!)
  
    // sensorData[`${data.camp_id}_${data.deck_num}`] = data
    

    // 희재씨 코드
    if (!sensorData[data.camp_id]) {
      sensorData[data.camp_id] = {};
      sensorData[data.deck_num] = data.deck_num;
      }
      
      sensorData[data.camp_id][data.deck_num] = {
          camp_id:data.camp_id,
          deck_num:data.deck_num,
          temperature : data.temperature,
          humidity : data.humidity,
          battery : data.battery,
          fire_1 : data.fire_1,
          fire_2 : data.fire_2,
          air : data.Air,
          co : data.Co,
          btn : data.Btn
      };

    console.log(sensorData);
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
  });
  
