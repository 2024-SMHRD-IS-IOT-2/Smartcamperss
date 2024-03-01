const express = require("express");
const noticeRouter = express.Router();
const conn = require("../config/database");

let userId;
let decks={};
noticeRouter.post('/userId', (req, res)=>{
  userId = req.body;
  console.log('유저아이디!!!!!',userId);
  
  // DB에서 회원에 따른 데크넘버 가져오기
  const deckSql = `select deck_num from tb_deck where mem_id = '${userId.id}'`;
  conn.query(deckSql, (err, rows)=>{
    if (err) {
      console.error("데이터 가져오기 실패~~~:", err);
      return;
    } else {
      // console.log('로우들', rows);
      // rows.map((item)=>{
      //   decks[item.deck_num] = []
      // })
      for(let i=0; i<rows.length+1; i++){
        decks[i] = []
      }
      console.log('데크들!!!', decks);
    }
  })
})


// 한개의 데크에게만 메세지를 보냄
noticeRouter.post("/sendMessage", (req, res) => {
  const { message, deckNumber, mem_id } = req.body;
  if (!decks[deckNumber]) {
    return res.status(400).send("Invalid deck number");
  } else {
    decks[deckNumber].push(message);
    console.log(`Message '${message}' saved for deck ${deckNumber}`);
    let msg_idx;
    const selectSql = "select max(msg_idx) as max_idx from tb_message";
    conn.query(selectSql, (err, rows) => {
      msg_idx = rows[0].max_idx;
      console.log("가장 큰 msg_idx:", msg_idx);
      const sql = "insert into tb_message values (?, ?, ?, NOW(), ?)";
      conn.query(
        sql,
        [(msg_idx + 1), message, mem_id, deckNumber],
        (err, rows) => {
          if (err) {
            console.error("INSERT 실패:", err);
            return;
          } else {
            console.log("데이터 삽입 완료");
            console.log("삽입된 행 수:", rows.affectedRows);
          }
        }
      );
    });
    res.sendStatus(200);
  }
});

// 전체의 데크에 메세지를 보냄
noticeRouter.post("/sendMessageAll", (req, res) => {
  const { message, mem_id } = req.body;
  for (let i = 1; i <= 6; i++) {
    decks[i].push(message);
  }
  console.log(`Message '${message}' saved for deck All`);
  let msg_idx;
  const selectSql = "select max(msg_idx) as max_idx from tb_message";
  conn.query(selectSql, (err, rows) => {
    msg_idx = rows[0].max_idx;
    console.log("가장 큰 msg_idx:", msg_idx);
    const sql = "insert into tb_message values (?, ?, ?, NOW(), 0)";
    conn.query(
      sql,
      [(msg_idx + 1), message, mem_id],
      (err, rows) => {
        if (err) {
          console.error("INSERT 실패:", err);
          return;
        } else {
          console.log("데이터 삽입 완료");
          console.log("삽입된 행 수:", rows.affectedRows);
        }
      }
    );
  });
  res.sendStatus(200);
  console.log(`Message '${message}' saved for All Deck`);
});

// get 메소드를 사용하여 해당하는 데크 넘버에 실시간으로 공지사항을 뛰워줌
noticeRouter.get("/:deckNumber", (req, res) => {
  const deckNumber = req.params.deckNumber;
  const deckMessages = decks[deckNumber] || []; // 해당하는 데크의 메시지 정보를 가져옴
  console.log(deckMessages);
  res.json(deckMessages); // 메시지 정보를 JSON 형식으로 반환
});

module.exports = noticeRouter;
