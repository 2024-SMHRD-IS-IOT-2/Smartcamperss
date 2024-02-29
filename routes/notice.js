const express = require('express');
const noticeRouter = express.Router();

const decks = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

// 한개의 데크에게만 메세지를 보냄
noticeRouter.post('/sendMessage', (req, res) => {
    const { message, deckNumber } = req.body;
    if (!decks[deckNumber]) {
      return res.status(400).send('Invalid deck number');
    }
    decks[deckNumber].push(message);
    console.log(`Message '${message}' saved for deck ${deckNumber}`);
    res.sendStatus(200);
  });

// 전체의 데크에 메세지를 보냄
noticeRouter.post('/sendMessageAll', (req, res) => {
    const { message } = req.body;
    for (let i = 1; i <= 6; i++) {
           decks[i].push(message);
        }
    console.log(`Message '${message}' saved for All Deck`);
    });

// get 메소드를 사용하여 해당하는 데크 넘버에 실시간으로 공지사항을 뛰워줌  
noticeRouter.get('/:deckNumber', (req, res) => {
    const deckNumber = req.params.deckNumber;
    const deckMessages = decks[deckNumber] || []; // 해당하는 데크의 메시지 정보를 가져옴
    console.log(deckMessages);
    res.json(deckMessages); // 메시지 정보를 JSON 형식으로 반환
  });


  



module.exports = noticeRouter;