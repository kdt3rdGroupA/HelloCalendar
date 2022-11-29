const models = require('../models');
const nowDate = new Date().toISOString().substring(0, 10);

// GET /index
exports.index = (req, res) => {
	// let isLogin = req.session.isLogin;
	let isLogin = Boolean(req.session.cookie._expires);
	let userName;
	let userId;
	console.log('===== isLogin t/f ===> ',isLogin); 

	if(isLogin){
		userName = req.session.data.name;
		userId = req.session.data.id;
		console.log('로그인된 상태!!!~~~~@@@');
		console.log('===== req.session.data.id 출력===\n',req.session.data.id); 
		console.log('이게 todo 테이블 key_id가 되야함====>',userId);

	models.Todo.findAll(
		{
			order:[ 	// 중요도 순 내림차순 정렬 & 공적이 사적보다 먼저오게 정렬
				['priority', 'DESC'],
				['business', 'DESC']
			],
			where: { key_id: userId},	// user_login table에서 prikey인 id값을 받아 같은거 출력
		}
		
	).then(result => {
    // console.log('sel one 찾은 결과', result); //db 읽어온거 
    res.render('todo', 
		{
			data: result, 
			title: `${userName}님의 전체 ToDo 리스트`,
			name: `${userName}`, 
			nowDate: `${nowDate}`,
			isLogin: `${isLogin}`,
		});
		
  });
}else {
	models.Todo.findAll(
		{
			order:[ 	// 중요도 순 내림차순 정렬 & 공적이 사적보다 먼저오게 정렬
				['priority', 'DESC'],
				['business', 'DESC']
			],
			where: { key_id: 99},	// 예비로 99번을 비로그인시 나올 데이터로 지정
			
		}
	).then(result => {		
		res.render('todo', 
		{
			data: result,
			title: '전체 ToDo 리스트',
			name: '환영합니다!', 
			nowDate: `${nowDate}`,
			isLogin: `${isLogin}`,

		});
		
  });
}
	console.log('=====index의 랜더======세션값=========\n',req.session); 
};


exports.add = (req, res) => {	// 새로운 ToDo 항목 추가하기
	let isLogin = Boolean(req.session.cookie._expires);

	console.log('===========세션값=========\n',req.session); //undefined
	if(isLogin){
		models.Todo.create({
			key_id: req.session.data.id, 

			task: req.body.task,
			priority: req.body.priority,
			startline: req.body.startline,
			// deadline: req.body.deadline,
			complete: req.body.complete,
			business: req.body.business,

		}).then((result)=> {
			console.log('add 결과 ', result);
			res.send(result);
		});
	}else {
		models.Todo.create({
			key_id: 99, //임시  로그인 값 99번

			task: req.body.task,
			priority: req.body.priority,
			startline: req.body.startline,
			// deadline: req.body.deadline,
			complete: req.body.complete,
			business: req.body.business,

		}).then((result)=> {
			console.log('add 결과 ', result);
			res.send(result);
		});
	}
};

exports.complete = (req, res) => {	// 선택한 ToDo 항목 완료하기
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
		console.log(result);
    res.send(result);
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
