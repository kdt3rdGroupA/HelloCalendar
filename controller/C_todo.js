const models = require('../models');

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
  // models.Todo.findAll({
  //   where: {
      
  //   }
  // })
}