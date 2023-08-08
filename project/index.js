#!/usr/bin/node
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;

const path = require('path');
const cors = require('cors');

app.use(express.static('public'));

app.get('/api', (req, res) => {
  connection.query('SELECT * FROM member', (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main/index.html');
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
