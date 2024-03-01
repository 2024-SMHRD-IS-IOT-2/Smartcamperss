import React, { useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  // useRef 생성 - id, pw
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  /** 로그인 기능을 해주는 handleLogin 함수 구현 */
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/user/login', { id: idRef.current.value, pw: pwRef.current.value })
      .then((res) => {
        // 로그인 성공 : success | 로그인 실패 : fail
        if (res.data.result === 'success') {
          const user = res.data.user;
          alert(`${user.name}님 환영합니다🏕️`); // 세션값 활용하여 환영 메시지 생성
          sessionStorage.setItem('user', JSON.stringify(res.data.user)); //세션생성
          navigate('/mainlive');
        } else {
          alert('아이디 혹은 비밀번호를 확인해주세요.');
          navigate('/');
        }
      });
  };

  return (
    <Container style={{ marginTop: '0px' }}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 className="text-center mb-4" style={{ fontFamily: 'JalnanGothic', color: '#ffb300' }}>SavetheCampers</h1>
      <Form onSubmit={handleLogin} style={{ width: '300px', margin: '0 auto' }}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label> </Form.Label>
          <Form.Control type="id" placeholder="  아이디" ref={idRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> </Form.Label>
          <Form.Control type="password" placeholder="  비밀번호" ref={pwRef} />
        </Form.Group>

        <div className='d-grid gap-2 mb-3'>
          <Button variant="success" type="submit">
            로그인
          </Button>
        </div>
      </Form>
      {/* 회원가입 링크 추가 */}
      <p className="text-center" style={{color:'white'}}>계정이 없으신가요? <Link to="/join" style={{ color: '#87CEEB' }}>회원가입</Link></p>
    </Container>
  );
};
export default Login;
