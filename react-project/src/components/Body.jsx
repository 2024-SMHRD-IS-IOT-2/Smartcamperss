/* "전체 페이지" 입니다.
- 여기에 "Header", "여러 Routes" 컴포넌트 들어갈 예정
*/
import React from 'react'
import MainLive from './MainLive'

const Body = () => {
  return (
    <div>
        <Header/>

        {/* Routes안에 Route들로 나머지 Login,Signup,DB관리페이지, 알림페이지 ... */}
          <MainLive/>
    </div>
  )
}

export default Body