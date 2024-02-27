import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'


const Join = () => {
    // useRef 초기화
  const idRef = useRef()
  const pwRef = useRef()
  const pw2Ref = useRef()

  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()

  const campnameRef = useRef()
  const campaddRef = useRef()
  const camptelRef = useRef()


  const navigate = useNavigate();

    // 사용자의 정보를 저장하는 state
    const [userData, setUserData] = useState({});
    const [text, setText] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);  // 비밀번호 일치 여부 상태 추가


    /* 입력된 값이 숫자이거나 백스페이스키인지 확인하는 함수 */
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        // 숫자, 소수점, 백스페이스(46), Tap(9) 키 이외의 입력은 막습니다.
        if ((charCode < 48 || charCode > 57) && charCode !== 46 && charCode !== 8 && (event.keyCode === 9 || event.which === 9)) {
            event.preventDefault();
        }
    };

    /* 입력된 값이 소수점 이하 한 자리까지만 입력되도록 하는 함수 */
    const handleInput = (event) => {
        let value = event.target.value;

        // 숫자와 소수점 이외의 문자는 제거
        value = value.replace(/[^\d.]/g, '');

        event.target.value = value;
    };

    /* ID의 중복체크를 해주는 checkId 함수 구현 */
    const checkId = () => {
        axios
            .post('/user/checkId', { id: idRef.current.value })
            .then((res) => {
                if (res.data.result === 'dup') {
                    setText('※ 사용 불가능한 아이디입니다. 다른 아이디를 입력해주세요.');
                } else {
                    setText('※ 사용 가능한 아이디입니다.');
                }
            });
    };
    /* 비밀번호 확인 함수 */
    const handlePasswordMatch = () => {
        setPasswordMatch(pwRef.current.value === pw2Ref.current.value);
    };

    const handleJoin = (e) => {
        // 기본 이벤트 동작을 막는 함수
        e.preventDefault();
        console.log(idRef.current.value, pwRef.current.value);

        setUserData({
            id:idRef.current.value,
            pw:pwRef.current.value,
            name:nameRef.current.value,
            phone:phoneRef.current.value,
            email:emailRef.current.value,
            campname:campnameRef.current.value,
            campadd:campaddRef.current.value,
            camptel:camptelRef.current.value
        });
    }

    /*
      node.js 서버로 회원가입 정보를 보내는 useEffect 구현
      - 로그인되어 있는 상태인지 판별
      - 비밀번호1, 비밀번호2가 서로 같을 때 데이터 전송 시작 로직 구현
        -> 일치하지 않은 경우 : '※ 비밀번호가 일치하지 않습니다.' 출력(글자색은 빨간색)
    */
    useEffect(() => {
        if (userData.id !== undefined) {
            if (pwRef.current.value === pw2Ref.current.value) {
                axios
                    .post('/user/join', {
                        id:idRef.current.value,
                        pw:pwRef.current.value,
                        name:nameRef.current.value,
                        phone:phoneRef.current.value,
                        email:emailRef.current.value,
                        campname:campnameRef.current.value,
                        campadd:campaddRef.current.value,
                        camptel:camptelRef.current.value
                    })

                    .then((res) => {
                        console.log('요청성공', res.data);

                        window.alert('회원가입 완료!');
                        navigate('/login');

                    });
            }
        }
    }, [userData, passwordMatch]);

    return (
      <div>
        <h1>회원가입</h1>
        <hr/>
        <Form onSubmit={handleJoin}> {/*사용자가 폼을 제출할 때마다 handleJoin 함수가 실행되어 필요한 작업을 수행*/}
        
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>ID</Form.Label>
            <Form.Control                           //const idRef = useRef()를 연결한다 
              type="text" placeholder="Enter ID" ref={idRef}/>
          </Form.Group>
  
          <div className='d-grid gap mb-3'>
            <Button variant='light' onClick={checkId}>중복체크</Button>
            {/* 아이디 중복여부에 따라 다른 내용 출력 */}
            <span>{text}</span> 
          </div>
          
  
          <Form.Group className="mb-3" controlId="formBasicPassWord1">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
            type="password" placeholder="Enter Password" ref={pwRef}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassWord2"  > 
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
            type="password" placeholder="Confirm Password" ref={pw2Ref}/>
          </Form.Group>
  
          {/* 비밀번호1, 비밀번호2가 일치하지 않을 때 내용 출력 */}
          <span>※ 비밀번호가 일치하지 않습니다.</span>
  
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>name</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Name" ref={nameRef}/>
          </Form.Group>
  
  
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>phone</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Phone" ref={phoneRef}/>
          </Form.Group>
  
  
  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Email Address" ref={emailRef}/>
          </Form.Group>
  
  
          <Form.Group className="mb-3" controlId="formBasicCampName">
            <Form.Label>CampName</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Camping Name" ref={campnameRef}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicCampAdd">
            <Form.Label>CampAdd</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Camping Add" ref={campaddRef}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicCampTel">
            <Form.Label>Camptel</Form.Label>
            <Form.Control
            type="text" placeholder="Enter Camping Tel" ref={camptelRef}/>
          </Form.Group>
  
  
  
          <div className='d-grid gap mb-3'>
            <Button variant='success' type='submit'>회원가입</Button>
          </div>
  
        </Form>
      </div>
    )
  }
  
  export default Join