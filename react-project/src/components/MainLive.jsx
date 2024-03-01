/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClimateContext } from "../context/ClimateContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MainLive = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); //세션

  const navigate = useNavigate();
  // 센서값 (Ref로 바꾸기 / Object로 바꾸기)
  const [sensorData1, setSensorData1] = useState({
    camp_id: "",
    deck_num: 0,
    temperature: 0,
    humidity: 0,
    battery: 0,
    fire_1: 0,
    fire_2: 0,
    air: 0,
    co: 0,
  });
  let sensorData2 = useRef({});
  let sensorData3 = useRef({});
  let sensorData4 = useRef({});
  let sensorData5 = useRef({});
  let sensorData6 = useRef({});
  // 위도, 경도
  let lat;
  let lon;

  //현재 시간
  let today = new Date();
  let year = today.getFullYear;
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  //임시 관리자 값 부여
  let camp_manger = user.id;

  // 모달창 열고닫는 boolean
  const [modalShow, setModalShow] = React.useState(false);

  // 오늘날씨 API
  const { weather, setWeather } = useContext(ClimateContext); // state에서 context로 바꿔서 App.js로 올림 => LCD에서도 쓰려고
  // const [weather, setWeather] = useState(null);
  const [forecast5days, setForecast5days] = useState(null);

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

  const [batteryStyle, setBatteryStyle] = useState({
    backgroundColor:'orange',
    width:'50%'
  });
  

  // setInterval 꼭 써야하나? useEffect때문에 ref가 바뀌면 당연히 axios 다시 실행될텐데
  function getSensorData() {
    setInterval(() => {
      axios.post("/sensor/data", { id: "hi" }).then((res) => {
        // console.log('데이터', res.data.sensorData[camp_manger].deck_num);
        setSensorData1({
          camp_id: res.data.sensorData[camp_manger][1].camp_id,
          deck_num: res.data.sensorData[camp_manger][1].deck_num,
          temperature: res.data.sensorData[camp_manger][1].temperature,
          humidity: res.data.sensorData[camp_manger][1].humidity,
          battery: res.data.sensorData[camp_manger][1].battery,
          fire1: res.data.sensorData[camp_manger][1].fire_1,
          fire2: res.data.sensorData[camp_manger][1].fire_2,
          air: res.data.sensorData[camp_manger][1].air,
          co: res.data.sensorData[camp_manger][1].co,
        });

        /*
          sensorData1.current = {
            camp_id: res.data.sensorData[camp_manger][1].camp_id,
            deck_num: res.data.sensorData[camp_manger][1].deck_num,
            temperature: res.data.sensorData[camp_manger][1].temperature,
            humidity: res.data.sensorData[camp_manger][1].humidity,
            battery: res.data.sensorData[camp_manger][1].battery,
            fire1: res.data.sensorData[camp_manger][1].fire_1,
            fire2: res.data.sensorData[camp_manger][1].fire_2,
            air: res.data.sensorData[camp_manger][1].air,
            co: res.data.sensorData[camp_manger][1].co,
          };
          console.log('서버에서 받아온 값',res.data.sensorData[camp_manger][1].camp_id);
          console.log('sensorData1에 넣은 값',sensorData1.current.camp_id);
          sensorData2.current = {
            camp_id: res.data.sensorData[camp_manger][2].camp_id,
            deck_num: res.data.sensorData[camp_manger][2].deck_num,
            temperature: res.data.sensorData[camp_manger][2].temperature,
            humidity: res.data.sensorData[camp_manger][2].humidity,
            battery: res.data.sensorData[camp_manger][2].battery,
            fire1: res.data.sensorData[camp_manger][2].fire_1,
            fire2: res.data.sensorData[camp_manger][2].fire_2,
            air: res.data.sensorData[camp_manger][2].air,
            co: res.data.sensorData[camp_manger][2].co,
          };
          sensorData3.current = {
            camp_id: res.data.sensorData[camp_manger][3].camp_id,
            deck_num: res.data.sensorData[camp_manger][3].deck_num,
            temperature: res.data.sensorData[camp_manger][3].temperature,
            humidity: res.data.sensorData[camp_manger][3].humidity,
            battery: res.data.sensorData[camp_manger][3].battery,
            fire1: res.data.sensorData[camp_manger][3].fire_1,
            fire2: res.data.sensorData[camp_manger][3].fire_2,
            air: res.data.sensorData[camp_manger][3].air,
            co: res.data.sensorData[camp_manger][3].co,
          };
          sensorData4.current = {
            camp_id: res.data.sensorData[camp_manger][4].camp_id,
            deck_num: res.data.sensorData[camp_manger][4].deck_num,
            temperature: res.data.sensorData[camp_manger][4].temperature,
            humidity: res.data.sensorData[camp_manger][4].humidity,
            battery: res.data.sensorData[camp_manger][4].battery,
            fire1: res.data.sensorData[camp_manger][4].fire_1,
            fire2: res.data.sensorData[camp_manger][4].fire_2,
            air: res.data.sensorData[camp_manger][4].air,
            co: res.data.sensorData[camp_manger][4].co,
          };
          sensorData5.current = {
            camp_id: res.data.sensorData[camp_manger][5].camp_id,
            deck_num: res.data.sensorData[camp_manger][5].deck_num,
            temperature: res.data.sensorData[camp_manger][5].temperature,
            humidity: res.data.sensorData[camp_manger][5].humidity,
            battery: res.data.sensorData[camp_manger][5].battery,
            fire1: res.data.sensorData[camp_manger][5].fire_1,
            fire2: res.data.sensorData[camp_manger][5].fire_2,
            air: res.data.sensorData[camp_manger][5].air,
            co: res.data.sensorData[camp_manger][5].co,
          };
          sensorData6.current = {
            camp_id: res.data.sensorData[camp_manger][6].camp_id,
            deck_num: res.data.sensorData[camp_manger][6].deck_num,
            temperature: res.data.sensorData[camp_manger][6].temperature,
            humidity: res.data.sensorData[camp_manger][6].humidity,
            battery: res.data.sensorData[camp_manger][6].battery,
            fire1: res.data.sensorData[camp_manger][6].fire_1,
            fire2: res.data.sensorData[camp_manger][6].fire_2,
            air: res.data.sensorData[camp_manger][6].air,
            co: res.data.sensorData[camp_manger][6].co,
          };
          */

        // co > 25ppm 이면 위험!!(시간당)
        if (res.data.sensorData[camp_manger][1].co > 300) {
          alert("주의!! 일산화탄소 수치가 너무 높습니다. 밖으로 나와주세요!");
          axios.post("/sensor/coWarning", {
            coWarning: res.data.sensorData[camp_manger][1].co,
            mem_id: user.id,
            deck_id: res.data.sensorData[camp_manger][1].deck_num,
          });
          clearInterval(getSensorData);
          console.log("잠시 멈춤");
          setTimeout(() => {
            getSensorData();
          }, 10000);
          console.log("다시 시작");
        }
        // 공기질 위험알림
        if (res.data.sensorData[camp_manger][1].air >= 70) {
          alert("주의!! 공기질이 너무 안좋습니다. 환기를 시켜주세요!");
          axios.post("/sensor/airWarning", {
            mem_id: user.id,
            deck_id: res.data.sensorData[camp_manger][1].deck_num,
          });
          return () => clearInterval(getSensorData);
        }
        // 화재 위험알림
        if (
          res.data.sensorData[camp_manger][1].fire1 >= 240 ||
          res.data.sensorData[camp_manger][1].fire2 < 1000
        ) {
          alert("주의!! 화재가 감지되었습니다. 어서 대피하세요!");
          axios.post("/sensor/fireWarning", {
            mem_id: user.id,
            deck_id: res.data.sensorData[camp_manger][1].deck_num,
          });
          return () => clearInterval(getSensorData);
        }

  // 배터리 용량에 따른 모양
  if (res.data.sensorData[camp_manger][1].battery > 420) {
    // 100%
    setBatteryStyle({
      backgroundColor:'green',
      width:'100%'
    })
  } else if (res.data.sensorData[camp_manger][1].battery > 400) {
    // 75%
    setBatteryStyle({
      backgroundColor:'green',
      width:'75%'
    })
  } else if (res.data.sensorData[camp_manger][1].battery > 389) {
    // 50%
    setBatteryStyle({
      backgroundColor:'orange',
      width:'50%'
    })
  } else if (res.data.sensorData[camp_manger][1].battery > 380) {
    // 25%
    setBatteryStyle({
      backgroundColor:'orange',
      width:'25%'
    })
  } else {
    // 10%
    setBatteryStyle({
      backgroundColor:'red',
      width:'10%'
    })
  }   
      });
    }, 5000);
  }

  useEffect(() => {
    getSensorData();
  }, []);

  // // 위치정보(경도, 위도) 받아오기 => getCurrentWeather() 실행
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

  // 5일간 일기예보(response.data) 받아오기
  // const getForecast5days = async () => {
  //   try {
  //       const API_KEY = process.env.REACT_APP_FORECAST_KEY;
  //       let weather_url = `https://apihub.kma.go.kr/api/typ01/url/kma_sfcdd.php?tm=20150715&stn=0&help=1&authKey=${API_KEY}`;

  //       let response = await axios.get(weather_url);
  //       setForecast5days(response.data);
  //       console.log('haha',response.data);
  //       console.log("기상예보 :", forecast5days);
  //   } catch (error) {
  //       console.error('5일 예보 데이터 가져오기 실패:', error.message);
  //   }
  // };
  // // mounting 될 때, 날씨 띄우기
  // useEffect(() => {
  //   // eslint-disable-next-line
  //   getCurrentLocation();
  // },[]);

  // setInterval(() => {
  //   getCurrentLocation();
  // }, 5000);

  // useEffect(()=>{
  //   // eslint-disable-next-line
  //   getForecast5days();
  // },[])

  return (
    <div>
      {/* 가로 배열 */}
      <div>
        {/* 센서값 데이터 테이블 */}
        
          {/* 7행 6열 테이블 */}
          <table style={{ border: "3px solid black", marginLeft:'5%', marginBottom:'10px', width:'90%'}}>
            {/* 제목 행 */}
            <tr style={{ border: "1px solid black" }}>
              <th style={{ border: "1px solid black" }}></th>
              <th style={{ border: "1px solid black" }}>일산화탄소</th>
              <th style={{ border: "1px solid black" }}>온 도</th>
              <th style={{ border: "1px solid black" }}>습 도</th>
              <th style={{ border: "1px solid black" }}>공기질</th>
              <th style={{ border: "1px solid black" }}>배터리</th>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크1</td>
              {sensorData1.co < 200 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.co}
                </td>
              ) : sensorData1.co < 300 ? (
                <td
                  className="warningOrange"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.co}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.co}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                {sensorData1.temperature}
              </td>
              <td style={{ border: "1px solid black" }}>
                {sensorData1.humidity}
              </td>
              {sensorData1.air < 70 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.air}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.air}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                {/* {res.data.sensorData[camp_manger][1].battery} */}
                <div
                  style={batteryStyle}
                ></div>
              </td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크2</td>
              <td 
                className="stableGreen"
                style={{ border: "1px solid black" }}>
                120
              </td>
              <td>23</td>
              <td>13</td>
              <td
              className="stableGreen"
              style={{ border: "1px solid black" }}>
                25</td>
              <td>
              <div
                  style={{width:'80%', backgroundColor:'green'}}
                ></div>
              </td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크3</td>
              <td 
                className="stableGreen"
                style={{ border: "1px solid black" }}>
                120
              </td>
              <td>23</td>
              <td>13</td>
              <td
              className="stableGreen"
              style={{ border: "1px solid black" }}>
                25</td>
              <td>
              <div
                  style={{width:'50%', backgroundColor:'orange'}}
                ></div>
              </td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크4</td>
              <td 
                className="stableGreen"
                style={{ border: "1px solid black" }}>
                120
              </td>
              <td>23</td>
              <td>13</td>
              <td
              className="stableGreen"
              style={{ border: "1px solid black" }}>
                25</td>
              <td>
              <div
                  style={{width:'25%', backgroundColor:'red'}}
                ></div>
              </td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크5</td>
              <td 
                className="stableGreen"
                style={{ border: "1px solid black" }}>
                120
              </td>
              <td>23</td>
              <td>13</td>
              <td
              className="stableGreen"
              style={{ border: "1px solid black" }}>
                25</td>
              <td>
              <div
                  style={{width:'10%', backgroundColor:'red'}}
                ></div>
              </td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크6</td>
              <td 
                className="stableGreen"
                style={{ border: "1px solid black" }}>
                120
              </td>
              <td>23</td>
              <td>13</td>
              <td
              className="stableGreen"
              style={{ border: "1px solid black" }}>
                25</td>
              <td>
              <div
                  style={{width:'100%', backgroundColor:'green'}}
                ></div>
              </td>
            </tr>
            
          </table>

        {/* 날씨API 띄우기 */}
        <div
          className="totalClimate"
          style={{ color: "#ffb300", fontWeight: "900" }}
        >
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

      <Footer/>
    </div>
  );
};

export default MainLive;
