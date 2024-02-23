/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/

import React, { useEffect, useState } from "react";
import axios from "../axios";
// import Button from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLive = () => {
  // 센서값 (Ref로 바꾸기 / Object로 바꾸기)
  const [tempData, setTempData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [batteryData, setBatteryData] = useState(null);
  const [fire1Data, setFire1Data] = useState(null);
  const [fire2Data, setFire2Data] = useState(null);
  const [fire3Data, setFire3Data] = useState(null);
  const [fire4Data, setFire4Data] = useState(null);
  const [airData, setAirData] = useState(null);
  const [coData, setCoData] = useState(null);
  let lat;
  let lon;

  //현재 시간
  let today = new Date();
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  // 오늘날씨 API
  const [weather, setWeather] = useState(null);

  // 모달창 열고닫는 boolean
  const [modalShow, setModalShow] = React.useState(false);

  // 위치정보(경도, 위도) 받아오기 => getCurrentWeather() 실행
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      getCurrentWeather(lat, lon);
    });
  };

  // OpenWeather API에서 날씨정보(response.data) 받아오기
  const getCurrentWeather = async (lat, lon) => {
    const API_KEY = "f6b15a5a4dc73b1cf5fba8109e152950";
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    let response = await axios.get(weather_url);
    // console.log('날씨!!!!!!!!!!!', response.data);
    setWeather(response.data);
  };

  // mounting 될 때, 날씨 띄우기
  useEffect(() => {
    getCurrentLocation();
  }); 

  useEffect(() => {
    setInterval(() => {
      axios.post("/sensor/data", { id: "hi" }).then((res) => {
        setTempData(res.data.sensorData.temperature);
        setHumidityData(res.data.sensorData.humidity);
        setBatteryData(res.data.sensorData.battery);
        setFire1Data(res.data.sensorData.fire_1);
        setFire2Data(res.data.sensorData.fire_2);
        setFire3Data(res.data.sensorData.fire_3);
        setFire4Data(res.data.sensorData.fire_4);
        setAirData(res.data.sensorData.Air);
        setCoData(res.data.sensorData.Co);
        // console.log(res.data.sensorData.temperature);
      });
    }, 1000);
  }, [
    tempData,
    humidityData,
    batteryData,
    fire1Data,
    fire2Data,
    fire3Data,
    fire4Data,
    airData,
    coData,
  ]);

  return (
    <div>
      {/* 가로 배열 */}
      <div>
        {/* 센서값 데이터 테이블 */}
        <div>
          {/* 7행 6열 테이블 */}
          <table className="table">
            {/* 제목 행 */}
            <tr>
              <th></th>
              <th>일산화탄소</th>
              <th>온 도</th>
              <th>습 도</th>
              <th>공기질</th>
              <th>배터리</th>
            </tr>
            <tr>
              <td>데크1</td>
              <td>{coData}</td>
              {tempData > 23 
              ? (<td>{tempData}</td>) 
              : (<td>{tempData}</td>)
              }
              <td>{humidityData}</td>
              <td>{airData}</td>
              <td>{batteryData}</td>
            </tr>
            <tr>
              <td>데크2</td>
              <td></td>
              {tempData > 23 ? (
                <td>{tempData}</td>
              ) : (
                <td>{tempData}</td>
              )}
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>데크3</td>
              <td></td>
              {tempData > 23 ? (
                <td>{tempData}</td>
              ) : (
                <td>{tempData}</td>
              )}
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>데크4</td>
              <td></td>
              {tempData > 23 ? (
                <td>{tempData}</td>
              ) : (
                <td>{tempData}</td>
              )}
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>데크5</td>
              <td></td>
              {tempData > 23 ? (
                <td>{tempData}</td>
              ) : (
                <td>{tempData}</td>
              )}
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>데크6</td>
              <td></td>
              {tempData > 23 ? (
                <td>{tempData}</td>
              ) : (
                <td>{tempData}</td>
              )}
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

        {/* 날씨API 띄우기 */}
        <div>
          <p>{today.toLocaleString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>위치 : {weather?.name}</p>
          <p>현재 날씨 : {weather?.weather[0].main}</p>
          <p>기온 : {weather?.main.temp}</p>
          <p>풍속 : {weather?.wind.speed}</p>
          {/* <button onClick={handleShowForecast}>일기예보</button> */}
          {modalShow
          ? (
            null
          )
          : (
            <Button variant="primary" onClick={() => {
              setModalShow(true)
              }}>
            일기 예보
          </Button>
          )
          }

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
            <Modal.Body>
              <table>
                <tr>
                  <th></th>
                  <th>{month}/{date+1}</th>
                  <th>{month}/{date+2}</th>
                  <th>{month}/{date+3}</th>
                  <th>{month}/{date+4}</th>
                  <th>{month}/{date+5}</th>
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