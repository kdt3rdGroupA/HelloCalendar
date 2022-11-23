const models = require('../models');

const fs = require('fs');	// 파일 시스템 모듈

// GET /index
exports.index = (req, res) => {
  res.render('todo', 
    { 
      title: '전체 ToDo 리스트',
      name: '사용자이름(되면)' 
    });
};

exports.list = (req, res) => {	// ToDo 목록 가져오기
  console.log('돌아?'); //안돌아 ㅅㅂ

	fs.exists('./todo_list.json', (exists) => {	// ToDo 목록 존재 확인 (fs 모듈에서 제공하는)
		if(exists) {
			fs.readFile('./todo_list.json', {
				'encoding': 'utf8'
			}, (err, list) => {	// todo_list.json 파일 읽기
				res.json(list);
			});
		} else {
			var list = {	// 기본 ToDo 목록 형식
				'list': []
			};
				
			fs.writeFile('./todo_list.json', JSON.stringify(list), (err) => {	// todo_list.json 파일 쓰기
				res.json(list);
			});
		}
	});
};

exports.add = (req, res) => {	// 새로운 ToDo 항목 추가하기
  console.log('돌아?');

	var todo = {	// 기본 ToDo 항목 형식
		'date': '',
		'contents': '',
		'complete': false
	};
	todo.date = req.body.date;
	todo.contents = req.body.contents;
	
	
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, (err, data) => {
		data = JSON.parse(data);
		
		data.list.push(todo);	// 새로운 ToDo 항목 추가
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), (err) => {
			res.json(true);
		});
	});
};

exports.complete = (req, res) => {	// 선택한 ToDo 항목 완료하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, (err, data) => {
		data = JSON.parse(data);
		
		data.list[req.body.index].complete = true;
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), (err) => {
			res.json(true);
		});
	});
};

exports.del = (req, res) => {	// 선택한 ToDo 항목 삭제하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, (err, data) => {
		data = JSON.parse(data);
		
		data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), (err) => {
			res.json(true);
		});
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
