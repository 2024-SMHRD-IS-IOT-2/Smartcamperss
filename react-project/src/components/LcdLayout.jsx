/* LCD로 띄울 화면입니다.
- 데크마다 다른 컴포넌트 띄우기
- 온/습도 , 일산화탄소 수치
*/
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ClimateContext } from '../context/ClimateContext';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const LcdLayout = () => {

    //센서 데이터 넣는 공간
    const sensorData = useRef({});

    // useParams를 활용한 데크 번호 넣기
    const {decknum} = useParams();


    //날씨 관련
    const today = new Date();
    const {weather} = useContext(ClimateContext);

    //데크 메세지 변수 정의
    const [deckMessages, setDeckMessages] = useState([]); 

    //데크 메세지 가져오는 함수 선언
    const getDeckMessages = async () => {
      try {
        const response = await axios.get(`/notice/${decknum}`);
        setDeckMessages(response.data);
      } catch (error) {
        console.error('Error fetching deck messages:', error);
      }
    };

    
    // 센서 데이터를 주기적으로 가져옴
    // 페이지를 나가면 clearinterval 하여 더이상 반복되서 실행되지 않게 해줌
    useEffect(() => {
          const sensor_interval = setInterval(() => {
            axios.post("/sensor/data", { id: "hi" }).then((res) => {
              sensorData.current = {
                camp_id:res.data.sensorData.camp_id,
                deck_id:res.data.sensorData.deck_id,
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
          return () => clearInterval(sensor_interval);
      }, [sensorData]);


    // 맨처음에 deckmessages를 가져옵니다
    useEffect(()=>{
      getDeckMessages();
    },[])

    // sendMessage 함수가 실행되었을 때 useEffect를 사용하여 새로운 메시지를 가져옴
    // 페이지를 나가면 clearinterval 하여 더이상 반복되서 실행되지 않게 해줌

    useEffect(() => {
        const interval = setInterval(() => {
          getDeckMessages();
        }, 5000); // 5초마다 새로운 메시지를 가져옴
        return () => clearInterval(interval);
    }, []);



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
        {sensorData.current.deck_id == decknum
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
              <td style={{border:'1px solid black'}}>데크 {sensorData.current.deck_id}</td>
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
        )
        : (null)
        }
        {/* deckmessages를 map함수로 뛰워줌 */}
        <div style={{backgroundColor:'white'}}>
            <ul>
            {deckMessages.map((message, index) => (
            <li key={index}>{message}</li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default LcdLayout