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

// 게시판
app.get('/board/api/:bid', (req, res) => {
  res.json({
    title: req.params.bid,
    contents: 'this is CSR page' + req.params.bid,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
