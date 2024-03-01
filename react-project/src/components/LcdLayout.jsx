/* LCD로 띄울 화면입니다.
- 데크마다 다른 컴포넌트 띄우기
- 온/습도 , 일산화탄소 수치
*/
import React, { useContext, useEffect, useState } from 'react'
import { ClimateContext } from '../context/ClimateContext';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Footer from './Footer';

const LcdLayout = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); //세션

  // 관리자 값 부여
  let camp_manger = user.id;
  
  const [batteryStyle, setBatteryStyle] = useState({
    backgroundColor:'orange',
    width:'50%'
  });

  // 알림창 중복띄우는걸 막는 boolean
  const [checkWarning, setCheckWarning] = useState(false);

    //센서 데이터 넣는 공간
    // const sensorData = useRef({});
    const [sensorData, setSensorData] = useState({
      camp_id: "",
      deck_num: 0,
      temperature: 0,
      humidity: 0,
      battery: 0,
      fire_1: 0,
      fire_2: 0,
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

    
    // 센서 데이터를 주기적으로 가져옴
    // 페이지를 나가면 clearinterval 하여 더이상 반복되서 실행되지 않게 해줌
    // useEffect(() => {
    //       const sensor_interval = setInterval(() => {
    //         axios.post("/sensor/data", { id: "hi" }).then((res) => {
    //             setSensorData({
    //               camp_id:res.data.sensorData.camp_id,
    //               deck_id:res.data.sensorData.deck_id,
    //               temperature:res.data.sensorData.temperature,
    //               humidity:res.data.sensorData.humidity,
    //               battery:res.data.sensorData.battery,
    //               fire1:res.data.sensorData.fire_1,
    //               fire2:res.data.sensorData.fire_2,
    //               fire3:res.data.sensorData.fire_3,
    //               fire4:res.data.sensorData.fire_4,
    //               air:res.data.sensorData.Air,
    //               co:res.data.sensorData.Co
    //               })
    //         });
    //       }, 1000);
    //       return () => clearInterval(sensor_interval);
    //   }, [sensorData]);


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
    function getSensorData() {
      setInterval(() => {
        axios.post("/sensor/data", { id: "hi" }).then((res) => {
          // console.log('데이터', res.data.sensorData[camp_manger].deck_num);
          setSensorData({
            camp_id: res.data.sensorData[camp_manger][1].camp_id,
            deck_num: res.data.sensorData[camp_manger][1].deck_num,
            temperature: res.data.sensorData[camp_manger][1].temperature,
            humidity: res.data.sensorData[camp_manger][1].humidity,
            battery: res.data.sensorData[camp_manger][1].battery,
            fire1: res.data.sensorData[camp_manger][1].fire_1,
            fire2: res.data.sensorData[camp_manger][1].fire_2,
            air: res.data.sensorData[camp_manger][1].air,
            co: res.data.sensorData[camp_manger][1].co,
            btn: res.data.sensorData[camp_manger][1].btn
          });
  
          // co > 25ppm 이면 위험!!(시간당)
          if (res.data.sensorData[camp_manger][1].co > 73) {
            if(checkWarning === false){
              axios.post("/sensor/coWarning", {
                coWarning: res.data.sensorData[camp_manger][1].co,
                mem_id: user.id,
                deck_id: res.data.sensorData[camp_manger][1].deck_num,
              });
              alert(`주의!! 텐트 안의 일산화탄소 수치가 너무 높습니다!!`);
              setCheckWarning(true)
            }
          }else{
            setCheckWarning(false);
          }
          // 공기질 위험알림
          if (res.data.sensorData[camp_manger][1].air >= 200) {
            alert(`주의!! 텐트 안의 유해가스 수치가 너무 높습니다!!`);
            axios.post("/sensor/airWarning", {
              mem_id: user.id,
              deck_id: res.data.sensorData[camp_manger][1].deck_num,
            });
            return () => clearInterval(getSensorData);
          }
  
          // 화재 위험알림
          if (
            res.data.sensorData[camp_manger][1].fire1 >= 240 ||
            res.data.sensorData[camp_manger][1].fire2 < 1000) 
            {
            alert(`주의!! ${res.data.sensorData.deck_num}에서 화재가 감지되었습니다!`);
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
        {sensorData.deck_num == decknum
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
              <td style={{ border: "1px solid black" }}>데크{sensorData.deck_num}</td>
              {sensorData.co < 200 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData.co}
                </td>
              ) : sensorData.co < 300 ? (
                <td
                  className="warningOrange"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData.co}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData.co}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                {sensorData.temperature}
              </td>
              <td style={{ border: "1px solid black" }}>
                {sensorData.humidity}
              </td>
              {sensorData.air < 70 ? (
                <td
                  className="stableGreen"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData.air}
                </td>
              ) : (
                <td
                  className="warningRed"
                  style={{ border: "1px solid black" }}
                >
                  {sensorData.air}
                </td>
              )}
              <td style={{ border: "1px solid black" }}>
                {/* {res.data.sensorData[camp_manger][1].battery} */}
                <div
                  style={batteryStyle}
                ></div>
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

        <div style={{position:'fixed', bottom:'0', width:'100%'}}>
        <Footer/>
        </div>
    </div>
  )
}

export default LcdLayout