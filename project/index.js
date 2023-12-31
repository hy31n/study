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

      res.setHeader('Set-Cookie', 'user=' + req.body.id);
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

// 게시글 작성
app.post('/quotes', async (req, res) => {
  try {
    const { title, content } = req.body;

    // 데이터 유효성 검사
    if (!title || !content) {
      return res.status(400).json({ error: '모든 필드 필수' });
    }

    // 로그인 확인
    if (!req.session.user) {
      return res.status(401).json({ error: '로그인이 필요합니다' });
    }

    // SQL 코드
    const insertQuoteQuery = 'INSERT INTO board (title, content) VALUES (?, ?)';
    connection.query(insertQuoteQuery, [title, content], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('글쓰기 오류');
        return;
      }
      // 성공
      res.redirect('/board');
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

// 게시판 리스트 보기
app.get('/board', (req, res) => {
  const sqlQuery = 'SELECT * FROM board';

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('내부 서버 오류');
    }

    res.render('board', { list: result });
  });
});

// 게시판 글 보기
app.get('/view/:boardid', (req, res) => {
  const boardid = req.params.boardid;
  const sqlQuery = 'SELECT * FROM board where 1=1 and boardid = ?';

  connection.query(sqlQuery, [boardid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('내부 서버 오류');
    }

    res.render('view', { board: result[0] });
  });
});

// 게시판 글 수정
app.post('/edit/:boardid', (req, res) => {
  const { title, content, boardid } = req.body;
  const sqlQuery = 'UPDATE board SET title = ?, content = ? where boardid = ?';
  const values = [title, content, boardid];

  connection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('내부 서버 오류');
    }

    res.send('성공');
  });
});

// 게시글 글 요소 확인
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
