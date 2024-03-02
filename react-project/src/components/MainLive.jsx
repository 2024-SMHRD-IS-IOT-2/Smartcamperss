import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClimateContext } from "../context/ClimateContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


const MainLive = () => {
  // ============== 변수 등 선언 ======================
  const user = JSON.parse(sessionStorage.getItem("user")); //세션
  const camp_manger = user.id;

  // sensor.jsx(node)에서 받아온 값을 담을 state
  const [data, setData] = useState({
      camp_id: "",
      deck_num: 0,
      temperature: 0,
      humidity: 0,
      battery: 0,
      fire_1: 0,
      fire_2: 1200,
      air: 0,
      co: 0,
      btn:0
    }); 
  // 데이터를 가져오는 동작을 멈출지 여부를 나타내는 상태 변수
  // true : 계속 가져옴 / false : 멈춤
  const [isFetching, setIsFetching] = useState(true);
  // 경고창을 표시할지 여부를 나타내는 상태 변수
  // true : 경고창 뜸 / false : 경고창 안뜸 
  const [showAlert, setShowAlert] = useState(false); 
  // 버튼꺼 경고창 (따로)
  const [showBtnAlert, setShowBtnAlert] = useState(false);

  // LCD페이지 이동
  const navigate = useNavigate();

  // 위도, 경도
  let lat;
  let lon;

  //현재 시간
  let today = new Date();
  // let year = today.getFullYear;
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  // 모달창 열고닫는 boolean
  const [modalShow, setModalShow] = React.useState(false);

  // 오늘날씨 API
  const { weather, setWeather } = useContext(ClimateContext); // state에서 context로 바꿔서 App.js로 올림 => LCD에서도 쓰려고

  // LCD로 센서값(sensorData) 보내는 함수
  const goToLCDPage_1 = () => {
    navigate(`/lcd/1`);
  };
  const goToLCDPage_2 = () => {
    navigate(`/lcd/2`);
  };
  const goToLCDPage_3 = () => {
    navigate(`/lcd/3`);
  };
  const goToLCDPage_4 = () => {
    navigate(`/lcd/4`);
  };
  const goToLCDPage_5 = () => {
    navigate(`/lcd/5`);
  };
  const goToLCDPage_6 = () => {
    navigate(`/lcd/6`);
  };

  // 배터리 모양 선언
  const [batteryStyle, setBatteryStyle] = useState({
    backgroundColor:'orange',
    width:'50%',
    height:'90%'

  });

  // 캠퍼가 버튼 한 번 누르면 버튼테이블 색이 계속 빨개야 해서 만든 state
  const [btnRed1, setBtnRed1] = useState(false);

  // 랜덤숫자 생성
  const [coRandoms, setCoRandom] = useState([0,0,0,0,0]);
  const [tempRandoms, setTempRandoms] = useState([0,0,0,0,0]);
  const [humRandoms, setHumRandoms] = useState([0,0,0,0,0]);
  const [airRandoms, setAirRandoms] = useState([0,0,0,0,0]);

  
  
  // ============== 서버 작동 ======================

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get('/sensor/data')
        setData(response.data); // 받아온 데이터
        setData({
          camp_id: response.data.sensorData[camp_manger][1].camp_id,
          deck_num: response.data.sensorData[camp_manger][1].deck_num,
          temperature: response.data.sensorData[camp_manger][1].temperature,
          humidity: response.data.sensorData[camp_manger][1].humidity,
          battery: response.data.sensorData[camp_manger][1].battery,
          fire_1: response.data.sensorData[camp_manger][1].fire_1,
          fire_2: response.data.sensorData[camp_manger][1].fire_2,
          air: response.data.sensorData[camp_manger][1].air,
          co: response.data.sensorData[camp_manger][1].co,
          btn: response.data.sensorData[camp_manger][1].btn
        });
        console.log('담은 값',data.co);
        // console.log(user.id);

        // 위험알림
        if(parseInt(response.data.sensorData[camp_manger][1].co/17) > 25){
          // console.log('CO에러',data.co);
          setShowAlert(true);
          setIsFetching(false);
          axios.post("/sensor/coWarning", {
            coWarning: response.data.sensorData[camp_manger][1].co,
            mem_id: user.id,
            deck_id: response.data.sensorData[camp_manger][1].deck_num,
          });
        }else if(response.data.sensorData[camp_manger][1].air > 150){
          // console.log('air에러',data.air);
          setShowAlert(true);
          setIsFetching(false);
          axios.post("/sensor/airWarning", {
            mem_id: user.id,
            deck_id: response.data.sensorData[camp_manger][1].deck_num,
          });
        }else if(response.data.sensorData[camp_manger][1].fire_1 >240){
          // console.log('fire1에러',data.fire_1);
          setShowAlert(true);
          setIsFetching(false);
        }else if(response.data.sensorData[camp_manger][1].fire_2 < 1000){
          // console.log('fire2에러',data.fire_2);
          setShowAlert(true);
          setIsFetching(false);
          axios.post("/sensor/fireWarning", {
            mem_id: user.id,
            deck_id: response.data.sensorData[camp_manger][1].deck_num,});
        }else if(
          response.data.sensorData[camp_manger][1].btn === 1){
          setShowBtnAlert(true);
          setIsFetching(false);
          // button DB저장
        }

        //배터리 잔량에 따른 모양 설정
        if (response.data.sensorData[camp_manger][1].battery > 420) {
          // 100%
          setBatteryStyle({
            backgroundColor:'green',
            width:'100%',
            height:'90%'
          })
              } else if (response.data.sensorData[camp_manger][1].battery > 400) {
          // 75%
          setBatteryStyle({
            backgroundColor:'green',
            width:'75%',
            height:'90%'
          })
              } else if (response.data.sensorData[camp_manger][1].battery > 389) {
          // 50%
          setBatteryStyle({
            backgroundColor:'orange',
            width:'50%',
            height:'90%'
          })
              } else if (response.data.sensorData[camp_manger][1].battery > 380) {
          // 25%
          setBatteryStyle({
            backgroundColor:'orange',
            width:'25%',
            height:'90%'
          })
              } else {
          // 10%
          setBatteryStyle({
            backgroundColor:'red',
            width:'10%',
            height:'90%'
          })
              }   

        // 비상 버튼
        if(response.data.sensorData[camp_manger][1].btn == 1){
          setShowBtnAlert(true);
          setIsFetching(false);
      }

      } catch(error){
        console.error(error);
      }
    };

    // 5초 간격으로 데이터 가져오는 함수 실행(창 안뜰 때 == 일정수치 안넘었을 때)
    if(isFetching){
      const interval = setInterval(() => fetchData(), 5000);
      return ()=>clearInterval(interval);
    }
  }, [data, isFetching])

  
  
  // 경고창에서 확인버튼 누르면 경고창 닫고, 다시 데이터 받아오기 시작!
  const handleAlertClose = ()=>{
    setShowAlert(false);
    setIsFetching(true);
  }

  // 버튼 경고창에서 확인버튼 누르면 경고창 닫고, 테이블에 빨간표시, 데이터 받아오기 다시 시작!
  const handleBtnAlertClose = ()=>{
    setShowBtnAlert(false);
    setIsFetching(true);
    setBtnRed1(true);
    console.log('빨간색(true)', btnRed1);
  }

  // 빨갛게 된 칸 누르면 하얗게 변하기 => 위험 해결되면 끄도록!
  const handleBtn = ()=>{
    setBtnRed1(false);
    console.log('하얀색(false)', btnRed1);
  }

  // 랜덤숫자 만들기
  useEffect(()=>{
    const createRandoms = setInterval(() => {
      setCoRandom(Array.from({length: 5}, () => Math.floor(Math.random() * 11) + 70))
      setTempRandoms(Array.from({length: 5}, () => Math.floor(Math.random() *6) + 20))
      setHumRandoms(Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 1))
      setAirRandoms(Array.from({length: 5}, () => Math.floor(Math.random() * 101) + 100))
   }, 5000);

   return ()=>{
    clearInterval(createRandoms);
   }
  }, [])

  // ************ 날씨 *************************************

  // 위치정보(경도, 위도) 받아오기 => getCurrentWeather() 실행
  // const getCurrentLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     lat = position.coords.latitude;
  //     lon = position.coords.longitude;

  //     getCurrentWeather(lat, lon);
  //   });
  // };

  // // OpenWeather API에서 날씨정보(response.data) 받아오기
  // const getCurrentWeather = async (lat, lon) => {
  //   const API_KEY = process.env.REACT_APP_API_KEY;
  //   let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  //   let response = await axios.get(weather_url);
  //   // console.log('날씨!!!!!!!!!!!', response.data);
  //   setWeather(response.data);
  // };

  // // mounting 될 때, 날씨 띄우기
  // useEffect(() => {
  //   // eslint-disable-next-line
  //   getCurrentLocation();
  // },[]);

  // setInterval(() => {
  //   getCurrentLocation();
  // }, 3600000);



  // ============== return문 ======================
  return (
    <div>
      <Header/>

      {/* 경고창 */}
      {showAlert && (
        <div style={{position: 'absolute', zIndex: 98, backgroundColor:'red', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: "2px solid black", display:'flex', flexDirection:'column', alignItems:'center', padding:'1%'}}>
          <p>{data.deck_num}번 데크에서 위험이 감지되었습니다!! 테이블창을 확인하세요!!</p>
          <button onClick={handleAlertClose}>닫기</button>
        </div>
      )}
      {/* 버튼 경고창 */}
      {showBtnAlert && (
        <div style={{position: 'absolute', zIndex: 99, backgroundColor:'red', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: "2px solid black", display:'flex', flexDirection:'column', alignItems:'center', padding:'1%'}}>
        <p>{data.deck_num}번 데크에서 위험벨을 눌렀습니다!! 테이블창을 확인하세요!!</p>
        <button onClick={handleBtnAlertClose}>닫기</button>
      </div>
      )}

      {/* 테이블 + 날씨 데이터 (가로 배열) */}
      <div style={{display:'flex', justifyContent:'space-evenly', margin:'80px 0px 0px 0px'}}>

        {/* 센서값 데이터 테이블 */}
          <table style={{ border: "3px solid black", width:'70%', textAlign:'center'}}>
            {/* 제목 행 */}
            <tr style={{ border: "1px solid black"}}>
              <th style={{ border: "1px solid black" }}></th>
              <th style={{ border: "1px solid black" }}>일산화탄소</th>
              <th style={{ border: "1px solid black" }}>온 도</th>
              <th style={{ border: "1px solid black" }}>습 도</th>
              <th style={{ border: "1px solid black" }}>공기질</th>
              <th style={{ border: "1px solid black" }}>배터리</th>
              <th style={{ border: "1px solid black" }}>위험벨</th>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크1</td>

              {/* CO 데이터 */}
              {parseInt(data.co/17) < 23 
              ? (<td className="stableGreen" style={{ border: "1px solid black" }}>
                  {parseInt(data.co/17)}ppm
                </td>) 
                : parseInt(data.co/17) < 25 
                ? (<td className="warningOrange" style={{ border: "1px solid black" }}>
                  {parseInt(data.co/17)}ppm
                </td>) 
                  : (<td className="warningRed" style={{ border: "1px solid black" }}>
                  {parseInt(data.co/17)}ppm
                </td>)
              }

              {/* 온/습도 데이터 */}
              <td style={{ border: "1px solid black" }}>
                {data.temperature}°C
              </td>
              <td style={{ border: "1px solid black" }}>
                {data.humidity}%
              </td>

              {/* 공기질 데이터 */}
              {data.air < 200 
              ? (<td className="stableGreen" style={{ border: "1px solid black" }}>
                  정상
                </td>) 
                : (<td className="warningRed" style={{ border: "1px solid black" }}>
                  위험
                </td>)
              }

              {/* 배터리 데이터 */}
              <td style={{ border: "1px solid black", textAlign:'start' }}>
                {/* {res.data.sensorData[camp_manger][1].battery} */}
                <div style={batteryStyle}>battery</div>
              </td>

              {/* 버튼 */}
                {!btnRed1
                ? (<td style={{ border: "1px solid black" }}></td>)
                : (
                  <td style={{ border: "1px solid black", backgroundColor:'red'}} onClick={handleBtn}></td>
                )
                }
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크2</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                {parseInt(coRandoms[0]/17)}ppm
              </td>
              <td style={{ border: "1px solid black" }}>{tempRandoms[0]}°C</td>
              <td style={{ border: "1px solid black" }}>{humRandoms[0]}%</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                정상
                </td>
              <td>
              <div style={{width:'25%', backgroundColor:'orange', textAlign:'start'}}>battery</div>
              </td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크3</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                {parseInt(coRandoms[1]/17)}ppm
              </td>
              <td style={{ border: "1px solid black" }}>{tempRandoms[1]}°C</td>
              <td style={{ border: "1px solid black" }}>{humRandoms[1]}%</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                정상
                </td>
              <td>
              <div style={{width:'75%', backgroundColor:'green', textAlign:'start'}}>battery</div>
              </td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크4</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                {parseInt(coRandoms[2]/17)}ppm
              </td>
              <td style={{ border: "1px solid black" }}>{tempRandoms[2]}°C</td>
              <td style={{ border: "1px solid black" }}>{humRandoms[2]}%</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
              정상
                </td>
              <td>
              <div style={{width:'10%', backgroundColor:'red', textAlign:'start'}}>battery</div>
              </td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크5</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                {parseInt(coRandoms[3]/17)}ppm
              </td>
              <td style={{ border: "1px solid black" }}>{tempRandoms[3]}°C</td>
              <td style={{ border: "1px solid black" }}>{humRandoms[3]}%</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
              정상
                </td>
              <td>
              <div style={{width:'100%', backgroundColor:'green', textAlign:'start'}}>battery</div>
              </td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크6</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
                {parseInt(coRandoms[4]/17)}ppm
              </td>
              <td style={{ border: "1px solid black" }}>{tempRandoms[4]}°C</td>
              <td style={{ border: "1px solid black" }}>{humRandoms[4]}%</td>
              <td className="stableGreen" style={{ border: "1px solid black" }}>
              정상
                </td>
              <td>
              <div style={{width:'75%', backgroundColor:'green', textAlign:'start'}}>battery</div>
              </td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
            
            
          </table>

        {/* 날씨API 띄우기 */}
        <div
          className="totalClimate"
          style={{ color: "white", fontWeight: "900" }}
        >
          <div style={{marginBottom:'30px', textAlign:'center'}}>
          <p>{today.toLocaleString()}</p>
          <div className="climateinfo">
            <div
              style={{
                backgroundColor: "lightblue",
                marginRight: "20px",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt=""
                style={{ width: "150px", height: "150px", marginRight: "50px" }}
              />
            </div>
            <div>
              <p>위치 : {weather?.name}</p>
              <p>현재 날씨 : {weather?.weather[0].main}</p>
              <p>기온 : {weather?.main.temp}</p>
              <p>풍속 : {weather?.wind.speed}</p>
            </div>
          </div>
          {/* <button onClick={handleShowForecast}>일기예보</button> */}
          {modalShow ? null : (
            <Button
              variant="primary"
              onClick={() => {
                setModalShow(true);
              }}
            >
              일기 예보
            </Button>
          )}
          </div>
          <br />
          <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column', marginRight:'20px'}}>
              <button onClick={goToLCDPage_1} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_1</button>
              <button onClick={goToLCDPage_2} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_2</button>
              <button onClick={goToLCDPage_3} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_3</button>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <button onClick={goToLCDPage_4} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_4</button>
              <button onClick={goToLCDPage_5} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_5</button>
              <button onClick={goToLCDPage_6} style={{backgroundColor:'green', fontWeight:'bold', marginBottom:'10px'}}>Deck_6</button>
            </div>
          </div>
          
          

          <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                일기 예보
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="table">
              <table>
                <tr>
                  <th></th>
                  <th>
                    {month}/{date + 1}
                  </th>
                  <th>
                    {month}/{date + 2}
                  </th>
                  <th>
                    {month}/{date + 3}
                  </th>
                  <th>
                    {month}/{date + 4}
                  </th>
                  <th>
                    {month}/{date + 5}
                  </th>
                </tr>
                <tr>
                  <td>날씨</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>기온</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <div style={{position:'relative', marginTop:'10px', bottom:'0', width:'100%'}}>
      <Footer/>
      </div>
    </div>
  )
}

export default MainLive
