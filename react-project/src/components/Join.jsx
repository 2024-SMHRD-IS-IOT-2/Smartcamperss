import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const idRef = useRef();
    const pwRef = useRef();
    const pw2Ref = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const campnameRef = useRef();
    const campaddRef = useRef();
    const camptelRef = useRef();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [text, setText] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const checkId = () => {
        axios.post('/user/checkId', { id: idRef.current.value }).then((res) => {
            if (res.data.result === 'dup') {
                setText('※ 사용 불가능한 아이디입니다. 다른 아이디를 입력해주세요.');
            } else {
                setText('※ 사용 가능한 아이디입니다.');
            }
        });
    };

    const handleJoin = (e) => {
        e.preventDefault();
        setUserData({
            id: idRef.current.value,
            pw: pwRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            campname: campnameRef.current.value,
            campadd: campaddRef.current.value,
            camptel: camptelRef.current.value,
        });
    };

    useEffect(() => {
        if (userData.id !== undefined) {
            if (pwRef.current.value === pw2Ref.current.value) {
                axios.post('/user/join', {
                    id: idRef.current.value,
                    pw: pwRef.current.value,
                    name: nameRef.current.value,
                    phone: phoneRef.current.value,
                    email: emailRef.current.value,
                    campname: campnameRef.current.value,
                    campadd: campaddRef.current.value,
                    camptel: camptelRef.current.value,
                }).then((res) => {
                    console.log('요청성공', res.data);
                    window.alert('회원가입 완료!');
                    window.location.href = '/';
                });
            }
        }
    }, [userData, passwordMatch]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                  <h6 className="centered-text">안녕하세요 스마트캠퍼즈 입니다 회원정보를 입력해주세요</h6>
                    <hr />
                    <Form onSubmit={handleJoin}>
                        <Form.Group controlId="formBasicId">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="아이디" ref={idRef} style={{ width: '500px' }} />
                        </Form.Group>
                          <br/>
                        <div className="mb-3 d-grid" style={{ width: '500px' }}>
                            <Button variant="secondary" onClick={checkId} style={{ width: '100%' }}>중복체크</Button>
                            <span>{text}</span>
                        </div>

                        <Form.Group controlId="formBasicPassWord1">
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="비밀번호" ref={pwRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassWord2">
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" ref={pw2Ref} style={{ width: '500px' }} />
                        </Form.Group>

                        <span>※ 비밀번호가 일치하지 않습니다.</span>

                        <Form.Group controlId="formBasicName">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="이름" ref={nameRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="휴대폰 번호" ref={phoneRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="이메일" ref={emailRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampName">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 이름(상호명)" ref={campnameRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampAdd">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 주소" ref={campaddRef} style={{ width: '500px' }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampTel">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 전화번호" ref={camptelRef} style={{ width: '500px' }} />
                        </Form.Group>
                        <br/>

                        <div className="d-grid mb-3">
                            <Button variant="success" type="submit" style={{ width: '500px' }}>회원가입</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Join;