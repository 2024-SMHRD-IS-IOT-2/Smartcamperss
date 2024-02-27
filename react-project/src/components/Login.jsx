import React, { useRef } from 'react'
import {Form, Button} from 'react-bootstrap';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const Login = () => {

  // useRef 생성 - id, pw
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  /** 로그인 기능을 해주는 handleLogin 함수 구현 */
  const handleLogin = (e) => {
    e.preventDefault();

    axios
        .post('/user/', {id: idRef.current.value, pw: pwRef.current.value})
        .then((res)=>{
          // 로그인 성공 : success | 로그인 실패 : fail
          if(res.data.result === 'success'){
            alert('로그인 성공!');

            sessionStorage.setItem('user',JSON.stringify(res.data.user));

            // window.location.href = '/main';
            navigate('/mainlive');
          }else{
            alert('아이디 혹은 비밀번호를 확인해주세요.');
            navigate('/');
          }
        });
  }
  
  return (
    <div>
    <h1>로그인</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="id" placeholder="Enter id" ref={idRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pwRef}/>
        </Form.Group>


        <div className='d-grid gap mb-3'>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>
       {/* 회원가입 링크 추가 */}
        <p>계정이 없으신가요? <Link to="/join"s>회원가입</Link></p>
    </div>
  )
}

export default Login