#!/usr/bin/node

const express = require('express');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
const session = require('express-session');

const path = require('path');
const cors = require('cors');

const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const { error } = require('console');
const connection = mysql.createConnection(dbconfig);

var mainRoute = require('./routes/mainRoute.js');

app.use(
  cors({
    origin: 'https://hyein.site',
    credentials: true,
  })
);

app.use('/', mainRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
