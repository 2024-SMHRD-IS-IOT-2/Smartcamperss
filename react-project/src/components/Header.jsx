import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link } from 'react-router-dom';
import campers from '../images/campers.png';

const Header = () => {

  const style={
    buttons:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      flexWrap:'wrap',
      margin:'20px 10px 10px'
    }
  }
  const [radioValue, setRadioValue] = useState('1');

  const handleLogout = () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      // 여기에 로그아웃 관련 로직을 추가합니다.
      // 예를 들어, sessionStorage에서 사용자 정보를 삭제하고 로그인 페이지로 리디렉션하는 등의 작업을 수행할 수 있습니다.
      sessionStorage.removeItem('user'); // 사용자 정보 삭제
      window.location.href = '/'; // 로그인 페이지로 이동
    }
  };

  const radios = [
    { name: '실시간 관리 페이지', value: '1', to:'/mainlive' },
    { name: 'DB 관리 페이지', value: '2', to:'/dbmanage' },
    { name: '알림 페이지', value: '3', to:'/notice' },
    { name: '로그 아웃', value: '4', onClick: handleLogout }, // onClick 핸들러 추가
  ];

  return (
    <div style={style.buttons}>
      <img src={campers} alt="" style={{width:'50px', height:'50px', marginTop:'10px'}}/>
      <div style={{width:'100px'}}></div>
      <ButtonGroup style={style.buttons}>
        {radios.map((radio, idx) => (
          <Link to={radio.to} key={idx}>
            <ToggleButton
              style={{width:'200px'}}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.value==='4'? 'outline-danger' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              // onClick={(e) => setRadioValue(e.currentTarget.value)}
              onClick={radio.onClick} // onClick 핸들러 추가
            >
              {radio.name}
          </ToggleButton>
          </Link>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default Header;
