
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

// models.Todo.findOne({
//   where :  {
//     key_id : 8
//   }
// })
// .then(result => {
//   // console.log(result[2].dataValues);
//   console.log(result);
  
// });

// models.Todo.update({
//   key_id: 4
// }, {
//   where: {
//     id: 3
//   }  
// }).then(result => {
//   console.log(112, result[0]);
// });

// models.Todo.destroy({
//   where: {
//     key_id: 4
//   }
// }).then(r => {
//   console.log(114, r);
// });
// models.Todo.create({
//   key_id: 1,
//   task: "테스크1",
//   priority: 1,
//   complete: 0
// }).then(result => {
//   console.log(result);
// });models.Todo.create({
//   key_id: 1,
//   task: "테스크2",
//   priority: 1,
//   complete: 0
// }).then(result => {
//   console.log(result);
// });models.Todo.create({
//   key_id: 1,
//   task: "테스크3",
//   priority: 1,
//   complete: 0
// }).then(result => {
//   console.log(result);
// });
// console.log("2022-11-2" > "2022-11-12");

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
  // data = {name: ,userid: ,pw: ,email:}
  let isIdAvailable = false; // 사용되지 않음
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
    email : data.email,
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
  email : "test@domain.com",
  pw : "1234"
}

let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : googleKeys.user,
    pass : googleKeys.pass
  }
});
let mailOptions = {
  from : "HELLO.CAL",
  to : 'cchs12123@kakao.com',
  subject : '[HelloCalendar] email auth',
  html : `<h1 style="color: royalblue;
  text-align: center;
  font-size: 10vw;
  margin-top: 10vw;
  height: 10vw;
  padding: 0 10vw;">Hello Calendar</h1>
  <div style="font-weight: 600;
  text-align: center;
  padding: 0 10vw;">인증번호로 이메일 인증을 진행하세요</div>
  <h2 style="width: 50vw;
  margin: 10vw auto;
  height: 12vw;
  font-size: 10vw;
  line-height: 12vw;
  background-color: #d4d4d4;
  border-radius: 4vw;
  text-align: center;
  border: 0;
  font-weight: 500;">123456</h2>`
}
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('email sent');
//   }
// });

const emailAuth = address => {
  // address -> 유저의 이메일
  // return: 인증번호


}
// const emailAuthTest = (address) => {
//   // address : 유저이메일
//   let authNum = Math.floor(1000000*Math.random());
//   mailOptions.to = address;
//   mailOptions.subject = "[HelloCalendar] 이메일 인증"
//   mailOptions.html = `<h1 style="color: royalblue;
//     text-align: center;
//     font-size: 10vw;
//     margin-top: 10vw;
//     height: 10vw;
//     padding: 0 10vw;">Hello Calendar</h1>
//     <div style="font-weight: 600;
//     text-align: center;
//     padding: 0 10vw;">인증번호로 이메일 인증을 진행하세요</div>
//     <h2 style="width: 50vw;
//     margin: 10vw auto;
//     height: 12vw;
//     font-size: 10vw;
//     line-height: 12vw;
//     background-color: #d4d4d4;
//     border-radius: 4vw;
//     text-align: center;
//     border: 0;
//     font-weight: 500;">${authNum}</h2>`
//   transporter.sendMail(mailOptions);
//   return authNum;
// }

// let authNum = emailAuthTest("cchs12123@kakao.com");
// console.log(authNum);
// console.log(crypto.pseudoRandomBytes(5).toString('base64'));
