/* "메뉴바 페이지"입니다.
- 메뉴바 : 실시간 관리, DB 관리, 공자사항 버튼
*/
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

  const radios = [
    { name: '실시간 관리 페이지', value: '1', to:'/mainlive' },
    { name: 'DB 관리 페이지', value: '2', to:'/dbmanage' },
    { name: '알림 페이지', value: '3', to:'/notice' },
    { name: '로그 아웃', value: '4', to:'/' },
  ];

  return (
    <div style={style.buttons}>
      <img src={campers} alt="" style={{width:'50px', height:'50px', marginTop:'10px'}}/>
      <div style={{width:'100px'}}></div>
      <ButtonGroup style={style.buttons}>
        {radios.map((radio, idx) => (
          <Link to={radio.to}>
            <ToggleButton
              style={{width:'200px'}}
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.value==='4'? 'outline-danger' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              // onClick={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
          </ToggleButton>
          </Link>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default Header