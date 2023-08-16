let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');

searchBtn.onclick = function () {
  searchBox.classList.add('active');
  closeBtn.classList.add('active');
  searchBtn.classList.add('active');
};
closeBtn.onclick = function () {
  searchBox.classList.remove('active');
  closeBtn.classList.remove('active');
  searchBtn.classList.remove('active');
};

const userCookieExists = document.cookie.indexOf('user=') !== -1;
const loginItem = document.querySelector('.loginItem');
const loginLink = loginItem.querySelector('a');

if (!userCookieExists) {
  // 'user' 쿠키가 없는 경우
  loginItem.style.display = 'list-item';
  loginLink.href = '/login';
} else {
  loginLink.textContent = '로그아웃';
  loginLink.href = '/logout';
}
