const express = require("express");
const router = express.Router();
const conn = require('../config/database');

//**회원가입 시, ID 중복체크
router.post('/checkId', (req,res)=>{
    console.log('ID중복체크 요청...', req.body);

    // 클라이언트로부터 전송된 ID
    const { id } = req.body;

    // DB 연동: 전송된 ID가 이미 데이터베이스에 존재하는지 확인
    const userIdCheck = 'SELECT mem_id FROM tb_member WHERE mem_id = ?';
    conn.query(userIdCheck, [id], (err, rows) => {
        if (err) {
            console.error('ID 중복 체크 오류:', err);
            res.json({ result: 'error' });
        } else {
            // 데이터베이스에서 조회된 결과가 있으면 중복된 ID이므로 'dup'을 응답
            if (rows.length > 0) {
                res.json({ result: 'dup' });
            } else {
                // 조회된 결과가 없으면 중복되지 않은 ID이므로 'uniq'을 응답
                res.json({ result: 'uniq' });
            }
        }
    });
});


//**회원가입 라우터
router.post('/join',(req,res)=>{
    console.log('회원가입 요청...', req.body);

    // DB 연동코드추가
    const {id, pw, name, phone, email, campname, campadd, camptel} = req.body;
    
    const userJoin = 'insert into tb_member(mem_id, mem_pw, mem_name, mem_phone, mem_email, camp_name, camp_add, camp_tel) values (?, ?, ?, ?, ?, ?, ?, ?)';

    conn.query(userJoin, [id, pw, name, phone, email, campname, campadd, camptel], (err, rows) => {
        if(rows){
            console.log('회원가입 완료');
            res.json({result:'success'});
        }else{
            console.log('회원가입 실패');
        }
    })
});







// **로그인 라우터
router.post('/', (req,res)=>{
    console.log('로그인 요청..', req.body);

    // DB연동코드 추가
    const {id, pw} = req.body;
    const sql = 'select mem_id, mem_name from tb_member where mem_id = ? and mem_pw =?';
    conn.query(sql, [id, pw], (err, rows) => {
        console.log('err', err);
        console.log('rows', rows);
        if (rows.length > 0) {
            console.log('로그인 성공');
            res.json({ result: 'success', user: { id, name: rows[0].mem_name } });
        }else {
            console.log('로그인 실패');
            res.json({ result: 'fail'});
        }
    })
    // 로그인 성공

    // 로그인 실패
    // res.json({result:'fail'});
});





















module.exports = router;

