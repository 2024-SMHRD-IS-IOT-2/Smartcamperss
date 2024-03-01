import React, { useRef, useState } from "react";
import { Table, Form, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MyPage = () => {
  /* sessionStorage에 저장된 사용자정보(user) 가져오기 */
  let user = JSON.parse(sessionStorage.getItem('user')) || null;

  const pwRef = useRef();
  const pw2Ref = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const campnameRef = useRef();
  const campaddRef = useRef();
  const camptelRef = useRef();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const changePWD = () => {
    axios.post('/user/checkPw',{
      id:user.id,
      currentPw:pwRef.current.value, 
      changePw:pw2Ref.current.value
    }).then((res)=>{
      if(res.data.result ==='changed'){
        alert('비밀번호 변경 완료!');
        handleClose();
        navigate('/');
      }
    });
  }

  const handleModify = () =>{
    axios.post('/user/modify',{
      id:user.id,
      new_name:nameRef.current.value,
      new_phone:phoneRef.current.value,
      new_email:emailRef.current.value,
      new_campname:campnameRef.current.value,
      new_campadd:campaddRef.current.value,
      new_camptel:camptelRef.current.value
    }).then((res)=>{
      if(res.data.result ==='success'){
        sessionStorage.setItem('user', JSON.stringify({
          ...user,
          name:nameRef.current.value,
          phone:phoneRef.current.value,
          email:emailRef.current.value,
          campname:campnameRef.current.value,
          campadd:campaddRef.current.value,
          camptel:camptelRef.current.value
        }));
        alert('회원정보가 변경 되었습니다');
      }
    });
  }

  const handleReset = () => {
    nameRef.current.value = '';
    phoneRef.current.value = '';
    emailRef.current.value = '';
    campnameRef.current.value = '';
    campaddRef.current.value = '';
    camptelRef.current.value = '';
  }

  return (
    <div className="main-body">
      <br/>
      <br/>
      <h6 className="text-center">개인정보관리 - 소중한 내 정보를 최신으로 관리하세요</h6>
      <br/>
      <div align="center">
        <Table striped="columns" style={{ maxWidth: '600px', margin: 'auto' }}>
          <tbody align="center">
            <tr>
              <td className="small">아이디</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td className="small">비밀번호</td>
              <td>
                <div className="d-grid gap-2">
                  <Button variant="secondary" size="sm" onClick={handleShow}>
                    비밀번호 변경
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="small">이름</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.name} ref={nameRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
            <tr>
              <td className="small">휴대폰 번호</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.phone} ref={phoneRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
            <tr>
               <td className="small">이메일 주소</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.email} ref={emailRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
            <tr>
              <td className="small">캠핑장 이름(상호명)</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.campname} ref={campnameRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
            <tr>
              <td className="small">캠핑장 주소</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.campadd} ref={campaddRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
            <tr>
            <td className="small">캠핑장 전화번호</td>
              <td>
                <Form.Control type="text" size="sm" defaultValue={user.camptel} ref={camptelRef} style={{ fontSize: '12px' }} />
              </td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <Row className="justify-content-center">
          <Col>
            <Button variant="success" size="sm" onClick={handleModify} className="mx-auto d-block">
              개인정보수정
            </Button>
            <br/>
            <Button variant="secondary" size="sm" onClick={handleReset} className="mx-auto d-block" style={{marginBottom:'10px'}}>
              다시쓰기
            </Button>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>현재 비밀번호</Form.Label>
          <Form.Control type="password" size="sm" ref={pwRef} /> 
          <Form.Label>바꿀 비밀번호</Form.Label>
          <Form.Control type="password" size="sm" ref={pw2Ref} />
        </Modal.Body>
        <Modal.Footer>
          <br/>
          <Button variant="success" onClick={changePWD}>
            비밀번호 수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            수정취소
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer/>
    </div>
  );
}

export default MyPage;
