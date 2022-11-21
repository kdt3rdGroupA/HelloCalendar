const models = require('../models');
const crypto = require('crypto');

exports.loginPage = (req, res) => {
  console.log(null);
  // res.render("login");
};
exports.signupPage = (req, res) => {
  console.log(null);
  // res.render("signup");
};
exports.login = (req, res, data) => {
  // data-> {userid: ,pw: }
  models.Login.findOne({
    where : {
      userid : data.userid
    }
  })
  .then(result => {
  if(result == null) {
    res.send({result:false, msg:"아이디가 존재하지 않습니다", data:null});
    return 0;
  }
  let userInfo = result.dataValues;
  let inputPwHash = crypto.createHash('sha512').update(data.pw+salt).digest('hex');
  if (userInfo.hash_pw == inputPwHash) {
    res.send({result:true, msg:`${userInfo.name}님 환영합니다`, data:userInfo});
  } else {
    res.send({result:false, msg:"잘못된 비밀번호", data:null});
  }
  });
};
exports.signup = (req, res) => {

  console.log(null);
};
exports.logout = (req, res) => {

  console.log(null);
}