/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClimateContext } from "../context/ClimateContext";

const MainLive = () => {
  // 센서값 (Ref로 바꾸기 / Object로 바꾸기)
  let sensorData = useRef({})
  // 위도, 경도
  let lat;
  let lon;

  //현재 시간
  let today = new Date();
  let year = today.getFullYear;
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜

  // 모달창 열고닫는 boolean
  const [modalShow, setModalShow] = React.useState(false);
  
  // 오늘날씨 API
  const {weather, setWeather} = useContext(ClimateContext); // state에서 context로 바꿔서 App.js로 올림 => LCD에서도 쓰려고
  // const [weather, setWeather] = useState(null);
  const [forecast5days, setForecast5days] = useState(null);

  
  useEffect(() => {
    // setInterval 꼭 써야하나? useEffect때문에 ref가 바뀌면 당연히 axios 다시 실행될텐데
    setInterval(() => {
      axios.post("/sensor/data", { id: "hi" }).then((res) => {
        sensorData.current = {
          temperature:res.data.sensorData.temperature,
          humidity:res.data.sensorData.humidity,
          battery:res.data.sensorData.battery,
          fire1:res.data.sensorData.fire_1,
          fire2:res.data.sensorData.fire_2,
          fire3:res.data.sensorData.fire_3,
          fire4:res.data.sensorData.fire_4,
          air:res.data.sensorData.Air,
          co:res.data.sensorData.Co
          }
      });
    }, 1000);
  }, [sensorData]);

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
    const API_KEY = process.env.REACT_APP_API_KEY;
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    let response = await axios.get(weather_url);
    // console.log('날씨!!!!!!!!!!!', response.data);
    setWeather(response.data);
  };
  
  // 5일간 일기예보(response.data) 받아오기
  const getForecast5days = async () => {
    try {
        const API_KEY = process.env.REACT_APP_FORECAST_KEY;
        let weather_url = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?serviceKey=${API_KEY}&numOfRows=10&dataType=JSON&stnId=156&pageNo=1&regId=11F20000&tmFc=202402291800`;

        let response = await axios.get(weather_url);
        setForecast5days(response.data);
        console.log("기상예보 :", forecast5days);
    } catch (error) {
        console.error('5일 예보 데이터 가져오기 실패:', error.message);
    }
};
  // mounting 될 때, 날씨 띄우기
  useEffect(() => {
    // eslint-disable-next-line
    getCurrentLocation();
  }); 

  useEffect(()=>{
    // eslint-disable-next-line
    getForecast5days();
  },[])
  

  return (
    <div>
      {/* 가로 배열 */}
      <div>
        {/* 센서값 데이터 테이블 */}
        <div>
          {/* 7행 6열 테이블 */}
          <table className="table" style={{border:'3px solid black'}}>
            {/* 제목 행 */}
            <tr style={{border:'1px solid black'}}>
              <th style={{border:'1px solid black'}}></th>
              <th style={{border:'1px solid black'}}>일산화탄소</th>
              <th style={{border:'1px solid black'}}>온 도</th>
              <th style={{border:'1px solid black'}}>습 도</th>
              <th style={{border:'1px solid black'}}>공기질</th>
              <th style={{border:'1px solid black'}}>배터리</th>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크1</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크2</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크3</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크4</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크5</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
            <tr style={{border:'1px solid black'}}>
              <td style={{border:'1px solid black'}}>데크6</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.co}</td>
              {sensorData.current.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData.current.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData.current.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData.current.battery}</td>
            </tr>
          </table>
        </div>

        {/* 날씨API 띄우기 */}
        <div className="totalClimate" style={{color:'black', fontWeight:'900'}}>
          <p>{today.toLocaleString()}</p>
          <div className="climateinfo">
          <div style={{backgroundColor:'lightblue', marginRight:'20px', borderRadius:"50%", width:'150px', height:'150px'}}>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt=""
            style={{width:'150px', height:'150px', marginRight:'50px'}}
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
            <Modal.Body className="table">
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