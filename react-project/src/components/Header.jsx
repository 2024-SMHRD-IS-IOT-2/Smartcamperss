import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useLocation } from 'react-router-dom';
import campers from '../images/campers.png';

const Header = () => {
  const style = {
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '20px 10px 10px'
    }
  };
  const [radioValue, setRadioValue] = useState('1');
  const location = useLocation();

  // 세션값 가져오기
  const user = sessionStorage.getItem('user');

  const handleLogout = () => {
    if (user) {
      const confirmed = window.confirm("로그아웃 하시겠습니까?");
      if (confirmed) {
        sessionStorage.removeItem('user'); // 사용자 정보 삭제
        window.location.href = '/'; // 로그인 페이지로 이동
      }
    } else {
      window.location.href = '/'; // 로그인 페이지로 이동
    }
  };

  // 로그인 상태에 따라 렌더링할 버튼 설정
  const renderButtons = user && location.pathname !== '/' ? (
    [
      { name: '실시간 관리 페이지', value: '1', to:'/mainlive' },
      { name: 'DB 관리 페이지', value: '2', to:'/dbmanage' },
      { name: '알림 페이지', value: '3', to:'/notice' },
      { name: '마이페이지', value: '4', to:'/mypage' }, //
      { name: '로그 아웃', value: '5', onClick: handleLogout },
    ]
  ) : null;

  // 로그인 페이지일 때만 헤더 렌더링
  if (location.pathname === '/') return null;

  return (
    <div style={style.buttons}>
      <img src={campers} alt="" style={{width:'50px', height:'50px', marginTop:'10px'}}/>
      <div style={{width:'100px'}}></div>
      <ButtonGroup style={style.buttons}>
        {renderButtons && renderButtons.map((radio, idx) => (
          <Link to={radio.to} key={idx}>
            <ToggleButton
              style={{width:'200px'}}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.value==='5'? 'outline-danger' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              onClick={radio.onClick}
            >
              {radio.name}
            </ToggleButton>
          </Link>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default Header;
