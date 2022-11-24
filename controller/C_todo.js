const models = require('../models');

// const fs = require('fs');	// 파일 시스템 모듈

// GET /index
exports.index = (req, res) => {

	models.Todo.findAll().then(result => {
    // console.log('sel* 찾은 결과', result); //db 읽어온거
    res.render('todo', 
		{
			data: result, 
			title: '전체 ToDo 리스트',
			name: '사용자 이름?', 
		});
  });
	console.log('===========세션값=========\n',req.session); //undefined

		// console.log(req.session);
};

exports.add = (req, res) => {	// 새로운 ToDo 항목 추가하기
	console.log('===========세션값=========\n',req.session); //undefined
	models.Todo.create({
		key_id: 1, //임시  로그인 값 2번
		task: req.body.task,
    priority: req.body.priority,
		startline: req.body.startline,
		deadline: req.body.deadline,
		complete: req.body.complete,
		business: req.body.business,

  }).then((result)=> {
    console.log('add 결과 ', result);
    res.send(result);
  });
};

exports.complete = (req, res) => {	// 선택한 ToDo 항목 완료하기
	console.log('완료 controller ') //들어오긴 함
	console.log('>>>>>>>>>완료 req <<<<<<<', req.body.complete)
	models.Todo.update(
    {
      complete: req.body.complete,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then((result) => {
    res.send('수정 성공 !!!');
  });
};

exports.del = (req, res) => {	// 선택한 ToDo 항목 삭제하기
	console.log('delete controller ') //들어오긴 함
	models.Todo.destroy({
    where: {id: req.body.id},
  }).then((result) => {
    console.log('destroy 결과', result); // [ 1 ] : 1개 업테이트 했다는 뜻
    res.send('삭제');
  });
};


exports.todoList = (req, res) => {
  if ('isLogin' in req.session){
    if (!req.session.isLogin) {
      res.send({result:false, msg:"로그인 되지 않았습니다", data:null});
      return 0;
    }
  } else {
    res.send({result:false, msg:"로그인 되지 않았습니다", data:null});
      return 0;
  }
	let data = req.session.data;
  models.Todo.findAll({
    where: {
			key_id: data.id
    }
  })
	.then(result => {
		console.log(result);
		console.log(result.dataValue);
	});
}
