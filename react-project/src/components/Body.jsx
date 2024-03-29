/* "전체 페이지" 입니다.
- 여기에 "Header", "여러 Routes" 컴포넌트 들어갈 예정
*/
import React from 'react'
import "../App.css";
import Login from './Login'
import MainLive from './MainLive'
import Notice from './Notice'
import { Route, Routes } from 'react-router-dom';
import LcdLayout from './LcdLayout'
import Join from './Join';
import MyPage from './MyPage';
import '../App.css';
import DBManage from './DBManage';


const Body = () => {
  return (
    <div className="backgroundHong" style={{fontFamily: 'JalnanGothic'}}>
        {/* Header는 로그인이 될 때 띄우도록 하면 로그인 페이지에서 안보이게 할 수 있음 */}
        

        {/* Routes안에 Route들로 나머지 Login,Signup,DB관리페이지, 알림페이지 ... */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/join' element={<Join/>}/>
          <Route path='/dbmanage' element={<DBManage/>}/>
      
          <Route path='/mypage' element={<MyPage/>}/>
          <Route path='/mainlive' element={<MainLive/>}/>
          <Route path='/notice' element={<Notice/>}/>
          <Route path='/lcd/:decknum' element={<LcdLayout/>}/>
        </Routes>          
    </div>
  )
}

export default Body