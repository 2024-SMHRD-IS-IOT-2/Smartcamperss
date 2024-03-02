/* LCD로 띄울 화면입니다.
- 데크마다 다른 컴포넌트 띄우기
- 온/습도 , 일산화탄소 수치
*/
import React, { useContext, useEffect, useState } from 'react'
import { ClimateContext } from '../context/ClimateContext';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const LcdLayout = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); //세션

  // 관리자 값 부여
  let camp_manger = user.id;
  
  const [batteryStyle, setBatteryStyle] = useState({
    backgroundColor:'orange',
    width:'0%',
    height:'90%'
  });

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

    // 센서 데이터를 주기적으로 가져옴
    // 페이지를 나가면 clearinterval 하여 더이상 반복되서 실행되지 않게 해줌
    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          const response = await axios.get('/sensor/data')
          // .then((res)=>{
          //   setData({
          //     camp_id: res.data.sensorData[camp_manger][1].camp_id,
          //     deck_num: res.data.sensorData[camp_manger][1].deck_num,
          //     temperature: res.data.sensorData[camp_manger][1].temperature,
          //     humidity: res.data.sensorData[camp_manger][1].humidity,
          //     battery: res.data.sensorData[camp_manger][1].battery,
          //     fire1: res.data.sensorData[camp_manger][1].fire_1,
          //     fire2: res.data.sensorData[camp_manger][1].fire_2,
          //     air: res.data.sensorData[camp_manger][1].air,
          //     co: res.data.sensorData[camp_manger][1].co,
          //     btn: res.data.sensorData[camp_manger][1].btn
          //   });
          //   console.log('담은 값',data);
          // });
          // console.log('받아온 데이터',response.data);
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
  
          //배터리 잔량에 따른 모양 설정
          if (response.data.sensorData[camp_manger][1].battery > 420) {
            // 100%
            setBatteryStyle({
              backgroundColor:'green',
              width:'100%'
            })
                } else if (response.data.sensorData[camp_manger][1].battery > 400) {
            // 75%
            setBatteryStyle({
              backgroundColor:'green',
              width:'75%'
            })
                } else if (response.data.sensorData[camp_manger][1].battery > 389) {
            // 50%
            setBatteryStyle({
              backgroundColor:'orange',
              width:'50%'
            })
                } else if (response.data.sensorData[camp_manger][1].battery > 380) {
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
        } catch(error){
          console.error(error);
        }
      };
  
      // 5초 간격으로 데이터 가져오는 함수 실행(창 안뜰 때 == 일정수치 안넘었을 때)
      
        const interval = setInterval(() => fetchData(), 5000);
        return ()=>clearInterval(interval);
      
    }, [data])
 



  return (
    <div style={{margin:'0', padding:'0'}}>
        {/* 날씨API 띄우기 */}
        <div className="totalClimate" style={{color:'white', fontWeight:'900'}}>
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
        {data.deck_num == decknum
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
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>데크{data.deck_num}</td>
              {data.co < 200 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {data.co}
                </td>
              ) : data.co < 300 ? (
                <td
                  className="warningOrange"
                  style={{ border: "1px solid black" }}
                >
                  {data.co}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {data.co}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                {data.temperature}
              </td>
              <td style={{ border: "1px solid black" }}>
                {data.humidity}
              </td>
              {data.air < 70 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {data.air}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {data.air}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                <div style={batteryStyle}>battery</div>
              </td>
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