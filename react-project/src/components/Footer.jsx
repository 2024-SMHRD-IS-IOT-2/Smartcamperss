import React from 'react'
import "../App.css";
import logo from '../images/campers.png';

const Footer = () => {
  return (
    <div className='footerComponent footer' style={{backgroundColor:'rgba(98, 98, 98, 0.7)', marginBottom:'0px'}}>
      <h1><img src={logo} alt="" style={{width:'50px', height:'50px', margin:'10px 10px 0px 10px'}}/><span style={{color:'white'}}>SmartCampers</span></h1>
      <hr />
      <p style={{marginTop:'10px', color:'white'}}>팀원 : 김상석, 박희재, 이종권, 최홍철</p>
    </div>
  )
}

export default Footer