const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);

const PORT = 8001;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret : "\(^Д^)/\(^Д^)/\(^Д^)/\(^Д^)/",
  resave : false,
  saveUninitialized : true
}));

app.get('/', (req, res) => {
  console.log(typeof(req.session.isLogin));
  if (req.session.isLogin == true) {
    console.log(1);
    res.render('index', {
      isLogin : true,
      name : req.session.data.name,
      email : req.session.data.email
      });
  } else {
    console.log(2);
    res.render('index', {isLogin : false});
  }
});

// login과 관련된 인증들
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// todo 관련
const todoRouter = require('./routes/todo');
app.use('/todo', todoRouter); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(express.bodyParser());			// 요청 본문 파싱
// app.use(bodyParser);			// 요청 본문 파싱
// // app.use('/todo.list', todoRouter.list); //get

// app.use('/', todoRouter.index); // get
// app.use('/list', todoRouter.list);  // get
// app.use('/add', todoRouter.add); //  post
// app.use('/complete', todoRouter.complete); //  post
// app.use('/del', todoRouter.del); //  post






// manual 페이지 새창에 랜더
app.get('/manual', (req, res) => {
  res.render('manual');
  // res.render('manual', { title: 'id님 환영' });
});

// 404 Page
app.get('*', (req,res) => {
  res.render('404');
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});