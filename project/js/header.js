// let searchBtn = document.querySelector('.searchBtn');
// let closeBtn = document.querySelector('.closeBtn');
// let searchBox = document.querySelector('.searchBox');

// searchBtn.onclick = function () {
//   searchBox.classList.add('active');
//   closeBtn.classList.add('active');
//   searchBtn.classList.add('active');
// };
// closeBtn.onclick = function () {
//   searchBox.classList.remove('active');
//   closeBtn.classList.remove('active');
//   searchBtn.classList.remove('active');
// };

function toggleLogin() {
  event.preventDefault();
  const loginLink = document.getElementById('loginLink');

  const isUserLoggedIn = document.cookie.indexOf('user=') !== -1;

  if (isUserLoggedIn) {
    loginLink.textContent = '로그아웃';
    loginLink.addEventListener('click', (e) => {
      location.href = '/logout';
    });
  } else {
    loginLink.textContent = '로그인';
    loginLink.addEventListener('click', (e) => {
      location.href = '/login';
    });
  }
}
