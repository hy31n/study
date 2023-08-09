#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const path = require('path');
const cors = require('cors');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    //secret은 임의의 난수값
    secret: 'g7$In!2@S#%9Oc$5mB',
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/api', (req, res) => {
  connection.query('SELECT * FROM member', (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login/login.html');
});

app.get('/loginCss', (req, res) => {
  res.sendFile(__dirname + '/login/login.css');
});

app.get('/loginJs', (req, res) => {
  res.sendFile(__dirname + '/login/login.js');
});

app.post('/login', (req, res) => {
  if (req.session.user ? req.session.user.id == 'test' : false) {
    res.redirect('/');
  } else if (req.body.id == 'test' && req.body.pw == '1234') {
    req.session.user = {
      id: req.body.id,
    };

    res.setHeader('Set-Cookie', ['user=' + req.body.id]);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

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

app.get('/mainCss', (req, res) => {
  res.sendFile(__dirname + '/main/css/styles.css');
});

app.get('/mainJs', (req, res) => {
  res.sendFile(__dirname + '/main/js/main.js');
});

app.get('/swiperCss', (req, res) => {
  res.sendFile(__dirname + '/main/css/swiper-bundle.min.css');
});

app.get('/swiperJs', (req, res) => {
  res.sendFile(__dirname + '/main/js/swiper-bundle.min.js');
});

app.get('/scrollJs', (req, res) => {
  res.sendFile(__dirname + '/main/js/scrollreveal.min.js');
});

app.get('/img/:name', (req, res) => {
  const filePath = path.join(__dirname, '/main/img/', req.params.name);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(
  cors({
    origin: `https://hyein.site/`,
    credentials: true,
  })
);
