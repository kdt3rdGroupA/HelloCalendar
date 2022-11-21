const express = require("express");
const controller = require('../controller/C_login');
const router = express.Router();

// 이 라우터 파일의 기본경로 : xxx.xxx.xxx.xxx:PORT/login

router.get('/', controller.loginPage);
// 로그인 페이지 렌더

router.get('/signup', controller.signupPage);
// 회원가입 페이지 렌더

router.get('/pwreset', controller.pwResetPage);
// 패스워드 재발급 페이지

router.get('/pwchange', controller.pwChangePage);
// 패스워드 변경 페이지

router.post('/', controller.login);
// 로그인 요청

router.post('/signup', controller.signup);
// 회원가입 요청

router.post('/logout', controller.logout);
// 로그아웃요청

router.post('/emailAuth', controller.emailAuth);
// 이메일 인증

router.post('/idcheck', controller.idCheck);
// 아이디 중복 검사

router.post('/pwreset', controller.pwReset);
// 비밀번호 재설정

router.post('/pwchange', controller.pwChange);
// 비밀번호 변경

module.exports = router;