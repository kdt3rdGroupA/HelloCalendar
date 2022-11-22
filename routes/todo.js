
const express = require("express");
const controller = require('../controller/C_todo');
const router = express.Router();

// 기본경로 localhost:PORT/todo
// 현승님 작성
router.post('/', controller.todoList);

// GET todo
router.get('/', controller.index); // get


router.get('/list', controller.list);  // get

router.post('/add', controller.add); //  post

router.post('/complete', controller.complete); //  post

router.post('/del', controller.del); //  post

module.exports = router;





module.exports = router;
