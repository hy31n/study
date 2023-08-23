const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  console.log(req.session);
  res.sendFile(path.join(__dirname, '../html/main.html'));
});

router.get('/header', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/header.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/signup.html'));
});

router.get('/write', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/write.html'));
});

router.get('/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/edit.html'));
});

router.get('/css/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '../css/', req.params.name));
});
router.get('/img/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '../img/', req.params.name));
});
router.get('/js/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '../js/', req.params.name));
});

module.exports = router;
