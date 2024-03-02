import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "../axios";
import Footer from "./Footer";
import Header from "./Header";

const DBManage = () => {
  let user = JSON.parse(sessionStorage.getItem("user")) || null;
  
  //==========메세지내역 ========================================
  const [members, setMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 회원 정보를 가져오는 함수
  const fetchMembers = () => {
    axios
      .post('/user/select_message', {
        id: user.id
      })
      .then((res) => {
       
        const formattedRows = res.data.rows.map((item) => ({
          ...item,
          msg_time: new Date(item.msg_time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })  // 한국날짜로 설정 
        }));
        setMembers(formattedRows);
        setIsLoaded(true);
        console.log('불러온 데이터 :', formattedRows);
      })
      .catch((error) => {
        console.error("Error fetching members: ", error);
      });
  };

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = () => {
    if (isLoaded) {
      setMembers([]);
      setIsLoaded(false);
    } else {
      fetchMembers();
    }
  };
//==========끝 메세지내역 ========================================

//==========일산화탄소 메세지 내역 ========================================
const [co, setCo] = useState([]);
const [isLoaded_co, setIsLoaded_co] = useState(false);


const fetchCo = () => {
  axios
    .post('/user/select_co', {
      id: user.id
    })
    .then((res) => {
      
      const formattedRows_co = res.data.rows.map((item_co) => ({
        ...item_co,
        alert_time: new Date(item_co.alert_time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      }));
      setCo(formattedRows_co);   // 상태 업데이트 함수 수정
      setIsLoaded_co(true);      // 데이터를 불러왔음을 표시
      console.log('불러온 데이터 :', formattedRows_co);
    })
    .catch((error) => {
      console.error("Error fetching co messages: ", error);
    });
};

// 버튼 클릭 이벤트 핸들러
const handleButtonClick_co = () => {
  if (isLoaded_co) {
    setCo([]);
    setIsLoaded_co(false); 
  } else {
    fetchCo();
  }
};

//==========끝 일산화탄소 메세지 내역 ========================================





//==========화재감지 메세지 내역 ========================================
const [flame, setFlame] = useState([]);
const [isLoaded_flame, setIsLoaded_flame] = useState(false);

// 회원 정보를 가져오는 함수
const fetchFlame = () => {
  axios
    .post('/user/select_flame', {
      id: user.id
    })
    .then((res) => {
      
      const formattedRows_flame = res.data.rows.map((item_flame) => ({
        ...item_flame,
        alert_time: new Date(item_flame.alert_time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      }));
      setFlame(formattedRows_flame); 
      setIsLoaded_flame(true); 
      console.log('불러온 데이터 :', formattedRows_flame);
    })
    .catch((error) => {
      console.error("Error fetching flame messages: ", error);
    });
};


const handleButtonClick_flame = () => {
  if (isLoaded_flame) {
    setFlame([]);
    setIsLoaded_flame(false); 
  } else {
    fetchFlame();
  }
};


//==========끝 화재감지 메세지 내역 ========================================


//==========가스 메세지 내역 ========================================

const [gas, setGas] = useState([]);
const [isLoaded_gas, setIsLoaded_gas] = useState(false);

// 회원 정보를 가져오는 함수
const fetchGas = () => {
  axios
    .post('/user/select_gas', {
      id: user.id
    })
    .then((res) => {
      
      const formattedRows_gas = res.data.rows.map((item_gas) => ({
        ...item_gas,
        alert_time: new Date(item_gas.alert_time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      }));
      setGas(formattedRows_gas); // 상태 업데이트 함수 수정
      setIsLoaded_gas(true); // 데이터를 불러왔음을 표시
      console.log('불러온 데이터 :', formattedRows_gas);
    })
    .catch((error) => {
      console.error("Error fetching gas messages: ", error);
    });
};


const handleButtonClick_gas = () => {
  if (isLoaded_gas) {
    setGas([]);
    setIsLoaded_gas(false); 
  } else {
    fetchGas();
  }
};
//==========끝 가스 메세지 내역 ========================================

//==========리턴!! ========================================

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header/>

      <br/>
      <br/>
      <br/>
      <h6 className="text-center" style={{ color: "white" }}>데이터 관리페이지 - 회원님들께 발송한 데이터 내용을 확인 할 수 있습니다</h6>
      <br/>
      <br/>

      <div>{/*=====메세지내역=====*/}
        <h4 style={{ textAlign: "center", color: "white" }} >메세지내역</h4>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleButtonClick} variant="success">
            {isLoaded ? "메세지내역 불러오기" : "메세지내역 불러오기"}
          </Button>
        </div>
        {isLoaded && (
          <div style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>데크아이디</th>
                  <th>메세지내용</th>
                  <th>메세지 발송시간</th>
                </tr>
              </thead>
              <tbody>
                {members.map((item) => (
                  <tr key={item.id}>
                    <td>{item.deck_id}</td>
                    <td>{item.msg_content}</td>
                    <td>{item.msg_time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!isLoaded && <p> </p>}
      </div>{/*=====끝메세지내역=====*/}

      <br/>
      <br/>            

      <div>{/*=====일산화탄소 경고 메세지 ======*/}
      <h4 style={{ textAlign: "center", color: "white" }} >일산화탄소 경고메세지</h4>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleButtonClick_co} variant="success">
            {isLoaded_co ? "일산화탄소 경고메세지 내역 불러오기" : "일산화탄소 경고메세지 내역 불러오기"}
          </Button>
        </div>
        {isLoaded_co && (
          <div style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>데크아이디</th>
                  <th>일산화탄소수치(PPM) </th>
                  <th>메세지 발송시간</th>
                </tr>
              </thead>
              <tbody>
                {co.map((item_co) => (
                  <tr key={item_co.id}>
                    <td>{item_co.deck_id}</td> 
                    <td>{item_co.co_ppm}</td>
                    <td>{item_co.alert_time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!isLoaded_co && <p> </p>}       
      </div>{/*=====끝 일산화탄소 경고 메세지 ======*/}

      <br/>
      <br/>


      <div>{/*=====불꽃 경고 메세지===== */}
      <h4 style={{ textAlign: "center", color: "white" }} >화재 경고메세지</h4>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleButtonClick_flame} variant="success">
            {isLoaded_flame ? "화재 경고메세지 내역 불러오기" : "화재 경고메세지 내역 불러오기"}
          </Button>
        </div>
        {isLoaded_flame && (
          <div style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>데크아이디</th>
                  <th>메세지 발송시간</th>
                </tr>
              </thead>
              <tbody>
                {flame.map((item_flame) => (
                  <tr key={item_flame.id}>
                    <td>{item_flame.deck_id}</td>            
                    <td>{item_flame.alert_time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!isLoaded_flame && <p> </p>}  

      </div>{/*=====끝 불꽃 경고 메세지===== */}

      <br/>
      <br/>

      <div>{/*=====가스 경고 메세지===== */}

      <h4 style={{ textAlign: "center", color: "white" }} >유해가스 경고메세지</h4>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleButtonClick_gas} variant="success">
            {isLoaded_gas ? "유해가스 경고메세지 내역 불러오기" : "유해가스 경고메세지 내역 불러오기"}
          </Button>
        </div>
        {isLoaded_gas && (
          <div style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>데크아이디</th>
                  <th>메세지 발송시간</th>
                </tr>
              </thead>
              <tbody>
                {gas.map((item_gas) => (
                  <tr key={item_gas.id}>
                    <td>{item_gas.deck_id}</td>            
                    <td>{item_gas.alert_time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!isLoaded_gas && <p> </p>}  
      
      </div>{/*=====끝 가스 경고 메세지===== */}
      <br/>
      <br/>
      
      <Footer/>
    </div>
  );
};

export default DBManage;
