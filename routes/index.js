
const express = require("express");
const controllerTodo = require('../controller/C_todo');
const controller = require('../controller/C_index');
const router = express.Router();

// 기본경로 localhost:PORT/

// GET 
router.get('/', controller.index); // get

router.post('/add', controller.add); //  post

router.patch('/complete', controllerTodo.complete); //  patch

router.post('/del', controller.del); //  delete

router.post('/refresh', controller.refresh); // refresh

module.exports = router;