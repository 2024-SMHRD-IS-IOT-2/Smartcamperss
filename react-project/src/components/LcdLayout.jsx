/* LCD로 띄울 화면입니다.
- 데크마다 다른 컴포넌트 띄우기
- 온/습도 , 일산화탄소 수치
*/
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ClimateContext } from '../context/ClimateContext';
import { useParams } from 'react-router-dom';
import axios from '../axios';


const LcdLayout = () => {
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
    const {decknum} = useParams();
    const today = new Date();
    const {weather} = useContext(ClimateContext);
    console.log("날씽~~",weather);
    console.log(decknum);


    // 임시 camp_manger id 설정
    let camp_manger = "smhrd1"


        // setInterval 꼭 써야하나? useEffect때문에 ref가 바뀌면 당연히 axios 다시 실행될텐데
          setInterval(() => {
            axios.post("/sensor/data", { id: "hi" }).then((res) => {
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
            });
          }, 5000);

      console.log('hong', sensorData1);



  return (
    <div>
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
        </div>
        {sensorData1.deck_num == decknum
        ? (
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
              <td style={{border:'1px solid black'}}>데크 {sensorData1.deck_num}</td>
              <td style={{border:'1px solid black'}}>{sensorData1.co}</td>
              {sensorData1.temperature > 21 
              ? (<td className="warningRed" style={{border:'1px solid black'}}>{sensorData1.temperature}</td>) 
              : (<td className="stableGreen" style={{border:'1px solid black'}}>{sensorData1.temperature}</td>)
              }
              <td style={{border:'1px solid black'}}>{sensorData1.humidity}</td>
              <td style={{border:'1px solid black'}}>{sensorData1.air}</td>
              <td style={{border:'1px solid black'}}>{sensorData1.battery}</td>
            </tr>
        </table>
        )
        : (null)
        }

        
    </div>
  )
}

export default LcdLayout