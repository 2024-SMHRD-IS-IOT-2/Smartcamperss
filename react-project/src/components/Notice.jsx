import React, { useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';

function Notice() {
  const messageInputRef = useRef(null);
  const deckInputRef = useRef(null);
  const user = JSON.parse(sessionStorage.getItem("user")); //세션

  const sendMessageToServer = async () => {
    try {

      const selectedDeck = deckInputRef.current.value;
      const message = messageInputRef.current.value; // 입력된 메시지 저장
      messageInputRef.current.value = ''; // 메시지 입력란 초기화


      if (selectedDeck === 'ALL') {
        // "ALL"을 선택한 경우 하나의 요청으로 모든 데크에 메시지 저장
        await axios.post('/notice/sendMessageAll', {
          message: message,
          mem_id: user.id
        });
      } else {
        // 선택한 데크에 대해 메시지 저장
        await axios.post('/notice/sendMessage', {
          message: message,
          deckNumber: selectedDeck,
          mem_id: user.id
        });
      }
      
    }
    catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div style={{marginTop:'50px', textAlign:'center'}}>
      <input
        type="text"
        ref={messageInputRef}
        placeholder="보낼 메세지를 적어주세요."
        style={{width:"300px"}}
      />
      <select
        ref={deckInputRef}
        style={{margin:'0px 20px 0px 20px'}}
      >
        <option value="">데크</option>
        <option value="1">Deck 1</option>
        <option value="2">Deck 2</option>
        <option value="3">Deck 3</option>
        <option value="4">Deck 4</option>
        <option value="5">Deck 5</option>
        <option value="6">Deck 6</option>
        <option value="ALL">ALL</option>
      </select>
      <button onClick={sendMessageToServer}>보내기</button>
      </div>

      <div style={{position:'fixed', bottom:'0', width:'100%'}}>
      <Footer/>
      </div>
    </div>
  );
}

export default Notice;