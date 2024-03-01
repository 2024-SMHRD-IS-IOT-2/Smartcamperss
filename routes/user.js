const express = require("express");
const router = express.Router();
const conn = require('../config/database');

// 회원가입 시, ID 중복체크
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


// 회원가입 라우터
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



//**  로그인 라우터
router.post('/login', (req,res)=>{
    console.log('로그인 요청..', req.body);

    // DB연동코드 추가
    const {id, pw} = req.body;
    const sql = 'select mem_id, mem_name, mem_phone, mem_email, camp_name, camp_add, camp_tel from tb_member where mem_id = ? and mem_pw =?';
    conn.query(sql, [id, pw], (err, rows) => {
        console.log('err', err);
        console.log('rows', rows);
        if (rows.length > 0) {
            console.log('로그인 성공');
            res.json({ result: 'success', user: { id, name: rows[0].mem_name, phone: rows[0].mem_phone, email: rows[0].mem_email, campname: rows[0].camp_name, campadd: rows[0].camp_add, camptel: rows[0].camp_tel} });
        }else {
            console.log('로그인 실패');
            res.json({ result: 'fail'});
        }
    })
    // 로그인 성공

    // 로그인 실패
    // res.json({result:'fail'});
});

// **회원정보 (비밀번호) 변경
router.post('/checkPw', (req,res)=>{
    console.log('비밀번호 변경 요청..', req.body);

    // DB연동
    const {id, currentPw, changePw} = req.body;

    const matchPw = 'select * from tb_member where mem_id = ? and mem_pw = ?';
    conn.query(matchPw, [id, currentPw], (err, rows) => {
        if(rows.length > 0){
            console.log('비밀번호 확인 완료');

            const modifyPw = 'update tb_member set mem_pw=? where mem_id = ?';
            conn.query(modifyPw, [changePw, id], (err, rows) => {
                if(rows){
                    console.log('비밀번호 수정 성공');
                    res.json({result:'changed'});
                }else{
                    console.log('비밀번호 수정 실패');
                }
            })
        }else{
            console.log('비밀번호 확인해주세요!');
        }
    })
});


// **회원정보 (이름, 이메일) 수정
router.post('/modify', (req,res)=>{
    console.log('회원정보 수정 요청..', req.body);

    // DB연동코드 추가
    const {id, new_name, new_phone, new_email, new_campname, new_campadd, new_camptel} = req.body;

    const modifyUserInfo = 'update tb_member set mem_name = ?, mem_phone = ?, mem_email = ?, camp_name = ?, camp_add = ?, camp_tel = ? where mem_id = ?';
    conn.query(modifyUserInfo, [new_name, new_phone, new_email, new_campname, new_campadd, new_camptel, id], (err, rows) => {
        if(rows){
            console.log('회원정보 수정 완료');
            res.json({result:'success'});
        }else{
            console.log('회원정보 수정 실패');
        }
    })
});



// **메세지 내역 검색 라우터
router.post('/select_message', (req, res) => {
    console.log('메세지 내역검색', req.body);
    const { id } = req.body;
    const searchmessage = 'SELECT * FROM tb_message WHERE mem_id=?  ORDER BY msg_time DESC';
    conn.query(searchmessage, [id], (err, rows) => {
        if (err) {
            console.error('메세지 내역 불러오기 실패:', err);
            res.status(500).json({ error: '메세지 내역 불러오기 실패' });
        } else {
            console.log('메세지 내역 불러오기 성공');
            res.json({ rows: rows });
        }
    });
});

// **일산화탄소 내역 검색 라우터
router.post('/select_co', (req, res) => {
    console.log('일산화탄소 내역검색', req.body);
    const { id } = req.body;
    const searchco = 'SELECT * FROM tb_co_warning WHERE mem_id=? ORDER BY alert_time DESC';
    conn.query(searchco, [id], (err, rows) => {
        if (err) {
            console.error('일산화탄소 내역 불러오기 실패:', err);
            res.status(500).json({ error: '일산화탄소 내역 불러오기 실패' });
        } else {
            console.log('일산화탄소 내역 불러오기 성공');
            res.json({ rows: rows });
        }
    });
});



// **불꽃감지 내역 검색 라우터
router.post('/select_flame', (req, res) => {
    console.log('불꽃감지 내역검색', req.body);
    const { id } = req.body;
    const searchflame = 'SELECT * FROM tb_flame_warning WHERE mem_id=? ORDER BY alert_time DESC';
    conn.query(searchflame, [id], (err, rows) => {
        if (err) {
            console.error('불꽃감지 내역 불러오기 실패:', err);
            res.status(500).json({ error: '일산화탄소 내역 불러오기 실패' });
        } else {
            console.log('불꽃감지 내역 불러오기 성공');
            res.json({ rows: rows });
        }
    });
});

// **가스경고메세지 내역 검색 라우터
router.post('/select_gas', (req, res) => {
    console.log('가스경고메시지 내역검색', req.body);
    const { id } = req.body;
    const searchgas = 'SELECT * FROM tb_gas_warning WHERE mem_id=? ORDER BY alert_time DESC';
    conn.query(searchgas, [id], (err, rows) => {
        if (err) {
            console.error('가스감지 내역 불러오기 실패:', err);
            res.status(500).json({ error: '가스감지 내역 불러오기 실패' });
        } else {
            console.log('가스감지 내역 불러오기 성공');
            res.json({ rows: rows });
        }
    });
});



module.exports = router;

