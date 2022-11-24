const express = require("express");
const controller = require('../controller/C_calendar');
const router = express.Router();

// 기본경로: xx.xx.xx.xx:PORT/calendar

router.post('/', controller.getSchedule);
// 일정 정보 가져오기

router.post('/add', controller.addSchedule);
// 일정 추가

router.post('/edit', controller.editSchedule);
// 일정 수정

router.post('/remove', controller.removeSchedule);
// 일정 삭제

module.exports = router;