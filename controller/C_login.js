const models = require("../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const emailKey = require("../authinfo/emailkey");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailKey.user,
    pass: emailKey.pass,
  },
});
let mailOptions = {
  from: emailKey.user,
  to: "",
  subject: "",
  html: "",
};
// email전송 세팅
const emailAuthSend = (address) => {
  // address : 유저이메일
  let authNum = Math.floor(1000000 * Math.random());
  mailOptions.to = address;
  mailOptions.subject = "[HelloCalendar] 이메일 인증";
  mailOptions.html = `<h1 style="color: royalblue;
    text-align: center;
    font-size: 6vw;
    margin-top: 10vw;
    height: 10vw;
    padding: 0 10vw;
    line-height: 10vw">Hello Calendar</h1>
    <div style="font-weight: 600;
    text-align: center;
    padding: 0 10vw;
    font-size: 4vw">인증번호로 이메일 인증을 진행하세요</div>
    <h2 style="width: 50vw;
    margin: 10vw auto;
    height: 12vw;
    font-size: 10vw;
    line-height: 12vw;
    background-color: #d4d4d4;
    border-radius: 4vw;
    text-align: center;
    border: 0;
    font-weight: 500;">${authNum}</h2>`;
  transporter.sendMail(mailOptions);
  return authNum;
};
// 인증이메일 전송 함수

exports.loginPage = (req, res) => {
  res.render("login");
};
exports.signupPage = (req, res) => {
  res.render("signup");
};
exports.pwResetPage = (req, res) => {
  console.log(null);
  // res.render("pwreset");
};
exports.pwChangePage = (req, res) => {
  console.log(null);
  // res.render("pwchange");
};
exports.login = (req, res) => {
  // data-> {userid: ,pw: }
  let data = req.query;
  models.Login.findOne({
    where: {
      userid: data.userid,
    },
  }).then((result) => {
    if (result == null) {
      res.send({
        result: false,
        msg: "아이디가 존재하지 않습니다",
        data: null,
      });
      return 0;
    }
    let userInfo = result.dataValues;
    let inputPwHash = crypto
      .createHash("sha512")
      .update(data.pw + salt)
      .digest("hex");
    if (userInfo.hash_pw == inputPwHash) {
      req.session.isLogin = true;
      req.session.cookie.expires = new Date(Date.now() + 72 * 3600000);
      // 72시간동안 세션 유지
      req.session.id = userInfo.id;
      res.send({
        result: true,
        msg: `${userInfo.name}님 환영합니다`,
        data: userInfo,
      });
    } else {
      res.send({ result: false, msg: "잘못된 비밀번호", data: null });
    }
  });
};
exports.signup = (req, res) => {
  // req.query = {name:, userid:, pw:, emailAuthNum:}
  let data = req.query;
  models.Login.findOne({
    where: {
      userid: data.userid,
    },
  }).then((result) => {
    if (result != null) {
      res.send({
        result: false,
        msg: "사용할 수 없는 아이디입니다",
        data: null,
      });
      return 0;
    }
  })
  .then(result => {
  if (result != null) {
    res.send({result:false, msg:"사용할 수 없는 아이디입니다", data:null});
    return 0;
  }
  // 아이디 중복 검사
  // 프론트에서 아이디 검사를 받지 않으면 submit 제한
  let emailAuthAddress = req.session.emailAuthAddress;
  let emailAuthNum = data.emailAuthNum;
  let emailAuthInputHash = crypto.createHash('sha512').update(emailAuthAddress+emailAuthNum).digest('hex');
  if (req.session.emailAuthHash != emailAuthInputHash) {
    res.send({result:false, msg:"이메일 인증에 문제가 있습니다", data:null});
    req.session.destroy();
    return 0;
  }
  // 이메일 인증
  // 프론트에서 이메일 인증 버튼을 누르지 않으면 submit 제한
  // 유효성검사 끝, 데이터베이스 입력
  let salt = crypto.pseudoRandomBytes(128).toString('base64');
  let hashPW = crypto.createHash('sha512').update(data.pw+salt).digest('hex');
  models.Login.create({
    userid : data.userid,
    name : data.name,
    email : emailAuthAddress,
    salt : salt,
    hash_pw : hashPW
  })
  .then(result => {
    req.session.isLogin = false;
    res.send({result:true, msg:"회원가입 완료!", data:null});

    // 아이디 중복 검사
    // 프론트에서 아이디 검사를 받지 않으면 submit 제한
    let emailAuthAddress = req.session.emailAuthAddress;
    let emailAuthNum = data.emailAuthNum;
    let emailAuthInputHash = crypto
      .createHash("sha512")
      .update(emailAuthAddress + emailAuthNum)
      .digest("hex");
    if (req.session.emailAuthHash != emailAuthInputHash) {
      res.send({
        result: false,
        msg: "이메일 인증에 문제가 있습니다",
        data: null,
      });
      res.session.destroy();
      return 0;
    }
    // 이메일 인증
    // 프론트에서 이메일 인증 버튼을 누르지 않으면 submit 제한
    // 유효성검사 끝, 데이터베이스 입력
    let salt = crypto.pseudoRandomBytes(128).toString("base64");
    let hashPW = crypto
      .createHash("sha512")
      .update(data.pw + salt)
      .digest("hex");
    models.Login.create({
      userid: data.userid,
      name: data.name,
      email: emailAuthAddress,
      salt: salt,
      hash_pw: hashPW,
    }).then((result) => {
      res.session.destroy();
      res.send({ result: true, msg: "회원가입 완료!", data: null });
    });
  });
};
exports.logout = (req, res) => {
  req.session.destroy();
  res.send({ result: true, msg: "로그아웃 완료", data: null });
};
exports.emailAuth = (req, res) => {
  let data = req.query;
  let authNum = emailAuthSend(data.email);
  req.session.emailAuthHash = crypto
    .createHash("sha512")
    .update(data.email + authNum)
    .digest("hex");
  req.session.emailAuthAddress = data.email;
  res.send({ result: true, msg: "인증메일 발송 완료", data: null });
};
exports.idCheck = (req, res) => {
  console.log(req.query);
  let userid = req.query.userid;
  models.Login.findOne({
    where: {
      userid: userid,
    },
  }).then((result) => {
    if (result == null) {
      res.send({
        result: true,
        msg: "사용할 수 있는 아이디입니다",
        data: null,
      });
    } else {
      res.send({
        result: false,
        msg: "사용할 수 없는 아이디입니다",
        data: null,
      });
    }
  });
};
exports.pwReset = (req, res) => {
  let data = req.query;
  // data = {emailAuthNum: ,pw:(새 비밀번호)}
  // 프론트에서 이메일 인증 버튼을 누르지 않으면 submit 제한
  let emailAuthAddress = req.session.emailAuthAddress;
  let emailAuthNum = data.emailAuthNum;
  let emailAuthInputHash = crypto
    .createHash("sha512")
    .update(emailAuthAddress + emailAuthNum)
    .digest("hex");
  if (req.session.emailAuthHash != emailAuthInputHash) {
    res.send({result:false, msg:"이메일 인증에 문제가 있습니다", data:null});
    req.session.destroy();
    return 0;
  }
  let salt = crypto.pseudoRandomBytes(128).toString("base64");
  let hashPW = crypto
    .createHash("sha512")
    .update(data.pw + salt)
    .digest("hex");
  models.Login.update(
    {
      salt: salt,
      hash_pw: hashPW,
    },
    {
      where: {
        email: emailAuthAddress,
      },
    }
  )
  .then(() => {
    req.session.destroy();
    res.send({result : true, msg : "비밀번호 재설정 완료", data:null});
  });
};
exports.pwChange = (req, res) => {
  let data = req.query;
  // data = {pw: , new_pw:}
  models.Login.findOne({
    where: {
      id: req.session.id,
    },
  }).then((result) => {
    let userInfo = result.dataValues;
    let inputPwHash = crypto
      .createHash("sha512")
      .update(data.pw + userInfo.salt)
      .digest("hex");
    if (inputPwHash != userInfo.hash_pw) {
      res.send({ result: false, msg: "비밀번호가 틀렸습니다", data: null });
      return 0;
    }
    let salt = crypto.pseudoRandomBytes(128).toString("base64");
    let hashPW = crypto
      .createHash("sha512")
      .update(data.new_pw + salt)
      .digest("hex");
    models.Login.update(
      {
        salt: salt,
        hash_pw: hashPW,
      },
      {
        where: {
          id: req.session.id,
        },
      }
    ).then((result) => {
      res.send({ result: true, msg: "비밀번호 업데이트 완료", data: null });
    });
  });
};
