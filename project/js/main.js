$(document).ready(function () {
  $('#autoWidth').lightSlider({
    autoWidth: true,
    loop: true,
    onSliderLoad: function () {
      $('#autoWidth').removeClass('cS-hidden');
    },
  });
});

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById('header_container').innerHTML = this.responseText;
  }
};
xhttp.open('GET', '/header', true);
xhttp.send();

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
