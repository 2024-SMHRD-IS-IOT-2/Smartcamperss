import React from 'react';
import "../App.css";

const Footer = () => {
  return (
    <div className='footerComponent footer' style={{ backgroundColor: 'rgba(98, 98, 98, 0.7)', marginBottom: '0px', padding: '10px' }}>
      <div style={{ textAlign: 'right', marginLeft: '10px' }}> {/* 여백 추가 */}
        <p style={{ marginTop: '1px', color: 'white', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'lighter', lineHeight: '1' }}>(주) 스마트캠퍼즈-세이프더캠퍼즈</p>
        <p style={{ marginTop: '5px', color: 'white', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'lighter', lineHeight: '1' }}>사업자번호: 20-23112-0202-406-04</p>
        <p style={{ marginTop: '5px', color: 'white', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'lighter', lineHeight: '1' }}>본점: 광주광역시 동구 예술길 31-15 3~4, 7층</p>
        <p style={{ marginTop: '5px', color: 'white', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'lighter', lineHeight: '1' }}>대표이메일: SmartCampers@SmartCampers.or.kr</p>
      </div>
    </div>
  );
};

export default Footer;
