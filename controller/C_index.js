const models = require("../models");
const nowDate = new Date().toISOString().substring(0, 10);

// GET /index
exports.index = (req, res) => {
  // let isLogin = Boolean(req.session.cookie._expires);
  let isLogin = req.session.isLogin;
  let userName;
  let userId;
  console.log("===== isLogin t/f ===> ", isLogin);

  if (isLogin) {
    userName = req.session.data.name;
    userId = req.session.data.id;
    console.log("로그인된 상태!!!~~~~@@@");
    console.log("===== req.session.data.id 출력===\n", req.session.data.id);
    console.log("이게 todo 테이블 key_id가 되야함====>", userId);

    models.Todo.findAll({
      order: [
        // 중요도 순 내림차순 정렬 & 공적이 사적보다 먼저오게 정렬
        ["priority", "DESC"],
      ],
      where: { key_id: userId }, // user_login table에서 prikey인 id값을 받아 같은거 출력
    }).then((result) => {
      // console.log('sel one 찾은 결과', result); //db 읽어온거
      res.render("index", {
        data: result,
        title: `${userName}님의 전체 ToDo 리스트`,
        name: `${userName}`,
        nowDate: `${nowDate}`,
        isLogin: true,
        email: req.session.data.email,
      });
    });
  } else {
    res.render("index", {
      isLogin: false,
    });
  }
  console.log("=====index의 랜더======세션값=========\n", req.session);
};

exports.complete = (req, res) => {
  // 선택한 ToDo 항목 완료하기
  console.log(">>>>>>>>>완료 req <<<<<<<", req.body.complete);
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

exports.del = (req, res) => {
  // 선택한 ToDo 항목 삭제하기
  console.log(121231244234, req.query); //들어오긴 함
  models.Todo.destroy({
    where: { id: req.query.id },
  }).then((result) => {
    console.log("destroy 결과", result); // [ 1 ] : 1개 업테이트 했다는 뜻
    if (result) {
      res.send({ result: true, msg: "todo삭제 완료", data: null });
    } else {
      res.send({ result: false, msg: "todo검색되지 않음", data: null });
    }
  });
};

exports.todoList = (req, res) => {
  if ("isLogin" in req.session) {
    if (!req.session.isLogin) {
      res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
      return 0;
    }
  } else {
    res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
    return 0;
  }
  let data = req.session.data;
  models.Todo.findAll({
    where: {
      key_id: data.id,
    },
  }).then((result) => {
    console.log(result);
    console.log(result.dataValue);
  });
};

exports.refresh = (req, res) => {
  if ("isLogin" in req.session) {
    if (!req.session.isLogin) {
      res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
      return 0;
    }
  } else {
    res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
    return 0;
  }
  let data = req.session.data;
  models.Todo.findAll({
    where: {
      key_id: data.id,
    },
  }).then((result) => {
    let resultArray = Array.from(result);
    let todoData = [];
    resultArray.forEach((element) => {
      todoData.push(element.dataValues);
    });
    res.send({ result: true, msg: "유저todo 배열로전송", data: todoData });
  });
};

exports.add = (req, res) => {
  if ("isLogin" in req.session) {
    if (!req.session.isLogin) {
      res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
      return 0;
    }
  } else {
    res.send({ result: false, msg: "로그인 되지 않았습니다", data: null });
    return 0;
  }
  let data = req.query;
  models.Todo.create({
    key_id: req.session.data.id,
    task: data.task,
  }).then((result) => {
    res.send({ result: true, msg: "todo추가완료", data: result.dataValues });
  });
};
