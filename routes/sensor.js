/* "센서값" 파일입니다.
- server.js에서 센서값 받습니다.
- 여러 컴포넌트(react)와 통신해 센서값 줍니다.
 */
const express = require('express');
const sensorRouter = express.Router();
const conn = require('../config/database');

let sensorData;
let msg_idx=0;

// server.js에서 센서값 받아와서 처리하는 함수
function receiveSensorData (data){
  sensorData=data;
  console.log('server->sensor', sensorData);
}

// 클라이언트가 http://localhost:8000/sensor/data로 요청을 보냈을 때 작동하는 함수
sensorRouter.get('/data', (req,res)=>{
  // console.log(req.body);
  res.json({sensorData:sensorData});
})

// CO알림 받으면 DB에 저장하는 코드
sensorRouter.post('/coWarning', (req,res)=>{
  console.log('CO 알림 ', req.body);
  const {coWarning, mem_id, deck_id} = req.body;
    const selectSql = 'select max(msg_idx) as max_idx from tb_co_warning';
    conn.query(selectSql, (err, rows)=>{
      msg_idx = (rows[0].max_idx+1)
      console.log('가장 큰 msg_idx+1:', msg_idx);
    })

    const sql = "insert into tb_co_warning(msg_idx, co_ppm, mem_id, deck_id, alert_time) values (?, ?, ?, ?, NOW()) on duplicate key update msg_idx=values(msg_idx)";

    conn.query(sql, [msg_idx, coWarning, mem_id, deck_id], (err, rows) => {
      if (err) {
        console.error('INSERT 실패:', err);
        return;
      }else{
        console.log('데이터 삽입 완료');
        console.log('삽입된 행 수:', rows.affectedRows);
      }
    })
})
// 공기질(air)알림 받으면 DB에 저장하는 코드
sensorRouter.post('/airWarning', (req,res)=>{
  console.log('air 알림 ', req.body);
  const {mem_id, deck_id} = req.body;
    const selectSql = 'select max(msg_idx) as max_idx from tb_gas_warning';
    conn.query(selectSql, (err, rows)=>{
      msg_idx = (rows[0].max_idx+1)
      console.log('가장 큰 msg_idx+1:', msg_idx);
    })
    const sql = "insert into tb_gas_warning(msg_idx, mem_id, deck_id, alert_time) values (?, ?, ?, NOW()) on duplicate key update msg_idx=values(msg_idx)";

    conn.query(sql, [msg_idx, mem_id, deck_id], (err, rows) => {
      if (err) {
        console.error('INSERT 실패:', err);
        return;
      }else{
        console.log('데이터 삽입 완료');
        console.log('삽입된 행 수:', rows.affectedRows);
      }
    })
})
// 화재(fire)알림 받으면 DB에 저장하는 코드
sensorRouter.post('/fireWarning', (req,res)=>{
  console.log('fire 알림 ', req.body);
  const {mem_id, deck_id} = req.body;
    const selectSql = 'select max(msg_idx) as max_idx from tb_flame_warning';
    conn.query(selectSql, (err, rows)=>{
      msg_idx = (rows[0].max_idx+1)
      console.log('가장 큰 msg_idx+1:', msg_idx);
    })
    const sql = "insert into tb_flame_warning(msg_idx, mem_id, deck_id, alert_time) values (?, ?, ?, NOW()) on duplicate key update msg_idx=values(msg_idx)";

    conn.query(sql, [msg_idx, mem_id, deck_id], (err, rows) => {
      if (err) {
        console.error('INSERT 실패:', err);
        return;
      }else{
        console.log('데이터 삽입 완료');
        console.log('삽입된 행 수:', rows.affectedRows);
      }
    })
})

// module.exports 여러개 하는 법!!
module.exports = {
  receiveSensorData,
  sensorRouter    
}