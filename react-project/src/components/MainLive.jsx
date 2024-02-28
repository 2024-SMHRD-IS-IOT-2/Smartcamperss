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
    fire_3: 0,
    fire_4: 0,
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
  let camp_manger = "smhrd1";

  // 모달창 열고닫는 boolean
  const [modalShow, setModalShow] = React.useState(false);

  // 오늘날씨 API
  const { weather, setWeather } = useContext(ClimateContext); // state에서 context로 바꿔서 App.js로 올림 => LCD에서도 쓰려고
  // const [weather, setWeather] = useState(null);
  // const [forecast5days, setForecast5days] = useState(null);

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


    // setInterval 꼭 써야하나? useEffect때문에 ref가 바뀌면 당연히 axios 다시 실행될텐데
    function getSensorData(){
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
            fire3: res.data.sensorData[camp_manger][1].fire_3,
            fire4: res.data.sensorData[camp_manger][1].fire_4,
            air: res.data.sensorData[camp_manger][1].air,
            co: res.data.sensorData[camp_manger][1].co,
          })

          /*
          sensorData1.current = {
            camp_id: res.data.sensorData[camp_manger][1].camp_id,
            deck_num: res.data.sensorData[camp_manger][1].deck_num,
            temperature: res.data.sensorData[camp_manger][1].temperature,
            humidity: res.data.sensorData[camp_manger][1].humidity,
            battery: res.data.sensorData[camp_manger][1].battery,
            fire1: res.data.sensorData[camp_manger][1].fire_1,
            fire2: res.data.sensorData[camp_manger][1].fire_2,
            fire3: res.data.sensorData[camp_manger][1].fire_3,
            fire4: res.data.sensorData[camp_manger][1].fire_4,
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
            fire3: res.data.sensorData[camp_manger][2].fire_3,
            fire4: res.data.sensorData[camp_manger][2].fire_4,
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
            fire3: res.data.sensorData[camp_manger][3].fire_3,
            fire4: res.data.sensorData[camp_manger][3].fire_4,
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
            fire3: res.data.sensorData[camp_manger][4].fire_3,
            fire4: res.data.sensorData[camp_manger][4].fire_4,
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
            fire3: res.data.sensorData[camp_manger][5].fire_3,
            fire4: res.data.sensorData[camp_manger][5].fire_4,
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
            fire3: res.data.sensorData[camp_manger][6].fire_3,
            fire4: res.data.sensorData[camp_manger][6].fire_4,
            air: res.data.sensorData[camp_manger][6].air,
            co: res.data.sensorData[camp_manger][6].co,
          };
          */
          
          // co > 25ppm 이면 위험!!(시간당)
          if (res.data.sensorData[camp_manger][1].co > 25 
            || res.data.sensorData[camp_manger][1].air >= 70 
            || res.data.sensorData[camp_manger][1].fire1 >=240
            || res.data.sensorData[camp_manger][1].fire2 < 1000
            || res.data.sensorData[camp_manger][1].fire3 < 1000
            || res.data.sensorData[camp_manger][1].fire4 < 1000) {
            alert("위험이 감지되었습니다!!!");
            clearInterval(getSensorData);
          }
        });
      }, 5000);
    }

    useEffect(()=>{
      getSensorData();
    },[])
    


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
  //   const getForecast5days = async () => {
  //     try {
  //         const API_KEY = process.env.REACT_APP_FORECAST_KEY;
  //         let weather_url = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?serviceKey=${API_KEY}&numOfRows=10&dataType=JSON&stnId=156&pageNo=1&regId=11F20000&tmFc=202402291800`;

  //         let response = await axios.get(weather_url);
  //         setForecast5days(response.data);
  //         console.log("기상예보 :", forecast5days);
  //     } catch (error) {
  //         console.error('5일 예보 데이터 가져오기 실패:', error.message);
  //     }
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
        <div>
          {/* 7행 6열 테이블 */}
          <table className="table" style={{ border: "3px solid black" }}>
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
              {sensorData1.co < 20 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData1.co}
                </td>
              ) : sensorData1.co < 25 ? (
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
                {sensorData1.battery}
              </td>
            </tr>
          </table>
        </div>

        {/* 날씨API 띄우기 */}
        <div
          className="totalClimate"
          style={{ color: "black", fontWeight: "900" }}
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
          <button onClick={goToLCDPage_1}>Deck_1</button>
          <button onClick={goToLCDPage_2}>Deck_2</button>
          <button onClick={goToLCDPage_3}>Deck_3</button>
          <button onClick={goToLCDPage_4}>Deck_4</button>
          <button onClick={goToLCDPage_5}>Deck_5</button>
          <button onClick={goToLCDPage_6}>Deck_6</button>

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
    </div>
  );
};

export default MainLive;
