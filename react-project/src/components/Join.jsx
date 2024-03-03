import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

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
                setText(<span style={{ color: 'orange' }}>※ 사용 불가능한 아이디입니다. 다른 아이디를 입력해주세요.</span>);
            } else {
                setText(<span style={{ color: 'white' }}>※ 사용 가능한 아이디입니다.</span>);
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
                    window.alert('SavetheCampers 가입을 축하합니다😄😁');
                    window.location.href = '/';
                });
            }
        }
    }, [userData, passwordMatch]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <br /><br /><br />
                  <h6 className="text-center" style={{ color: "white" }}>캠퍼들의 안전을 지켜주는 세이브더캠퍼즈 입니다 회원정보를 입력해주세요</h6>
                    
                    <Form onSubmit={handleJoin}>
                        <Form.Group controlId="formBasicId">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="아이디" ref={idRef} />
                        </Form.Group>
                          <br/>
                        <div className="mb-3 d-grid">
                            <Button variant="secondary" onClick={checkId} style={{ width: '100%' }}>중복체크</Button>
                            <span>{text}</span>
                        </div>

                        <Form.Group controlId="formBasicPassWord1">
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="비밀번호" ref={pwRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassWord2">
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="비밀번호 확인" ref={pw2Ref} />
                        </Form.Group>


                        <Form.Group controlId="formBasicName">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="이름" ref={nameRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="휴대폰 번호" ref={phoneRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="이메일" ref={emailRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampName">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 이름(상호명)" ref={campnameRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampAdd">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 주소" ref={campaddRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCampTel">
                            <Form.Label> </Form.Label>
                            <Form.Control type="text" placeholder="캠핑장 전화번호" ref={camptelRef} />
                        </Form.Group>
                        <br/>

                        <div className="d-grid mb-3">
                            <Button variant="success" type="submit" >회원가입</Button>
                            <br/>
                            <br/>
                            <Footer/>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Join;
