import React, { useRef } from 'react';
import axios from 'axios';

function Notice() {
  const messageInputRef = useRef(null);
  const deckInputRef = useRef(null);

  const sendMessageToServer = async () => {
    try {

      const selectedDeck = deckInputRef.current.value;
      const message = messageInputRef.current.value; // 입력된 메시지 저장
      messageInputRef.current.value = ''; // 메시지 입력란 초기화


      if (selectedDeck === 'ALL') {
        // "ALL"을 선택한 경우 하나의 요청으로 모든 데크에 메시지 저장
        await axios.post('/notice/sendMessageAll', {
          message: message
        });
      } else {
        // 선택한 데크에 대해 메시지 저장
        await axios.post('/notice/sendMessage', {
          message: message,
          deckNumber: selectedDeck
        });
      }
      
    }
    catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={messageInputRef}
        placeholder="Enter message"
      />
      <select
        ref={deckInputRef}
      >
        <option value="">Select a deck</option>
        <option value="1">Deck 1</option>
        <option value="2">Deck 2</option>
        <option value="3">Deck 3</option>
        <option value="4">Deck 4</option>
        <option value="5">Deck 5</option>
        <option value="6">Deck 6</option>
        <option value="ALL">ALL</option>
      </select>
      <button onClick={sendMessageToServer}>Send Message</button>
    </div>
  );
}

export default Notice;