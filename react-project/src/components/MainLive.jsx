/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/
import axios from '../axios';
import React, { useEffect, useState } from 'react';
import '../App.css';

const MainLive = () => {
  const style={
    tableStyle:{
      border:"1px solid black"
    },
    backgroundColorRed:{
      backgroundColor:"red"
    },
    backgroundColorGreen:{
      backgroundColor:"green"
    }
  }
  
  // state -> Ref로 바꾸기
  // Object로 바꾸기
  const [tempData, setTempData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [batteryData, setBatteryData] = useState(null);
  const [fire1Data, setFire1Data] = useState(null);
  const [fire2Data, setFire2Data] = useState(null);
  const [fire3Data, setFire3Data] = useState(null);
  const [fire4Data, setFire4Data] = useState(null);
  const [airData, setAirData] = useState(null);
  const [coData, setCoData] = useState(null);


  useEffect(()=>{
    setInterval(()=>{
      axios
    .post('/sensor/data', {id:'hi'})
    .then((res)=>{
        setTempData(res.data.sensorData.temperature);
        setHumidityData(res.data.sensorData.humidity);
        setBatteryData(res.data.sensorData.battery);
        setFire1Data(res.data.sensorData.fire_1);
        setFire2Data(res.data.sensorData.fire_2);
        setFire3Data(res.data.sensorData.fire_3);
        setFire4Data(res.data.sensorData.fire_4);
        setAirData(res.data.sensorData.Air);
        setCoData(res.data.sensorData.Co);
        console.log(res.data.sensorData.temperature);
    })
    }, 1000)
  },[tempData,humidityData,batteryData,fire1Data,fire2Data,fire3Data,fire4Data,airData,coData])


  return (
    <div>
      {/* 7행 6열 테이블 */}
      <div>
          <table className='table'>
            {/* 제목 행 */}
            <tr>
              <th className='table'></th>
              <th className='table'>일산화탄소</th>
              <th className='table'>온 도</th>
              <th className='table'>습 도</th>
              <th className='table'>공기 질</th>
              <th className='table'>배터리</th>
            </tr>
            <tr>
              <td className='table'>데크1</td>
              <td className='table'>{coData}</td>
                {tempData>23
                ? <td style={style.backgroundColorRed}>{tempData}</td>
                : <td style={style.backgroundColorGreen}>{tempData}</td>
                }
              <td className='table'>{humidityData}</td>
              <td className='table'>{airData}</td>
              <td className='table'>{batteryData}</td>
            </tr>
            <tr>
              <td className='table'>데크2</td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
            </tr>
            <tr>
              <td className='table'>데크3</td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
            </tr>
            <tr>
              <td className='table'>데크4</td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
            </tr>
            <tr>
              <td className='table'>데크5</td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
            </tr>
            <tr>
              <td className='table'>데크6</td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
              <td className='table'></td>
            </tr>
          </table>
        </div>


        {/* 날씨API 띄우기 */}
        <div>

        </div>
    </div>
  )
}

export default MainLive