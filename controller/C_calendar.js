const models = require("../models");

exports.getSchedule = (req, res) => {
  if (req.session.isLogin != true) {
    res.send({result:false, msg:"로그인 되지 않음", data:null});
    return 0;
  }
  models.Calendar.findAll({
    where: {
      key_id: req.session.data.id
    }
  }).then(result => {
  let schedules = [];
  let resultArray = Array.from(result);
  resultArray.forEach(element => {
    schedules.push(element.dataValues);
  });
  res.send({result:true, msg:"유저의 일정정보 배열로 전송", data:schedules});
  });
};
exports.addSchedule = (req, res) => {
  if (req.session.isLogin != true) {
    res.send({result:false, msg:"로그인 되지 않음", data:null});
    return 0;
  }
  let data = req.query;
  // data -> {name: detail: startDate: endDate:}
  models.Calendar.create({
    key_id: req.session.data.id,
    name: data.name,
    detail: data.detail,
    startDate: data.startDate,
    endDate: data.endDate
  }).then(result => {
    console.log(result);
    res.send({result:true, msg:"일정추가완료", data:result.dataValues});
  });
};
exports.editSchedule = (req, res) => {
  if (req.session.isLogin != true) {
    res.send({result:false, msg:"로그인 되지 않음", data:null});
    return 0;
  }
  let targetKey = req.query.calendarKey
  let data = req.query.newData;
  // data: {updateIndex1:, updateIndex2:, ...}
  models.Calendar.findOne({
    where: {
      id: targetKey
    }
  }).then(result => {
  if (result == null) {
    res.send({result:false, msg:"일정을 찾을수 없습니다", data:null});
    return 0;
  }
  if (result.dataValues.key_id != req.session.data.id) {
    res.send({result:false, msg:"잘못된 접근", data:null});
    req.session.destroy();
    // 타계정 데이터 접근에 대한 세션 종료
    return 0;
  }
  models.Calendar.update(data, {
    where: {
      id: targetKey
    }
  }).then(result => {
  if (result[0]) {
    res.send({result:true, msg:"일정 수정됨", data:null});
  } else {
    res.send({result:false, msg:"일정을 찾을수 없습니다", data:null});
  }
  });
  });
  
};
exports.removeSchedule = (req, res) => {
  if (req.session.isLogin != true) {
    res.send({result:false, msg:"로그인 되지 않음", data:null});
    return 0;
  }
  let targetKey = req.query.calendarKey;
  models.Calendar.findOne({
    where: {
      id: targetKey
    }
  }).then(result => {
  if (result == null) {
    res.send({result:false, msg:"일정을 찾을수 없습니다", data:null});
    return 0;
  }
  if (result.dataValues.key_id != req.session.data.id) {
    res.send({result:false, msg:"잘못된 접근", data:null});
    req.session.destroy();
    // 타계정 데이터 접근에 대한 세션 종료
    return 0;
  }
  models.Calendar.destroy({
    where: {
      id: targetKey
    }
  }).then(result => {
    if (result) {
      res.send({result:true, msg:"삭제완료", data:null});
    } else {
      res.send({result:false, msg:"일정을 찾을수 없습니다", data:null});
    }
  });
  });
};
