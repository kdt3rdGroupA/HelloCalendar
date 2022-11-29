const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http").Server(app);

const PORT = 8001;

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true })); // body-parser post 요청 할 때 body로 받게해줌
app.use(express.json());
app.use(
  session({
    secret: "(^Д^)/(^Д^)/(^Д^)/(^Д^)/",
    resave: false,
    saveUninitialized: true,
  })
);

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// login과 관련된 인증들
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

// todo 관련

const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);

// 일정 관련
const calendarRouter = require("./routes/calendar");
app.use("/calendar", calendarRouter);

// 바로가기 관련
const shortcutRouter = require("./routes/shortcut");
app.use("/shortcut", shortcutRouter);

// parse application/json
app.use(express.json());

// manual 페이지 새창에 랜더
app.get("/manual", (req, res) => {
  res.render("manual");
});

// 404 Page
app.get("*", (req, res) => {
  res.render("404");
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
