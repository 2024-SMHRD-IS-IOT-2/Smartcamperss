/* "실시간 페이지"입니다.
==> 라이브로 센서값 띄워주는 페이지(센서값 : 온/습도, 일산화탄소, 배터리, 화재감지)
==> 위험 감지 시, alert창 띄우기(이건 모든 곳에서 띄워야 하므로 Body에서 처리하면 되나??)
==> 
*/
import axios from '../axios'
import React from 'react'

const MainLive = () => {
  
  const showData = ()=>{
    axios
    .post('/sensor/data', {id:'hi'})
    .then((res)=>{
        console.log(res.data.temperature);
    })
  }
  return (
    <div>
        <button onClick={showData}>sensorBtn</button>
    </div>
  )
}

export default MainLive