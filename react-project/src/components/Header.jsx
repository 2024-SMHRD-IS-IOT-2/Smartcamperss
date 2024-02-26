/* "메뉴바 페이지"입니다.
- 메뉴바 : 실시간 관리, DB 관리, 공자사항 버튼
*/
import React, { useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Header = () => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '실시간 관리 페이지', value: '1' },
    { name: 'DB 관리 페이지', value: '2' },
    { name: '알림 페이지', value: '3' },
  ];

  return (
    <div>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default Header