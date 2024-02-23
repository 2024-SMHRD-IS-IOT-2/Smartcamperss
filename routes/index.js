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


module.exports = indexRouter ; 
