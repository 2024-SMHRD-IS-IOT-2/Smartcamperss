/* "센서값" 파일입니다.
- server.js에서 센서값 받습니다.
- 여러 컴포넌트(react)와 통신해 센서값 줍니다.
 */
const express = require('express');
const sensorRouter = express.Router();

let sensorData;

// server.js에서 센서값 받아와서 처리하는 함수
function receiveSensorData (data){
  sensorData=data;
  console.log('hihi', sensorData);
}

// 클라이언트가 http://localhost:8000/sensor/data로 요청을 보냈을 때 작동하는 함수
sensorRouter.post('/data', (req,res)=>{
  console.log(req.body);
  res.json({sensorData:sensorData});
})

// module.exports 여러개 하는 법!!
module.exports = {
  receiveSensorData,
  sensorRouter    
}