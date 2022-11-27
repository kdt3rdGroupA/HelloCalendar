const express = require("express");
const controller = require('../controller/C_shortcut');
const router = express.Router();

// 기본경로: xx.xx.xx.xx:PORT/shortcut

router.post('/', controller.getShortcut);
// 바로가기 가져오기

router.post('/add', controller.addShortcut);
// 바로가기 추가

router.post('/remove', controller.removeShortcut);
// 바로가기 삭제


module.exports = router;