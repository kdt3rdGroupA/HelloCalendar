const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);

const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.render('index');
});

// app.listen(PORT, (req, res) => {
//   console.log(`http://localhost:${PORT}`);
// });

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});