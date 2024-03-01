import React, { useRef, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { Button } from "react-bootstrap";

function Notice() {
  const messageInputRef = useRef(null);
  const deckInputRef = useRef(null);
  const [notification, setNotification] = useState(null); // 알림 상태 추가
  const user = JSON.parse(sessionStorage.getItem("user")); // 세션

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
      
      // 메시지를 성공적으로 보낸 후 알림 설정
      setNotification('메시지를 성공적으로 보냈습니다.');
    } catch (error) {
      console.error('Error sending message:', error);
      // 오류 발생 시 알림 설정
      setNotification('메시지를 보내는 중 오류가 발생했습니다.');
    }
  };

  const handleNotificationClose = () => {
    // 알림 상태를 초기화하여 알림 창을 닫음
    setNotification(null);
  };

  return (
    <div>
      <br/>
      <br/>
      <h6 className="text-center" style={{ color: "white" }}>알림페이지 - 회원님들께 메세지를 발송 할 수 있습니다</h6>
      <br/>
      
      <div style={{marginTop:'50px', textAlign:'center'}}>
        <textarea
          ref={messageInputRef}
          placeholder="     데크별 보낼 메세지를 적어주세요"
          style={{width: "300px", height: "80px"}}
        />
    
        <select
          ref={deckInputRef}
          style={{margin:'0px 20px 0px 20px'}}
        >
          <option value="">데크번호</option>
          <option value="1">Deck 1</option>
          <option value="2">Deck 2</option>
          <option value="3">Deck 3</option>
          <option value="4">Deck 4</option>
          <option value="5">Deck 5</option>
          <option value="6">Deck 6</option>
          <option value="ALL">ALL</option>
        </select>
        <Button onClick={sendMessageToServer} variant="success">메세지보내기</Button>
      </div>
      <br/>
      <br/>

      {/* 알림 창*/}
      {notification && (
  <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'#fff', padding:'20px', borderRadius:'5px', boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)'}}>
    <p>{notification}</p>
    <Button onClick={handleNotificationClose} variant="outline-success" size="sm">확인</Button>
  </div>
)}

      <div style={{position:'fixed', bottom:'0', width:'100%'}}>
        
        <br/>
        <br/>
        <Footer/>
      </div>
    </div>
  );
}

export default Notice;
