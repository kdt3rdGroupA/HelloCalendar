
const models = require("../../models");
const crypto = require('crypto');
const googleKeys = require('../../authinfo/emailkey');
// nodejs의 내장 모듈
const nodemailer = require('nodemailer');

const salt = crypto.pseudoRandomBytes(128).toString("base64");
// rand()보다 완벽한 랜덤생성기
// console.log('len', salt.length); -> 172
// console.log('type', typeof(salt)); -> string
const hashPW = crypto.createHash('sha512').update("tempPW"+salt).digest('hex');
// console.log('len', hashPW.length); -> 128
// console.log('type', typeof(hashPW)); -> string




const dbTest1 = () => {
  const salt = crypto.pseudoRandomBytes(128).toString("base64");
  const hashPW = crypto.createHash('sha512').update("inputPw"+salt).digest('hex');
  models.Login.create({
    userid : "test",
    name : "Test",
    salt : salt,
    hash_pw : hashPW
  }).then(() => {
    console.log(11, salt);
    console.log(12, hashPW);
  });
}
// dbTest1();
const dbTest2 = () => {
  models.Login.findOne({
    where : {
      userid : "test"
    }
  }).then(result => {
    console.log(result.dataValues);
  });
}
// dbTest2();


// =============================================================
// README
//  응답(POST)
//    result:
//      true: 로그인, 회원가입 성공
//      false: 로그인, 회원가입 실패
//    msg:
//      result에관한 이유(ex : 아이디 겹침, 로그인성공, ...)
//    data:
//      요청성공(result : true) 이후 보내지는 정보(로그인정보)
//
//  세션
//    isLogin:
//      
// =============================================================

const login = data => {
  // data-> {userid: ,pw: }
  models.Login.findOne({
    where : {
      userid : data.userid
    }
  })
  .then(result => {
  if (result == null) {
    res.send({result:false, msg:"아이디가 존재하지 않습니다", data:null});
    return 0;
  }
  let userInfo = result.dataValues;
  let inputPwHash = crypto.createHash('sha512').update(data.pw+salt).digest('hex');
  if (result.dataValues.hash_pw == inputPwHash) {
    res.send({result:true, msg:`${userInfo.name}님 환영합니다`, data:userInfo});
  } else {
    res.send({result:false, msg:"잘못된 비밀번호", data:null});
  }
  });
}

const signup = data => {
  //TODO 패스워드가 유효한지 검사(프론트에서두 검사해도 서버측에서 검사)
  // 하지만 패스워드 조건이 결정되지않음
  // data = {name: ,userid: ,pw: }
  let isIdAvailable = false;
  models.Login.findOne({
    where :  {
      userid : data.userid
    }
  })
  .then(result => {
  if (result == null) {
    isIdAvailable = true;
  } else {
    res.send({result:false, msg:"사용할 수 없는 아이디입니다", data:null});
    return 0;
  }
  // 아이디 중복 검사
  const salt = crypto.pseudoRandomBytes(128).toString("base64");
  const hashPW = crypto.createHash('sha512').update(data.pw+salt).digest('hex');
  models.Login.create({
    userid : data.userid,
    name : data.name,
    salt : salt,
    hash_pw : hashPW
  })
  .then(result => {
    //TODO 쿠키또는 세션or 로그인 페이지 이동인지 회의 할것
    res.send({result : true, msg : "회원가입 완료!", data:null});
  });
  // db에 업데이트
});  
}

const logout = () => {
  req.session.destroy(() => {
    res.render('/');
  });
}



sighupData = {
  userid : "test3",
  name : "signuptest",
  pw : "1234"
}

// let transporter = nodemailer.createTransport({
//   service : 'gmail',
//   auth : {
//     user : googleKeys.user,
//     pass : googleKeys.pass
//   }
// });
// let mailOptions = {
//   from : googleKeys.user,
//   to : 'cchs12123@kakao.com',
//   subject : 'hellocalendar email auth',
//   html : '<h1>헬로켈린더 인증</h1>'
// }
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('email sent');
//   }
// });