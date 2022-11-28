
const express = require("express");
const controller = require('../controller/C_todo');
const router = express.Router();

// 기본경로 localhost:PORT/todo

// 현승님 작성
router.post('/', controller.todoList);

// GET todo
router.get('/', controller.index); // get

// router.get('/list', controller.list);  // get todo/list

router.post('/add', controller.add); //  post

router.patch('/complete', controller.complete); //  patch

router.delete('/del', controller.del); //  delete

module.exports = router;