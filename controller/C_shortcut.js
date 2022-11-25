const models = require("../models");

exports.getShortcut = (req, res) => {
  if (!req.session.isLogin) {
    res.send({result:false, msg:"로그인 되지 않음", data:null});
    return 0;
  }
  models.Shortcut.findAll({
    where: {
      key_id: req.session.data.id
    }
  }).then(result => {
    let shortcuts = [];
    let resultArray = Array.from(result);
    resultArray.forEach(element => {
      shortcuts.push(element.dataValues);
    });
    res.send({result:true, msg:"유저 바로가기 링크 배열로 전송", data:shortcuts});
  });
};
exports.addShortcut = (req, res) => {
  let data = req.query;
  // data -> {name: ,link:}
  models.Shortcut.create({
    key_id: req.session.data.id,
    name: data.name,
    link: data.link
  }).then(result => {
    res.send({result:true, msg:"링크추가완료", data:null});
  });
};
exports.removeShortcut = (req, res) => {
  let targetKey = req.query.linkKey;
  models.Shortcut.destroy({
    where: {
      id: targetKey
    }
  }).then(result => {
    if (result) {
      res.send({result:true, msg:"삭제완료", data:null});
    } else {
      res.send({result:false, msg:"링크를 찾을수 없습니다", data:null});
    }
  });
};
