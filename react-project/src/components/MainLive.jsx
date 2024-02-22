/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/
import axios from '../axios'
import React, { useEffect, useState } from 'react'

const MainLive = () => {
  
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

  // const showData = ()=>{
  //   axios
  //   .post('/sensor/data', {id:'hi'})
  //   .then((res)=>{
  //       console.log(res.data.sensorData.temperature);
  //   })
  // }
  return (
    <div>
        {/* <button onClick={showData}>sensorBtn</button> */}
        <p>온도</p>
        <p>temp : {tempData}</p>
        <p>hum : {humidityData}</p>
        <p>battery : {batteryData}</p>
        <p>f1 : {fire1Data}</p>
        <p>f2 : {fire2Data}</p>
        <p>f3 : {fire3Data}</p>
        <p>f4 : {fire4Data}</p>
        <p>air : {airData}</p>
        <p>co : {coData}</p>
    </div>
  )
}

export default MainLive