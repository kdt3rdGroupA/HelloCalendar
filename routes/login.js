const express = require("express");
const controller = require('../controller/C_login');
const router = express.Router();

// 이 라우터 파일의 기본경로 : xxx.xxx.xxx.xxx:PORT/login

router.get('/', controller.loginPage);
// 로그인 페이지 렌더

router.get('/signup', controller.signupPage);
// 회원가입 페이지 렌더

router.post('/', controller.login);
// 로그인 요청

router.post('/signup', controller.signup);
// 회원가입 요청