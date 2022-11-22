const express = require('express');
const controller = require('../controller/C_todo');
const router = express.Router();

// 기본경로: /todo

router.post('/', controller.todoList);