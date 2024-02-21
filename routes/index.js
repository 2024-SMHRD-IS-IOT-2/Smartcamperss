// 메인페이지 구현(서버)
const express = require('express');
const indexRouter = express.Router();
const path = require('path');

// let sensorData;



// 메인페이지 라우터
// - react-project 내 build폴더 -> index.html 파일 경로 설정
indexRouter.get('/main', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'react-project', 'build', 'index.html'))
});



//****************************************************
// 클라이언트가 http://localhost:8000/data로 요청을 보냈을 때 작동하는 함수
// indexRouter.post('/data', (req,res)=>{
//     console.log(req.body);
//     res.json({sensorData:sensorData});
// })

// // server.js에서 센서값 받아와서 처리하는 함수
// function receiveSensorData (data){
//     sensorData=data;
//     console.log('hihi', sensorData);
// }


// // module.exports 여러개 하는 법!!
// module.exports = {
//     receiveSensorData,
//     indexRouter    
// }
//****************************************************


module.exports = indexRouter ; 
