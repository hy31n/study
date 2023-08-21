#!/usr/bin/node

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const path = require('path');
const cors = require('cors');

const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const { error } = require('console');
const connection = mysql.createConnection(dbconfig);

var mainRoute = require('./routes/mainRoute.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'html'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'g7$In!2@S21Kc$5mB',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: 'https://hyein.site',
    credentials: true,
  })
);

app.use('/', mainRoute);

// 회원가입
app.post('/signup', (req, res) => {
  const { name, id, pw } = req.body;

  const insertUserQuery =
    'INSERT INTO member (memberid, membername, memberpassword) VALUES (?, ?, ?)';
  connection.query(insertUserQuery, [id, name, pw], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/login');
  });
});

// 로그인
app.post('/login', (req, res) => {
  const { id, pw } = req.body;

  const getUserQuery =
    'SELECT * FROM member WHERE memberid = ? AND memberpassword = ?';
  connection.query(getUserQuery, [id, pw], (err, results) => {
    if (err) {
      console.log(err);
      res.redirect('/login');
    }

    if (results.length > 0) {
      req.session.user = results[0];

      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

// 로그아웃
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie('user');
      res.redirect('/');
    }
  });
});

// 게시판 목록 불러오기
app.get('/board', (req, res) => {
  connection.query('SELECT * from board', (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });
});

//게시판 글 보기
app.get('/view/:id', (req, res, next) => {
  connection.query('SELECT * from board', (err, rows) => {
    if (err) throw err;
    const article = rows.find((art) => art.idx === parseInt(req.params.id));
    if (!article) {
      return res.status(404).send('ID was not found.');
    }
    res.send(article);
  });
});

// 게시판 글 작성
app.post('/write', (req, res) => {
  const { title, author, content } = req.body;

  // 로그인 상태 확인
  if (!req.session.user) {
    return res.status(403).json({ message: '로그인이 필요합니다.' });
  }

  const insertPostQuery =
    'INSERT INTO board (title, author, content) VALUES (?, ?, ?)';
  connection.query(insertPostQuery, [title, author, content], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: '글 작성 중 오류가 발생했습니다.' });
    }

    res.status(201).json({ message: '글이 작성되었습니다.' });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
